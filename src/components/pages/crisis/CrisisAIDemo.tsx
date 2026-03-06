import { useRef, useEffect } from 'react';
import { CRISIS_KEYWORDS, TEST_PHRASES } from '@/data/crisisResources';
import type { ChatMessage, CountryData } from '@/data/crisisResources';

interface Props {
  countryData: CountryData;
  input: string;
  setInput: (val: string) => void;
  detectedTier: string | null;
  setDetectedTier: (tier: string | null) => void;
  aiLoading: boolean;
  setAiLoading: (val: boolean) => void;
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setShowEmergency: (show: boolean) => void;
  setCrisisModalSeverity: (severity: "WATCH" | "URGENT" | "CRISIS" | null) => void;
}

function detectTier(text: string): string | null {
  const lower = text.toLowerCase();
  if (CRISIS_KEYWORDS.TIER3.some(kw => lower.includes(kw))) return "TIER3";
  if (CRISIS_KEYWORDS.TIER2.some(kw => lower.includes(kw))) return "TIER2";
  if (CRISIS_KEYWORDS.TIER1.some(kw => lower.includes(kw))) return "TIER1";
  return null;
}

export default function CrisisAIDemo({
  countryData, input, setInput, detectedTier, setDetectedTier,
  aiLoading, setAiLoading, chatHistory, setChatHistory,
  setShowEmergency, setCrisisModalSeverity,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, aiLoading]);

  const callClaudeAPI = async (userMessage: string, tier: string | null, countryInfo: CountryData) => {
    setAiLoading(true);

    const systemPrompt = tier === "TIER3"
      ? `You are a compassionate crisis support companion on Psychage, a mental health education platform. A user has expressed what appears to be suicidal ideation or immediate self-harm intent. Your role is NOT to be a therapist but to be warm, present, and immediately connect them to help.\n\nRULES:\n- Lead with deep human empathy — make them feel HEARD first\n- Never give a list or bullet points in crisis responses\n- Speak in 2-3 short, warm, direct paragraphs\n- Gently but clearly encourage them to call the crisis line for ${countryInfo.name}: ${countryInfo.lines[0]?.num || "emergency services"} (${countryInfo.lines[0]?.name})\n- End with: "You matter. Please reach out to someone right now."\n- Do NOT diagnose, do NOT offer CBT techniques in this moment\n- Do NOT change the subject or pivot to wellness activities`
      : tier === "TIER2"
      ? `You are a compassionate support companion on Psychage. The user is showing signs of elevated distress — hopelessness, feeling worthless or trapped. Respond with deep empathy. Acknowledge what they said specifically. Gently validate their feelings. Softly mention that speaking to someone can help. Keep it to 2-3 warm paragraphs. Do not list resources aggressively. Be human, not clinical.`
      : `You are a warm, knowledgeable mental health companion on Psychage. The user has expressed mild distress. Respond with genuine warmth and curiosity. Ask one gentle follow-up question to understand better. Offer one piece of actionable, evidence-based perspective. Keep it conversational and human — 2-3 paragraphs max. Never be preachy.`;

    try {
      const messages = [...chatHistory.map(m => ({ role: m.role, content: m.content })), { role: "user" as const, content: userMessage }];
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages
        })
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      const text = data.content?.[0]?.text || "I'm here with you. Please know you're not alone.";
      setChatHistory(prev => [...prev, { role: "user", content: userMessage }, { role: "assistant", content: text }]);
    } catch {
      const fallbackText = "I'm here with you. If you're in crisis, please call " + (countryData.lines[0]?.num || "emergency services") + " right now.";
      setChatHistory(prev => [...prev, { role: "user", content: userMessage }, { role: "assistant", content: fallbackText }]);
    }
    setAiLoading(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const tier = detectTier(input);
    setDetectedTier(tier);
    if (tier === "TIER3") {
      setShowEmergency(true);
      setCrisisModalSeverity("CRISIS");
    } else if (tier === "TIER2") {
      setCrisisModalSeverity("URGENT");
    }
    callClaudeAPI(input, tier, countryData);
    setInput("");
  };

  return (
    <div className="fade">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Live AI Crisis Companion</div>
          <p style={{ color: "#6a9e90", fontSize: 13, lineHeight: 1.7 }}>Type anything — the system detects distress in real time across 9+ languages, then generates a contextual AI response. Unlike competitors that dump a number and change topic, Psychage stays with the person.</p>
        </div>
        <div className="card" style={{ borderColor: "#1a3028" }}>
          <div style={{ fontSize: 11, color: "#6a9e90", fontWeight: 700, marginBottom: 8 }}>YOUR CRISIS RESOURCES</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{countryData.flag}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{countryData.name}</span>
          </div>
          {countryData.lines[0] && <div style={{ background: "#060d09", borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 10, color: "#6a9e90" }}>{countryData.lines[0].name}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#00e6b8" }}>{countryData.lines[0].num || countryData.lines[0].text}</div>
          </div>}
        </div>
      </div>

      {/* Quick test chips */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#6a9e90", fontWeight: 700, marginBottom: 6 }}>TEST PHRASES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TEST_PHRASES.map(p => (
            <span key={p} className="chip" onClick={() => setInput(p)}>{p}</span>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div style={{ background: "#060d09", border: "1px solid #1a2e26", borderRadius: 14, padding: 16, minHeight: 200, maxHeight: 320, overflowY: "auto", marginBottom: 12 }}>
        {chatHistory.length === 0 && !aiLoading && (
          <div style={{ textAlign: "center", color: "#2a4a40", padding: 40 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{"\ud83d\udcac"}</div>
            <div>Start a conversation — type how you're feeling</div>
          </div>
        )}
        {chatHistory.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 8 }}>
            <div className="chat-msg" style={{ background: msg.role === "user" ? "#1a3028" : "#0d1c17", border: `1px solid ${msg.role === "user" ? "#2d4a3e" : "#1a2e26"}` }}>
              {msg.role === "assistant" && <div style={{ fontSize: 10, color: "#00b894", fontWeight: 700, marginBottom: 4 }}>PSYCHAGE AI COMPANION</div>}
              {msg.content}
            </div>
          </div>
        ))}
        {aiLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className="chat-msg" style={{ background: "#0d1c17", border: "1px solid #1a2e26" }}>
              <div style={{ fontSize: 10, color: "#00b894", fontWeight: 700, marginBottom: 4 }}>PSYCHAGE AI COMPANION</div>
              <span className="pulse" style={{ color: "#6a9e90" }}>Composing a response...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Tier indicator */}
      {detectedTier && (
        <div style={{ background: detectedTier === "TIER3" ? "#FF2D5511" : detectedTier === "TIER2" ? "#FF9F0A11" : "#30D15811", border: `1px solid ${detectedTier === "TIER3" ? "#FF2D5544" : detectedTier === "TIER2" ? "#FF9F0A44" : "#30D15844"}`, borderRadius: 8, padding: "8px 14px", marginBottom: 10, display: "flex", alignItems: "center", gap: 8, fontSize: 12 }} className="fade">
          <span>{detectedTier === "TIER3" ? "\ud83d\udea8" : detectedTier === "TIER2" ? "\u26a0\ufe0f" : "\ud83d\udfe2"}</span>
          <span style={{ color: detectedTier === "TIER3" ? "#FF2D55" : detectedTier === "TIER2" ? "#FF9F0A" : "#30D158", fontWeight: 700 }}>{detectedTier}</span>
          <span style={{ color: "#6a9e90" }}>{"\u2014"} {detectedTier === "TIER3" ? "Emergency modal activated + empathetic AI response" : detectedTier === "TIER2" ? "Elevated distress detected, warm escalation active" : "Mild distress, gentle support mode"}</span>
        </div>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: 8 }}>
        <textarea ref={textareaRef} className="input" rows={2} placeholder="Type how you're feeling..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} style={{ flex: 1 }} />
        <button className="btn" onClick={handleSend} style={{ alignSelf: "flex-end", padding: "14px 20px" }}>Send</button>
      </div>

      {chatHistory.length > 0 && (
        <button className="btn2" style={{ marginTop: 8 }} onClick={() => { setChatHistory([]); setDetectedTier(null); }}>Clear conversation</button>
      )}
    </div>
  );
}
