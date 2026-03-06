import { GLOBAL_CRISIS_DB } from '@/data/crisisResources';

interface Props {
  country: string;
  setCountry: (code: string) => void;
  countrySearch: string;
  setCountrySearch: (val: string) => void;
  region: string;
  setRegion: (val: string) => void;
}

export default function CrisisGlobalResources({ country, setCountry, countrySearch, setCountrySearch, region, setRegion }: Props) {
  const regions = ["All", ...new Set(Object.values(GLOBAL_CRISIS_DB).map(c => c.region))];
  const filteredCountries = Object.entries(GLOBAL_CRISIS_DB).filter(([code, data]) => {
    const matchRegion = region === "All" || data.region === region;
    const matchSearch = !countrySearch || data.name.toLowerCase().includes(countrySearch.toLowerCase()) || code.toLowerCase().includes(countrySearch.toLowerCase());
    return matchRegion && matchSearch;
  });

  const countryData = GLOBAL_CRISIS_DB[country];

  return (
    <div className="fade">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Global Crisis Resource Engine</div>
        <p style={{ color: "#6a9e90", fontSize: 13, lineHeight: 1.6 }}>
          <strong style={{ color: "#00e6b8" }}>Strategy:</strong> Psychage integrates the <strong style={{ color: "#dff2ec" }}>ThroughLine API</strong> — the world's largest verified crisis helpline database (1,300+ helplines in 175+ countries, maintained daily). This means Psychage never has to maintain the database manually.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          {[{ label: "Countries in DB", val: Object.keys(GLOBAL_CRISIS_DB).length + "+", icon: "\ud83c\udf0d" }, { label: "ThroughLine API", val: "1,300+", icon: "\ud83d\udce1" }, { label: "Verified Daily", val: "\u2713", icon: "\ud83d\udd12" }, { label: "Languages", val: "15+", icon: "\ud83d\udde3\ufe0f" }].map((s, i) => (
            <div key={i} className="card" style={{ flex: "1 1 120px", textAlign: "center", padding: "14px 10px" }}>
              <div style={{ fontSize: 22, marginBottom: 3 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#00e6b8" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#6a9e90" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
        <input className="search-input" style={{ flex: 1, minWidth: 160 }} placeholder="\ud83d\udd0d Search country..." value={countrySearch} onChange={e => setCountrySearch(e.target.value)} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {regions.map(r => <span key={r} className={`chip ${region === r ? "on" : ""}`} onClick={() => setRegion(r)}>{r}</span>)}
        </div>
      </div>

      {/* Country grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr))", gap: 6, maxHeight: 280, overflowY: "auto", marginBottom: 16 }}>
        {filteredCountries.map(([code, data]) => (
          <div key={code} onClick={() => setCountry(code)} style={{ background: country === code ? "#1a3028" : "#0d1c17", border: `1px solid ${country === code ? "#00b894" : "#1a2e26"}`, borderRadius: 10, padding: "8px 6px", textAlign: "center", cursor: "pointer", transition: "all .15s" }}>
            <div style={{ fontSize: 20 }}>{data.flag}</div>
            <div style={{ fontSize: 9, color: "#dff2ec", fontWeight: 600, marginTop: 2 }}>{data.name.split(" ")[0]}</div>
            <div style={{ fontSize: 9, color: "#6a9e90" }}>{code}</div>
          </div>
        ))}
      </div>

      {/* Selected country detail */}
      {countryData && (
        <div className="card fade" style={{ borderColor: "#00b89444" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>{countryData.flag}</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{countryData.name}</div>
              <div style={{ fontSize: 12, color: "#6a9e90" }}>{countryData.region} {"\u00b7"} Emergency: <span style={{ color: "#FF2D55", fontWeight: 700 }}>{countryData.emergency}</span></div>
            </div>
            <div style={{ marginLeft: "auto", background: "#00b89422", color: "#00e6b8", padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>AUTO-DETECTED VIA IP</div>
          </div>
          {countryData.lines.map((line, i) => (
            <div key={i} style={{ background: "#060d09", border: `1px solid ${i === 0 ? "#00b89444" : "#1a2e26"}`, borderRadius: 10, padding: 14, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span>{"\ud83d\udcde"}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{line.name}</span>
                {line.chat && <span style={{ background: "#00b89422", color: "#00e6b8", fontSize: 9, padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>CHAT</span>}
                <span style={{ marginLeft: "auto", fontSize: 10, color: "#6a9e90" }}>{line.available}</span>
              </div>
              {line.num && <div style={{ fontSize: 22, fontWeight: 800, color: "#00e6b8" }}>{line.num}</div>}
              {line.text && <div style={{ fontSize: 12, color: "#6a9e90", marginTop: 2 }}>Text: {line.text}</div>}
            </div>
          ))}
          <div style={{ background: "#150609", border: "1px solid #FF2D5533", borderRadius: 10, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 22 }}>{"\ud83d\ude91"}</span>
            <div><div style={{ fontSize: 10, color: "#FF2D55", fontWeight: 700 }}>EMERGENCY</div><div style={{ fontSize: 24, fontWeight: 900, color: "#FF2D55" }}>{countryData.emergency}</div></div>
            <div style={{ fontSize: 12, color: "#9e6a78", marginLeft: "auto", textAlign: "right" }}>Shown instantly in<br />Tier 3 interventions</div>
          </div>
        </div>
      )}

      {/* ThroughLine integration callout */}
      <div className="card" style={{ marginTop: 16, borderColor: "#00b89444", background: "#0a1a15" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#00e6b8", marginBottom: 8 }}>{"\ud83d\udce1"} ThroughLine API Integration — Why This Beats Building Your Own</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { icon: "\u2705", point: "1,300+ verified helplines in 175+ countries — already done" },
            { icon: "\u2705", point: "Maintained daily by a dedicated team — you never update manually" },
            { icon: "\u2705", point: "Powers IASP, Meta, YouTube, Reddit — clinically trusted" },
            { icon: "\u2705", point: "API returns phone, chat, SMS, language, and topic filters" },
            { icon: "\u2705", point: "AI-powered ranking shows the most relevant helpline first" },
            { icon: "\u2705", point: "Anonymous access — no user data collected by ThroughLine" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "#a8c4bc" }}>
              <span>{p.icon}</span><span>{p.point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
