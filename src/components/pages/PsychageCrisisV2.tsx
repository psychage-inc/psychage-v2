import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CrisisSupportModalContent } from "@/features/crisis";
import type { Severity } from "@/features/crisis";

import { GLOBAL_CRISIS_DB, CRISIS_TABS } from "@/data/crisisResources";
import type { ChatMessage, SafetyPlan } from "@/data/crisisResources";

import CrisisAIDemo from "./crisis/CrisisAIDemo";
import CrisisGlobalResources from "./crisis/CrisisGlobalResources";
import CrisisMoodTracker from "./crisis/CrisisMoodTracker";
import CrisisSafetyPlan from "./crisis/CrisisSafetyPlan";
import CrisisCompetitors from "./crisis/CrisisCompetitors";
import CrisisArchitecture from "./crisis/CrisisArchitecture";

export default function PsychageCrisisV2() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("demo");
  const [input, setInput] = useState("");
  const [detectedTier, setDetectedTier] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [country, setCountry] = useState("US");
  const [countrySearch, setCountrySearch] = useState("");
  const [region, setRegion] = useState("All");
  const [moodLog, setMoodLog] = useState([3,2,4,3,2,5,3,2,1,3,2,4]);
  const [moodInput, setMoodInput] = useState(3);
  const [showEmergency, setShowEmergency] = useState(false);
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan>({ warnings:"", reasons:"", contacts:"", coping:"", places:"" });
  const [safetyStep, setSafetyStep] = useState(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [crisisModalSeverity, setCrisisModalSeverity] = useState<Severity | null>(null);

  // Dev/QA: open modal via ?severity=WATCH|URGENT|CRISIS
  const severityParam = useMemo(() => {
    const raw = searchParams.get("severity")?.toUpperCase();
    if (raw === "WATCH" || raw === "URGENT" || raw === "CRISIS") return raw as Severity;
    return null;
  }, [searchParams]);

  useEffect(() => {
    if (severityParam) setCrisisModalSeverity(severityParam);
  }, [severityParam]);

  const getCountryData = () => GLOBAL_CRISIS_DB[country] || GLOBAL_CRISIS_DB["US"];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#07100d", minHeight: "100vh", color: "#dff2ec", paddingTop: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .crisis-root *{box-sizing:border-box;}
        .crisis-root ::-webkit-scrollbar{width:4px;} .crisis-root ::-webkit-scrollbar-thumb{background:#00b894;border-radius:2px;}
        .crisis-root .tab{background:none;border:none;color:#6a9e90;cursor:pointer;padding:10px 16px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;border-bottom:2px solid transparent;transition:all .2s;white-space:nowrap;display:flex;align-items:center;gap:6px;}
        .crisis-root .tab.on{color:#00e6b8;border-bottom-color:#00e6b8;}
        .crisis-root .tab:hover{color:#dff2ec;}
        .crisis-root .card{background:#0d1c17;border:1px solid #1a2e26;border-radius:14px;padding:20px;}
        .crisis-root .input{width:100%;background:#060d09;border:1px solid #1a2e26;border-radius:10px;padding:12px 16px;color:#dff2ec;font-family:'Outfit',sans-serif;font-size:14px;resize:none;}
        .crisis-root .input:focus{outline:none;border-color:#00b894;}
        .crisis-root .btn{background:#00b894;color:#07100d;border:none;padding:10px 20px;border-radius:9px;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;cursor:pointer;transition:all .15s;}
        .crisis-root .btn:hover{background:#00e6b8;transform:translateY(-1px);}
        .crisis-root .btn2{background:none;border:1px solid #1a2e26;color:#6a9e90;padding:8px 16px;border-radius:8px;font-family:'Outfit',sans-serif;font-size:12px;cursor:pointer;transition:all .15s;}
        .crisis-root .btn2:hover{border-color:#00b894;color:#00b894;}
        .crisis-root .chip{background:#0d1c17;border:1px solid #1a2e26;border-radius:20px;padding:5px 12px;font-size:12px;color:#6a9e90;cursor:pointer;transition:all .15s;}
        .crisis-root .chip:hover,.crisis-root .chip.on{background:#112318;border-color:#00b894;color:#00e6b8;}
        .crisis-root .fade{animation:crisisfade .35s ease;}
        @keyframes crisisfade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .crisis-root .pulse{animation:crisispulse 1.4s ease-in-out infinite;}
        @keyframes crisispulse{0%,100%{opacity:1}50%{opacity:.3}}
        .crisis-root .country-select{background:#0d1c17;border:1px solid #1a2e26;color:#dff2ec;padding:8px 12px;border-radius:8px;font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;}
        .crisis-root .country-select:focus{outline:none;border-color:#00b894;}
        .crisis-root .search-input{background:#060d09;border:1px solid #1a2e26;border-radius:8px;padding:8px 12px;color:#dff2ec;font-family:'Outfit',sans-serif;font-size:13px;width:100%;}
        .crisis-root .search-input:focus{outline:none;border-color:#00b894;}
        .crisis-root .emergency-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.95);display:flex;align-items:center;justify-content:center;padding:20px;}
        .crisis-root .chat-msg{padding:12px 16px;border-radius:12px;margin-bottom:8px;font-size:14px;line-height:1.65;max-width:85%;}
      `}</style>

      <div className="crisis-root">
        {/* ——— EMERGENCY OVERLAY ——— */}
        {showEmergency && (
          <div className="emergency-overlay">
            <div style={{ background:"#0d0608", border:"2px solid #FF2D55", borderRadius:20, padding:36, maxWidth:520, width:"100%", textAlign:"center" }} className="fade">
              <div style={{ fontSize:48, marginBottom:12 }}>🚨</div>
              <div style={{ fontFamily:"'Outfit'", fontSize:26, fontWeight:900, color:"#FF2D55", marginBottom:10 }}>You are not alone right now.</div>
              <p style={{ color:"#dff2ec", fontSize:15, lineHeight:1.8, marginBottom:24 }}>What you're feeling is real and it matters. A real person is waiting to listen — right now, for free, with no judgment.</p>
              {(() => { const c = getCountryData(); return (
                <div>
                  {c.lines.slice(0,2).map((line,i) => (
                    <div key={i} style={{ background:"#180a0d", border:`1px solid ${i===0?"#FF2D55":"#2d1520"}`, borderRadius:12, padding:16, marginBottom:10 }}>
                      <div style={{ fontSize:12, color:"#9e6a78", marginBottom:4 }}>{line.name}</div>
                      {line.num && <div style={{ fontSize:28, fontWeight:900, color: i===0?"#FF2D55":"#dff2ec" }}>{line.num}</div>}
                      {line.text && <div style={{ fontSize:13, color:"#6a9e90", marginTop:4 }}>{line.text}</div>}
                      <div style={{ fontSize:11, color:"#4a6860", marginTop:3 }}>{line.available}</div>
                    </div>
                  ))}
                  <div style={{ background:"#0a0608", borderRadius:10, padding:12, marginBottom:20 }}>
                    <div style={{ fontSize:11, color:"#9e6a78" }}>EMERGENCY SERVICES</div>
                    <div style={{ fontSize:22, fontWeight:800, color:"#FF2D55" }}>{c.emergency}</div>
                  </div>
                </div>
              ); })()}
              <button className="btn" style={{ width:"100%", padding:14, fontSize:15, marginBottom:10 }} onClick={() => setShowEmergency(false)}>I've reached out for help ✓</button>
              <button className="btn2" style={{ width:"100%" }} onClick={() => setShowEmergency(false)}>I'm safe right now</button>
            </div>
          </div>
        )}

        {/* ——— CRISIS SUPPORT MODAL (severity-based) ——— */}
        <AnimatePresence>
          {crisisModalSeverity && (
            <CrisisSupportModalContent
              severity={crisisModalSeverity}
              region={country}
              onClose={() => setCrisisModalSeverity(null)}
              onNotifyTrustedContact={(contact) => {
                console.log("[Crisis] Trusted contact notification requested:", contact);
              }}
              safetyPlanUrl="https://suicidepreventionlifeline.org/wp-content/uploads/2016/08/Brown_StanleySafetyPlanTemplate.pdf"
            />
          )}
        </AnimatePresence>

        {/* ——— HEADER ——— */}
        <div style={{ background:"linear-gradient(135deg,#0d1f18,#07100d)", borderBottom:"1px solid #1a2e26", padding:"20px 28px" }}>
          <div style={{ maxWidth:920, margin:"0 auto", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:44, height:44, background:"linear-gradient(135deg,#00b894,#007a63)", borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🛡️</div>
            <div>
              <div style={{ fontWeight:900, fontSize:20, letterSpacing:"-0.02em" }}>Psychage Crisis Intelligence System</div>
              <div style={{ fontSize:12, color:"#6a9e90", marginTop:1 }}>AI-Powered · 60+ Countries · Real-Time · Privacy-First · ThroughLine Integrated</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:16 }}>
              <div>
                <div style={{ fontSize:11, color:"#6a9e90" }}>Your location</div>
                <select className="country-select" value={country} onChange={e => setCountry(e.target.value)} style={{ fontSize:12, padding:"4px 8px" }}>
                  {Object.entries(GLOBAL_CRISIS_DB).map(([code, d]) => (
                    <option key={code} value={code}>{d.flag} {d.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:"#30D158" }} className="pulse"></div>
                <span style={{ fontSize:11,color:"#30D158",fontWeight:700 }}>LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ——— DEV: Severity toggle (dev mode only) ——— */}
        {import.meta.env.DEV && (
          <div style={{ background:"#0d1610", borderBottom:"1px solid #1a2e26", padding:"8px 28px", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:10, color:"#4a6860", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>Test Modal:</span>
            {(["WATCH","URGENT","CRISIS"] as const).map(s => (
              <button key={s} className="chip" style={{ fontSize:11, padding:"4px 10px", background: crisisModalSeverity === s ? "#1a3028" : undefined }} onClick={() => setCrisisModalSeverity(s)}>
                {s === "WATCH" ? "💛" : s === "URGENT" ? "🟠" : "🚨"} {s}
              </button>
            ))}
          </div>
        )}

        {/* ——— TABS ——— */}
        <div style={{ borderBottom:"1px solid #1a2e26", background:"#0a1610" }}>
          <div style={{ maxWidth:920, margin:"0 auto", display:"flex", overflowX:"auto" }}>
            {CRISIS_TABS.map(t => <button key={t.id} className={`tab ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>{t.icon} {t.label}</button>)}
          </div>
        </div>

        {/* ——— CONTENT ——— */}
        <div style={{ maxWidth:920, margin:"0 auto", padding:"28px 20px" }}>
          {tab === "demo" && (
            <CrisisAIDemo
              countryData={getCountryData()}
              input={input}
              setInput={setInput}
              detectedTier={detectedTier}
              setDetectedTier={setDetectedTier}
              aiLoading={aiLoading}
              setAiLoading={setAiLoading}
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              setShowEmergency={setShowEmergency}
              setCrisisModalSeverity={setCrisisModalSeverity}
            />
          )}
          {tab === "global" && (
            <CrisisGlobalResources
              country={country}
              setCountry={setCountry}
              countrySearch={countrySearch}
              setCountrySearch={setCountrySearch}
              region={region}
              setRegion={setRegion}
            />
          )}
          {tab === "mood" && (
            <CrisisMoodTracker
              moodLog={moodLog}
              setMoodLog={setMoodLog}
              moodInput={moodInput}
              setMoodInput={setMoodInput}
              setDetectedTier={setDetectedTier}
              setShowEmergency={setShowEmergency}
            />
          )}
          {tab === "safety" && (
            <CrisisSafetyPlan
              safetyPlan={safetyPlan}
              setSafetyPlan={setSafetyPlan}
              safetyStep={safetyStep}
              setSafetyStep={setSafetyStep}
            />
          )}
          {tab === "compete" && <CrisisCompetitors />}
          {tab === "arch" && <CrisisArchitecture />}
        </div>

        <div style={{ borderTop:"1px solid #1a2e26", padding:"16px 28px", textAlign:"center" }}>
          <p style={{ fontSize:11, color:"#2a4a40" }}>Psychage Crisis Intelligence System · Powered by Claude AI + ThroughLine · Built with Dr. Lena Dobson · Privacy-First Architecture</p>
          <p style={{ fontSize:10, color:"#1a3028", marginTop:3 }}>In any emergency, always call local emergency services immediately. This is an educational tool.</p>
        </div>
      </div>
    </div>
  );
}
