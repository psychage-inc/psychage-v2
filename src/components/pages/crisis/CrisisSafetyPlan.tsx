import { SAFETY_PLAN_STEPS } from '@/data/crisisResources';
import type { SafetyPlan } from '@/data/crisisResources';

interface Props {
  safetyPlan: SafetyPlan;
  setSafetyPlan: React.Dispatch<React.SetStateAction<SafetyPlan>>;
  safetyStep: number;
  setSafetyStep: (step: number) => void;
}

export default function CrisisSafetyPlan({ safetyPlan, setSafetyPlan, safetyStep, setSafetyStep }: Props) {
  return (
    <div className="fade">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Personal Safety Planning</div>
        <p style={{ color: "#6a9e90", fontSize: 13, lineHeight: 1.6 }}>Based on the Stanley-Brown Safety Planning Intervention — the most clinically validated suicide prevention tool available. A completed safety plan reduces hospitalization by 45%. No other consumer mental health platform offers this interactively.</p>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {["Warning Signs", "Reasons to Live", "Who to Call", "Coping Strategies", "Safe Spaces"].map((s, i) => (
          <div key={i} onClick={() => setSafetyStep(i)} style={{ flex: 1, padding: "10px 6px", background: safetyStep === i ? "#1a3028" : safetyStep > i ? "#112318" : "#0d1c17", border: `1px solid ${safetyStep === i ? "#00b894" : safetyStep > i ? "#00b89444" : "#1a2e26"}`, borderRadius: 8, cursor: "pointer", textAlign: "center", transition: "all .15s" }}>
            <div style={{ fontSize: 11, color: safetyStep === i ? "#00e6b8" : safetyStep > i ? "#6a9e90" : "#3a5e56", fontWeight: 600 }}>{safetyStep > i ? "\u2713 " : ""}{s}</div>
          </div>
        ))}
      </div>

      {SAFETY_PLAN_STEPS.filter((_, i) => i === safetyStep).map(step => (
        <div key={step.field} className="card fade" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>{step.icon}</span>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{step.label}</div>
          </div>
          <p style={{ color: "#a8c4bc", fontSize: 14, marginBottom: 12, lineHeight: 1.7 }}>{step.prompt}</p>
          <textarea className="input" rows={4} placeholder={step.placeholder} value={safetyPlan[step.field]} onChange={e => setSafetyPlan(prev => ({ ...prev, [step.field]: e.target.value }))} />
        </div>
      ))}

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button className="btn2" onClick={() => setSafetyStep(Math.max(0, safetyStep - 1))} disabled={safetyStep === 0}>{"\u2190"} Back</button>
        {safetyStep < 4 ? <button className="btn" onClick={() => setSafetyStep(safetyStep + 1)}>Next {"\u2192"}</button> : <button className="btn">Complete & Save Plan {"\u2713"}</button>}
      </div>

      {Object.values(safetyPlan).some(v => v) && (
        <div className="card fade" style={{ borderColor: "#00b89444" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#00e6b8", marginBottom: 12 }}>{"\ud83d\udccb"} Your Safety Plan</div>
          {SAFETY_PLAN_STEPS.filter(s => safetyPlan[s.field]).map(s => (
            <div key={s.field} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #1a2e26" }}>
              <div style={{ fontSize: 11, color: "#6a9e90", fontWeight: 700, marginBottom: 4 }}>{s.icon} {s.label.toUpperCase()}</div>
              <p style={{ fontSize: 13, color: "#a8c4bc", lineHeight: 1.6 }}>{safetyPlan[s.field]}</p>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" style={{ flex: 1 }}>{"\ud83d\udcf1"} SMS to Trusted Contact</button>
            <button className="btn2">{"\ud83d\udce5"} Download PDF</button>
            <button className="btn2">{"\ud83d\udc68\u200d\u2695\ufe0f"} Share with Therapist</button>
          </div>
        </div>
      )}
    </div>
  );
}
