export default function CrisisArchitecture() {
  const flowSteps = [
    { step: "1", label: "User Input", detail: "Text entered in chatbot, symptom checker, journal, or mood log", color: "#64D2FF" },
    { step: "2", label: "Client-Side Detection (<50ms)", detail: "Keyword corpus + pattern matching runs in browser. Zero server roundtrip. Zero PII transmitted.", color: "#00b894" },
    { step: "3a", label: "TIER 1 \u2192 Empathetic AI Response", detail: "Claude API generates warm, context-aware response. Gentle resource surfacing.", color: "#30D158" },
    { step: "3b", label: "TIER 2 \u2192 Crisis Banner + AI Support", detail: "ThroughLine API call \u2192 country-matched hotline displayed. AI response with escalation language.", color: "#FF9F0A" },
    { step: "3c", label: "TIER 3 \u2192 Emergency Modal (Fullscreen)", detail: "All UI replaced. IP \u2192 country \u2192 ThroughLine API \u2192 top hotline + emergency number displayed instantly.", color: "#FF2D55" },
    { step: "4", label: "Anonymous Event Log (Supabase)", detail: "Tier level + country code + timestamp only. Zero text content. Zero user ID. Used for impact reporting.", color: "#BF5AF2" },
  ];

  const decisions = [
    { title: "Why Client-Side Detection?", icon: "\ud83d\udd12", content: "Privacy. A person typing 'I want to kill myself' should never have that text stored. Client-side processing keeps the sensitive text on their device. The Woebot approach (server-side) and BetterHelp approach (data sharing) prove this matters both ethically and legally." },
    { title: "Why ThroughLine API Instead of Own Database?", icon: "\ud83d\udce1", content: "ThroughLine maintains 1,300+ verified helplines daily. Building and maintaining this in-house would require a full team. At $X/month (enterprise pricing based on usage), ThroughLine is cheaper and more accurate than any DIY solution. IASP, Meta, and YouTube all use it \u2014 it's the industry standard." },
    { title: "Why Claude API for Responses?", icon: "\ud83e\udd16", content: "Unlike Woebot (rule-based scripts that change topic after triggering crisis mode) and basic keyword bots, Claude generates contextual, empathetic responses that stay with the person. The key difference: Psychage's Claude is given a specific crisis persona system prompt that Dr. Dobson reviews, ensuring clinical accuracy while maintaining warmth." },
    { title: "IP Detection Accuracy & Fallback Strategy", icon: "\ud83d\udccd", content: "Vercel Edge Functions provide country-level IP detection at 95-97% accuracy. Fallback chain: 1) IP detection \u2192 2) Browser language header \u2192 3) User profile preference \u2192 4) Manual country selector. VPN users see a gentle prompt: 'Are you accessing from [detected country]?' with override option." },
  ];

  return (
    <div className="fade">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>System Architecture</div>
        <p style={{ color: "#6a9e90", fontSize: 13 }}>How it all connects in your Vercel + Supabase + ThroughLine stack.</p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#6a9e90", fontWeight: 700, marginBottom: 14 }}>DETECTION & RESPONSE FLOW</div>
        {flowSteps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}22`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.step}</div>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#dff2ec" }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "#6a9e90", marginTop: 2 }}>{s.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {decisions.map((item, i) => (
        <div key={i} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#00e6b8", marginBottom: 6 }}>{item.title}</div>
              <p style={{ fontSize: 13, color: "#a8c4bc", lineHeight: 1.65 }}>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
