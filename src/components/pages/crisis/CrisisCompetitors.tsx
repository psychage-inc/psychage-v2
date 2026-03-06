import { COMPETITORS } from '@/data/crisisResources';

export default function CrisisCompetitors() {
  return (
    <div className="fade">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Competitive Intelligence</div>
        <p style={{ color: "#6a9e90", fontSize: 13, lineHeight: 1.6 }}>Research-backed analysis of every major player. Understanding their failures is what makes Psychage different — not just better features, but fundamentally better ethics and architecture.</p>
      </div>
      {COMPETITORS.map((c, i) => (
        <div key={i} className="card fade" style={{ marginBottom: 14, borderLeft: `3px solid ${c.statusColor}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 17, fontWeight: 800 }}>{c.name}</div>
            <span style={{ background: `${c.statusColor}22`, color: c.statusColor, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{c.status}</span>
            <div style={{ marginLeft: "auto", fontSize: 11, color: "#6a9e90", maxWidth: 200, textAlign: "right" }}>{c.approach}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "#30D158", fontWeight: 700, marginBottom: 6 }}>{"\u2713"} WHAT THEY DO WELL</div>
              {c.good.map((g, j) => <div key={j} style={{ fontSize: 12, color: "#a8c4bc", marginBottom: 4, paddingLeft: 8, borderLeft: "2px solid #30D15844" }}>{"\u00b7"} {g}</div>)}
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#FF2D55", fontWeight: 700, marginBottom: 6 }}>{"\u2717"} WHERE THEY FAIL</div>
              {c.bad.map((b, j) => <div key={j} style={{ fontSize: 12, color: "#a8c4bc", marginBottom: 4, paddingLeft: 8, borderLeft: "2px solid #FF2D5544" }}>{"\u00b7"} {b}</div>)}
            </div>
          </div>
          <div style={{ background: "#0a1610", borderRadius: 8, padding: 10, display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color: "#00e6b8", fontSize: 13, flexShrink: 0 }}>{"\ud83d\udee1\ufe0f"}</span>
            <span style={{ fontSize: 12, color: "#00e6b8" }}><strong>Psychage advantage:</strong> {c.psychageAdvantage}</span>
          </div>
        </div>
      ))}

      <div className="card" style={{ background: "#0a1a15", borderColor: "#00b89444" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#00e6b8", marginBottom: 12 }}>The Single Biggest Gap Psychage Fills</div>
        <p style={{ fontSize: 13, color: "#a8c4bc", lineHeight: 1.7 }}>Research published in npj Digital Medicine (2023) showed a two-stage NLP system achieving 0.98 AUC in prospective crisis detection. But every platform that has implemented this is either US-only, expensive, or sold user data. <strong style={{ color: "#dff2ec" }}>Psychage is the first genuinely global, free, privacy-first platform that combines NLP detection + AI empathy + real-time IP routing + safety planning + mood pattern tracking.</strong> No one platform does all five.</p>
      </div>
    </div>
  );
}
