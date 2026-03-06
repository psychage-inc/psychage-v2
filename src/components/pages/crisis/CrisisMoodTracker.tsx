import { MOOD_LABELS, MOOD_COLORS } from '@/data/crisisResources';

interface Props {
  moodLog: number[];
  setMoodLog: React.Dispatch<React.SetStateAction<number[]>>;
  moodInput: number;
  setMoodInput: (val: number) => void;
  setDetectedTier: (tier: string | null) => void;
  setShowEmergency: (show: boolean) => void;
}

export default function CrisisMoodTracker({ moodLog, setMoodLog, moodInput, setMoodInput, setDetectedTier, setShowEmergency }: Props) {
  const avgMood = moodLog.length ? (moodLog.reduce((a, b) => a + b, 0) / moodLog.length).toFixed(1) : "0";
  const trend = moodLog.length >= 3 ? moodLog[moodLog.length - 1] - moodLog[moodLog.length - 3] : 0;

  return (
    <div className="fade">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Longitudinal Mood Intelligence</div>
        <p style={{ color: "#6a9e90", fontSize: 13, lineHeight: 1.6 }}>Crisis text line research shows that crisis signals detected <strong style={{ color: "#dff2ec" }}>6.8 days before</strong> human moderators flagged them. Mood tracking enables early detection through pattern recognition — the key insight competitors are missing.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Avg Mood (30 days)", val: avgMood, icon: "\ud83d\udcca", color: Number(avgMood) < 2 ? "#FF2D55" : Number(avgMood) < 3 ? "#FF9F0A" : "#30D158" },
          { label: "Current Trend", val: trend > 0 ? "\u2191 Improving" : trend < 0 ? "\u2193 Declining" : "\u2192 Stable", icon: "\ud83d\udcc8", color: trend > 0 ? "#30D158" : trend < 0 ? "#FF9F0A" : "#64D2FF" },
          { label: "Days Tracked", val: moodLog.length, icon: "\ud83d\udcc5", color: "#00e6b8" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "#6a9e90" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#6a9e90", fontWeight: 700, marginBottom: 12 }}>MOOD HISTORY</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100 }}>
          {moodLog.map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ width: "100%", background: MOOD_COLORS[m], borderRadius: 4, height: `${(m + 1) / 6 * 100}%`, opacity: i === moodLog.length - 1 ? 1 : 0.5, transition: "all .3s" }}></div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#4a6860", marginTop: 6 }}>
          <span>30 days ago</span><span>Today</span>
        </div>
      </div>

      {/* Add mood */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>How are you feeling right now?</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6, marginBottom: 14 }}>
          {MOOD_LABELS.map((label, i) => (
            <div key={i} onClick={() => setMoodInput(i)} style={{ cursor: "pointer", textAlign: "center", padding: "8px 4px", borderRadius: 10, background: moodInput === i ? "#1a3028" : "#060d09", border: `1px solid ${moodInput === i ? MOOD_COLORS[i] : "#1a2e26"}`, transition: "all .15s" }}>
              <div style={{ fontSize: 20 }}>{label.split(" ")[0]}</div>
              <div style={{ fontSize: 9, color: moodInput === i ? MOOD_COLORS[i] : "#6a9e90" }}>{label.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </div>
        <button className="btn" onClick={() => {
          const newLog = [...moodLog, moodInput];
          setMoodLog(newLog);
          if (moodInput >= 4) { setDetectedTier(moodInput === 5 ? "TIER3" : "TIER2"); if (moodInput === 5) setShowEmergency(true); }
        }}>Log Mood Entry</button>
        {moodInput >= 4 && (
          <div style={{ marginTop: 10, fontSize: 12, color: moodInput === 5 ? "#FF2D55" : "#FF9F0A" }} className="fade">
            {moodInput === 5 ? "\ud83d\udea8 This will trigger the emergency support system" : "\u26a0\ufe0f This will surface crisis resources and check in with you"}
          </div>
        )}
      </div>

      {/* Pattern detection logic */}
      <div className="card" style={{ borderColor: "#00b89444" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#00e6b8", marginBottom: 10 }}>How Psychage's Pattern Detection Works</div>
        {[
          { trigger: "3+ days of Tier 2 mood (Low/Struggling)", action: "System sends gentle check-in notification", color: "#FF9F0A" },
          { trigger: "Sudden drop of 2+ points in 24 hours", action: "Surfaces crisis resources proactively \u2014 no waiting for keywords", color: "#FF9F0A" },
          { trigger: "'Crisis' level mood logged", action: "Immediate emergency modal + crisis line for detected country", color: "#FF2D55" },
          { trigger: "No mood logged for 5+ days after previous distress", action: "Soft re-engagement nudge with mental health resource", color: "#64D2FF" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 4 }}></div>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: "#dff2ec" }}>{item.trigger}</div><div style={{ fontSize: 12, color: "#6a9e90" }}>{"\u2192"} {item.action}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
