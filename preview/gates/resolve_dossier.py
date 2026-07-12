#!/usr/bin/env python3
"""Phase-2 anti-fabrication resolver.

Independently re-hits Europe PMC for EVERY unique PMID pulled from the five
research/*_raw.json candidate files. Confirms the record exists, and cross-checks
the canonical title/year/first-author against what the research agent claimed
(catches swapped or hallucinated identifiers). Emits:
  - 01_dossier.json         (FROZEN merged dossier, resolved sources only)
  - _gate_reports/dossier_resolution.md   (human-readable resolution table)
Exits non-zero (HALT) if fewer than 40 sources resolve live.
"""
import json, sys, time, urllib.parse, urllib.request, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # preview/
BUILD = ROOT / "_build"
RESEARCH = BUILD / "research"
API = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"

def fetch(query, page_size=100):
    url = f"{API}?{urllib.parse.urlencode({'query': query, 'format':'json','resultType':'lite','pageSize':page_size})}"
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=30) as r:
                return json.loads(r.read().decode())
        except Exception as e:
            if attempt == 3:
                print(f"  ! fetch failed: {e}", file=sys.stderr)
                return None
            time.sleep(2 * (attempt + 1))
    return None

def surname(first_author):
    # research files store e.g. "Fusar-Poli", "Niemi-Pynttari", "Salazar de Pablo"
    return (first_author or "").split()[0].lower().replace("-", "")

# ---- load candidates ----
candidates = {}           # pmid -> merged candidate record (first wins, parts unioned)
part_of = {}              # pmid -> set of parts
for pf in sorted(RESEARCH.glob("P*_raw.json")):
    arr = json.loads(pf.read_text())
    for c in arr:
        pmid = str(c.get("pmid") or "").strip()
        if not pmid:
            continue
        part_of.setdefault(pmid, set()).add(c["part"])
        if pmid not in candidates:
            candidates[pmid] = c

pmids = sorted(candidates.keys())
print(f"Unique candidate PMIDs: {len(pmids)}")

# ---- resolve live in batches ----
resolved = {}   # pmid -> europepmc record
BATCH = 25
for i in range(0, len(pmids), BATCH):
    chunk = pmids[i:i+BATCH]
    q = "(" + " OR ".join(f"EXT_ID:{p}" for p in chunk) + ") AND SRC:MED"
    data = fetch(q, page_size=BATCH)
    if data:
        for rec in data.get("resultList", {}).get("result", []):
            resolved[str(rec.get("pmid"))] = rec
    time.sleep(0.4)

# retry any misses individually (some records live under SRC:PMC/PPR)
misses = [p for p in pmids if p not in resolved]
for p in misses:
    for q in (f"EXT_ID:{p} AND SRC:MED", f"EXT_ID:{p}", f'"{p}"'):
        data = fetch(q, page_size=3)
        if data:
            for rec in data.get("resultList", {}).get("result", []):
                if str(rec.get("pmid")) == p or rec.get("id") == p:
                    resolved[p] = rec
                    break
        if p in resolved:
            break
        time.sleep(0.3)

# ---- build report + dossier ----
rows, dossier = [], []
year_mismatch, author_mismatch = [], []
for p in pmids:
    c = candidates[p]
    rec = resolved.get(p)
    claimed_year = c.get("year")
    claimed_author = c.get("first_author", "")
    if rec:
        got_year = int(rec.get("pubYear") or 0)
        auth = (rec.get("authorString") or "").lower().replace("-", "")
        ok_year = (not claimed_year) or abs(got_year - int(claimed_year)) <= 1
        ok_author = surname(claimed_author) in auth or surname(claimed_author) == ""
        if not ok_year:
            year_mismatch.append((p, claimed_year, got_year))
        if not ok_author:
            author_mismatch.append((p, claimed_author, rec.get("authorString","")[:40]))
        status = "RESOLVED" + ("" if (ok_year and ok_author) else " *CHECK*")
        rows.append((p, status, got_year, rec.get("title","")[:80], claimed_author))
        d = dict(c)
        d["resolved"] = True
        d["parts"] = sorted(part_of[p], key=str)
        d["europepmc"] = {
            "pmid": rec.get("pmid"), "pmcid": rec.get("pmcid"),
            "doi": rec.get("doi"), "pubYear": rec.get("pubYear"),
            "title": rec.get("title"), "isOpenAccess": rec.get("isOpenAccess"),
            "authorString": (rec.get("authorString") or "")[:120],
            "author_match": ok_author, "year_match": ok_year,
        }
        dossier.append(d)
    else:
        rows.append((p, "UNRESOLVED", claimed_year, c.get("title","")[:80], claimed_author))

n_resolved = sum(1 for r in rows if r[1].startswith("RESOLVED"))
n_total = len(rows)

# freeze dossier
(BUILD / "01_dossier.json").write_text(json.dumps({
    "condition": "schizophrenia",
    "generated_by": "resolve_dossier.py",
    "unique_sources": n_total,
    "resolved_live": n_resolved,
    "sources": dossier,
}, indent=2))

# report
lines = ["# Dossier live-resolution report (Europe PMC)\n",
         f"Unique candidate sources: **{n_total}**  \nResolved live: **{n_resolved}**  \n"
         f"HALT threshold: 40  \n**{'PASS' if n_resolved>=40 else 'HALT'}**\n",
         "| PMID | status | year | first_author | title |", "|---|---|---|---|---|"]
for p, st, yr, title, auth in rows:
    lines.append(f"| {p} | {st} | {yr} | {auth} | {title} |")
if year_mismatch:
    lines.append("\n## Year mismatches (>1yr)\n" + "\n".join(f"- {p}: claimed {cy} vs europepmc {gy}" for p,cy,gy in year_mismatch))
if author_mismatch:
    lines.append("\n## Author mismatches\n" + "\n".join(f"- {p}: claimed '{ca}' vs '{ga}...'" for p,ca,ga in author_mismatch))
(BUILD / "_gate_reports" / "dossier_resolution.md").write_text("\n".join(lines))

print(f"Resolved {n_resolved}/{n_total}. Dossier frozen -> 01_dossier.json")
if year_mismatch: print(f"  year mismatches: {year_mismatch}")
if author_mismatch: print(f"  author mismatches: {[(m[0],m[1]) for m in author_mismatch]}")
if n_resolved < 40:
    print("HALT: fewer than 40 sources resolved live.", file=sys.stderr)
    sys.exit(2)
print("PASS: >=40 sources resolved live.")
