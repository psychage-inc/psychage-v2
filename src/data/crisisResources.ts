// ——— Types ————————————————————————————————————————————————————————————————
export interface CrisisLine {
  name: string;
  num: string | null;
  chat?: boolean;
  text?: string;
  available: string;
  languages?: string[];
}

export interface CountryData {
  name: string;
  flag: string;
  region: string;
  emergency: string;
  lines: CrisisLine[];
}

export interface Competitor {
  name: string;
  status: string;
  statusColor: string;
  approach: string;
  good: string[];
  bad: string[];
  psychageAdvantage: string;
}

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type SafetyPlan = {
  warnings: string;
  reasons: string;
  contacts: string;
  coping: string;
  places: string;
};

// ——— COMPREHENSIVE GLOBAL CRISIS DATABASE (60+ countries) ————————————————
export const GLOBAL_CRISIS_DB: Record<string, CountryData> = {
  // NORTH AMERICA
  US: { name: "United States", flag: "\u{1F1FA}\u{1F1F8}", region: "North America", emergency: "911", lines: [{ name: "988 Suicide & Crisis Lifeline", num: "988", chat: true, text: "Text HOME to 741741", available: "24/7", languages: ["EN","ES"] }, { name: "Crisis Text Line", num: null, text: "Text HOME to 741741", available: "24/7" }, { name: "Trevor Project (LGBTQ+)", num: "1-866-488-7386", available: "24/7" }] },
  CA: { name: "Canada", flag: "\u{1F1E8}\u{1F1E6}", region: "North America", emergency: "911", lines: [{ name: "Talk Suicide Canada", num: "1-833-456-4566", chat: true, available: "24/7" }, { name: "Crisis Services Canada", num: "1-833-456-4566", text: "Text 45645", available: "24/7" }] },
  MX: { name: "Mexico", flag: "\u{1F1F2}\u{1F1FD}", region: "North America", emergency: "911", lines: [{ name: "SAPTEL", num: "55 5259-8121", available: "24/7" }, { name: "INPRF L\u00ednea de la Vida", num: "800 911 2000", available: "24/7" }] },
  // EUROPE
  GB: { name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", region: "Europe", emergency: "999", lines: [{ name: "Samaritans", num: "116 123", chat: false, available: "24/7" }, { name: "SHOUT Crisis Text Line", num: null, text: "Text SHOUT to 85258", available: "24/7" }] },
  DE: { name: "Germany", flag: "\u{1F1E9}\u{1F1EA}", region: "Europe", emergency: "112", lines: [{ name: "Telefonseelsorge", num: "0800 111 0 111", available: "24/7" }, { name: "Telefonseelsorge Alt.", num: "0800 111 0 222", available: "24/7" }] },
  FR: { name: "France", flag: "\u{1F1EB}\u{1F1F7}", region: "Europe", emergency: "15", lines: [{ name: "Num\u00e9ro National Pr\u00e9vention Suicide", num: "3114", chat: true, available: "24/7" }] },
  ES: { name: "Spain", flag: "\u{1F1EA}\u{1F1F8}", region: "Europe", emergency: "112", lines: [{ name: "Tel\u00e9fono de la Esperanza", num: "717 003 717", available: "24/7" }, { name: "Centro de Atenci\u00f3n a la Conducta Suicida", num: "024", available: "24/7" }] },
  IT: { name: "Italy", flag: "\u{1F1EE}\u{1F1F9}", region: "Europe", emergency: "112", lines: [{ name: "Telefono Amico", num: "02 2327 2327", available: "Limited" }, { name: "Telefono Azzurro (Youth)", num: "19696", available: "24/7" }] },
  NL: { name: "Netherlands", flag: "\u{1F1F3}\u{1F1F1}", region: "Europe", emergency: "112", lines: [{ name: "Stichting 113 Zelfmoordpreventie", num: "0800-0113", chat: true, available: "24/7" }] },
  BE: { name: "Belgium", flag: "\u{1F1E7}\u{1F1EA}", region: "Europe", emergency: "112", lines: [{ name: "Centrum Ter Preventie van Zelfdoding", num: "0800 32 123", available: "24/7" }] },
  PT: { name: "Portugal", flag: "\u{1F1F5}\u{1F1F9}", region: "Europe", emergency: "112", lines: [{ name: "SOS Voz Amiga", num: "213 544 545", available: "24/7" }] },
  SE: { name: "Sweden", flag: "\u{1F1F8}\u{1F1EA}", region: "Europe", emergency: "112", lines: [{ name: "Mind Sj\u00e4lvmordslinjen", num: "90101", chat: true, available: "24/7" }] },
  NO: { name: "Norway", flag: "\u{1F1F3}\u{1F1F4}", region: "Europe", emergency: "113", lines: [{ name: "Mental Helse", num: "116 123", available: "24/7" }] },
  DK: { name: "Denmark", flag: "\u{1F1E9}\u{1F1F0}", region: "Europe", emergency: "112", lines: [{ name: "Livslinien", num: "70 201 201", available: "24/7" }] },
  FI: { name: "Finland", flag: "\u{1F1EB}\u{1F1EE}", region: "Europe", emergency: "112", lines: [{ name: "Suomen Mielenterveys ry", num: "09 2525 0111", available: "Daily" }] },
  CH: { name: "Switzerland", flag: "\u{1F1E8}\u{1F1ED}", region: "Europe", emergency: "144", lines: [{ name: "Die Dargebotene Hand", num: "143", available: "24/7" }, { name: "Telefon 143 (La Main Tendue)", num: "143", available: "24/7" }] },
  AT: { name: "Austria", flag: "\u{1F1E6}\u{1F1F9}", region: "Europe", emergency: "144", lines: [{ name: "Telefonseelsorge \u00d6sterreich", num: "142", available: "24/7" }] },
  PL: { name: "Poland", flag: "\u{1F1F5}\u{1F1F1}", region: "Europe", emergency: "112", lines: [{ name: "Telefon Zaufania dla Doros\u0142ych", num: "116 123", available: "24/7" }] },
  CZ: { name: "Czech Republic", flag: "\u{1F1E8}\u{1F1FF}", region: "Europe", emergency: "112", lines: [{ name: "Linka bezpe\u010d\u00ed", num: "116 111", available: "24/7" }] },
  GR: { name: "Greece", flag: "\u{1F1EC}\u{1F1F7}", region: "Europe", emergency: "112", lines: [{ name: "Klimaka NGO", num: "1018", available: "24/7" }] },
  HU: { name: "Hungary", flag: "\u{1F1ED}\u{1F1FA}", region: "Europe", emergency: "112", lines: [{ name: "Lelkiseg\u00e9ly Telefonsz\u00e1m", num: "116 123", available: "24/7" }] },
  RO: { name: "Romania", flag: "\u{1F1F7}\u{1F1F4}", region: "Europe", emergency: "112", lines: [{ name: "Linia Verde", num: "0800 801 200", available: "24/7" }] },
  IE: { name: "Ireland", flag: "\u{1F1EE}\u{1F1EA}", region: "Europe", emergency: "999", lines: [{ name: "Samaritans Ireland", num: "116 123", available: "24/7" }, { name: "Pieta House", num: "116 123", available: "24/7" }] },
  RU: { name: "Russia", flag: "\u{1F1F7}\u{1F1FA}", region: "Europe", emergency: "112", lines: [{ name: "\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0434\u043e\u0432\u0435\u0440\u0438\u044f", num: "8-800-2000-122", available: "24/7" }] },
  UA: { name: "Ukraine", flag: "\u{1F1FA}\u{1F1E6}", region: "Europe", emergency: "112", lines: [{ name: "Lifeline Ukraine", num: "7333", available: "24/7" }] },
  // ASIA-PACIFIC
  AU: { name: "Australia", flag: "\u{1F1E6}\u{1F1FA}", region: "Asia-Pacific", emergency: "000", lines: [{ name: "Lifeline Australia", num: "13 11 14", chat: true, available: "24/7" }, { name: "Beyond Blue", num: "1300 22 4636", chat: true, available: "24/7" }, { name: "13YARN (Indigenous)", num: "13 92 76", available: "24/7" }] },
  NZ: { name: "New Zealand", flag: "\u{1F1F3}\u{1F1FF}", region: "Asia-Pacific", emergency: "111", lines: [{ name: "Lifeline Aotearoa", num: "0800 543 354", available: "24/7" }, { name: "Need to Talk", num: "1737", text: "Text 1737", available: "24/7" }] },
  JP: { name: "Japan", flag: "\u{1F1EF}\u{1F1F5}", region: "Asia-Pacific", emergency: "110", lines: [{ name: "Inochi no Denwa", num: "0120-783-556", available: "24/7" }, { name: "TELL Lifeline (EN/JA)", num: "03-5774-0992", available: "Daily" }] },
  KR: { name: "South Korea", flag: "\u{1F1F0}\u{1F1F7}", region: "Asia-Pacific", emergency: "119", lines: [{ name: "Korea Suicide Prevention Hotline", num: "1393", available: "24/7" }, { name: "Korea Mental Health Crisis", num: "1577-0199", available: "24/7" }] },
  CN: { name: "China", flag: "\u{1F1E8}\u{1F1F3}", region: "Asia-Pacific", emergency: "120", lines: [{ name: "Beijing Suicide Research Center", num: "010-82951332", available: "24/7" }, { name: "Shanghai Mental Health Center", num: "021-12320-5", available: "24/7" }] },
  IN: { name: "India", flag: "\u{1F1EE}\u{1F1F3}", region: "Asia-Pacific", emergency: "112", lines: [{ name: "iCall", num: "9152987821", available: "Mon-Sat" }, { name: "Vandrevala Foundation", num: "1860-2662-345", available: "24/7" }, { name: "NIMHANS iCall", num: "080-46110007", available: "24/7" }] },
  BD: { name: "Bangladesh", flag: "\u{1F1E7}\u{1F1E9}", region: "Asia-Pacific", emergency: "999", lines: [{ name: "Kaan Pete Roi", num: "01779-554391", available: "Daily" }, { name: "National Mental Health Helpline", num: "16789", available: "24/7" }] },
  PK: { name: "Pakistan", flag: "\u{1F1F5}\u{1F1F0}", region: "Asia-Pacific", emergency: "115", lines: [{ name: "Umang Helpline", num: "0317-4288665", available: "Daily" }, { name: "Rozan Counselling", num: "051-2890505", available: "Business hrs" }] },
  LK: { name: "Sri Lanka", flag: "\u{1F1F1}\u{1F1F0}", region: "Asia-Pacific", emergency: "1990", lines: [{ name: "Sumithrayo", num: "011 057 0570", available: "Daily" }] },
  NP: { name: "Nepal", flag: "\u{1F1F3}\u{1F1F5}", region: "Asia-Pacific", emergency: "100", lines: [{ name: "TPO Nepal", num: "1166", available: "24/7" }, { name: "Patan Mental Hospital", num: "01-5522266", available: "24/7" }] },
  PH: { name: "Philippines", flag: "\u{1F1F5}\u{1F1ED}", region: "Asia-Pacific", emergency: "911", lines: [{ name: "Hopeline Philippines", num: "02-8804-4673", available: "24/7" }, { name: "NCMH Crisis Hotline", num: "1553", available: "24/7" }] },
  SG: { name: "Singapore", flag: "\u{1F1F8}\u{1F1EC}", region: "Asia-Pacific", emergency: "995", lines: [{ name: "Samaritans of Singapore", num: "1767", chat: true, available: "24/7" }, { name: "IMH Mental Health Helpline", num: "6389-2222", available: "24/7" }] },
  MY: { name: "Malaysia", flag: "\u{1F1F2}\u{1F1FE}", region: "Asia-Pacific", emergency: "999", lines: [{ name: "Befrienders Kuala Lumpur", num: "03-7627 2929", available: "24/7" }] },
  ID: { name: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}", region: "Asia-Pacific", emergency: "119", lines: [{ name: "Into The Light Indonesia", num: "119 ext 8", available: "24/7" }] },
  TH: { name: "Thailand", flag: "\u{1F1F9}\u{1F1ED}", region: "Asia-Pacific", emergency: "1669", lines: [{ name: "Department of Mental Health Crisis Line", num: "1323", available: "24/7" }] },
  VN: { name: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}", region: "Asia-Pacific", emergency: "115", lines: [{ name: "\u0110\u01b0\u1eddng d\u00e2y t\u01b0 v\u1ea5n s\u1ee9c kh\u1ecfe t\u00e2m th\u1ea7n", num: "1800 599 920", available: "24/7" }] },
  TW: { name: "Taiwan", flag: "\u{1F1F9}\u{1F1FC}", region: "Asia-Pacific", emergency: "119", lines: [{ name: "1925 (An Xin Zhuanxian)", num: "1925", available: "24/7" }] },
  HK: { name: "Hong Kong", flag: "\u{1F1ED}\u{1F1F0}", region: "Asia-Pacific", emergency: "999", lines: [{ name: "The Samaritans Hong Kong", num: "2382 0000", available: "24/7" }, { name: "Suicide Crisis Intervention Centre", num: "2382 0000", available: "24/7" }] },
  // MIDDLE EAST
  IL: { name: "Israel", flag: "\u{1F1EE}\u{1F1F1}", region: "Middle East", emergency: "101", lines: [{ name: "ERAN Emotional First Aid", num: "1201", available: "24/7" }] },
  TR: { name: "Turkey", flag: "\u{1F1F9}\u{1F1F7}", region: "Middle East", emergency: "112", lines: [{ name: "Turkey Suicide Prevention Line", num: "182", available: "24/7" }] },
  SA: { name: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}", region: "Middle East", emergency: "911", lines: [{ name: "National Center for Mental Health Promotion", num: "920033360", available: "24/7" }] },
  AE: { name: "UAE", flag: "\u{1F1E6}\u{1F1EA}", region: "Middle East", emergency: "999", lines: [{ name: "Counselling and Wellbeing", num: "800-HOPE (4673)", available: "24/7" }] },
  IR: { name: "Iran", flag: "\u{1F1EE}\u{1F1F7}", region: "Middle East", emergency: "115", lines: [{ name: "Social Emergency (Aoroj)", num: "123", available: "24/7" }] },
  JO: { name: "Jordan", flag: "\u{1F1EF}\u{1F1F4}", region: "Middle East", emergency: "110", lines: [{ name: "Counselling Center for Mental Health", num: "110", available: "24/7" }] },
  LB: { name: "Lebanon", flag: "\u{1F1F1}\u{1F1E7}", region: "Middle East", emergency: "140", lines: [{ name: "Embrace Lebanon", num: "1564", available: "24/7" }] },
  // AFRICA
  ZA: { name: "South Africa", flag: "\u{1F1FF}\u{1F1E6}", region: "Africa", emergency: "10111", lines: [{ name: "SADAG", num: "0800 456 789", available: "24/7" }, { name: "Lifeline South Africa", num: "0861 322 322", available: "24/7" }] },
  NG: { name: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}", region: "Africa", emergency: "199", lines: [{ name: "Suicide Prevention Initiative Nigeria", num: "234-703-593-8000", available: "24/7" }] },
  KE: { name: "Kenya", flag: "\u{1F1F0}\u{1F1EA}", region: "Africa", emergency: "999", lines: [{ name: "Befrienders Kenya", num: "0800 720 020", available: "Daily" }] },
  ET: { name: "Ethiopia", flag: "\u{1F1EA}\u{1F1F9}", region: "Africa", emergency: "911", lines: [{ name: "EMDH Mental Health", num: "0111-55-44-00", available: "Business hrs" }] },
  GH: { name: "Ghana", flag: "\u{1F1EC}\u{1F1ED}", region: "Africa", emergency: "999", lines: [{ name: "Mental Health Authority Ghana", num: "0800 111 200", available: "24/7" }] },
  EG: { name: "Egypt", flag: "\u{1F1EA}\u{1F1EC}", region: "Africa", emergency: "123", lines: [{ name: "Egypt Suicide Prevention", num: "762 1602", available: "24/7" }] },
  TZ: { name: "Tanzania", flag: "\u{1F1F9}\u{1F1FF}", region: "Africa", emergency: "112", lines: [{ name: "CCBRT Mental Health", num: "0800 750 001", available: "24/7" }] },
  RW: { name: "Rwanda", flag: "\u{1F1F7}\u{1F1FC}", region: "Africa", emergency: "112", lines: [{ name: "Ndera Neuropsychiatric Hospital", num: "0788380580", available: "24/7" }] },
  UG: { name: "Uganda", flag: "\u{1F1FA}\u{1F1EC}", region: "Africa", emergency: "999", lines: [{ name: "Butabika National Referral Mental Hospital", num: "0414-505 000", available: "24/7" }] },
  MA: { name: "Morocco", flag: "\u{1F1F2}\u{1F1E6}", region: "Africa", emergency: "15", lines: [{ name: "Association Achaml", num: "0522 22 53 23", available: "Business hrs" }] },
  ZW: { name: "Zimbabwe", flag: "\u{1F1FF}\u{1F1FC}", region: "Africa", emergency: "999", lines: [{ name: "CAMH Zimbabwe", num: "0800 4400", available: "24/7" }] },
  // LATIN AMERICA
  BR: { name: "Brazil", flag: "\u{1F1E7}\u{1F1F7}", region: "Latin America", emergency: "192", lines: [{ name: "CVV - Centro de Valoriza\u00e7\u00e3o da Vida", num: "188", chat: true, available: "24/7" }] },
  AR: { name: "Argentina", flag: "\u{1F1E6}\u{1F1F7}", region: "Latin America", emergency: "107", lines: [{ name: "Centro de Asistencia al Suicida", num: "135", available: "24/7" }] },
  CO: { name: "Colombia", flag: "\u{1F1E8}\u{1F1F4}", region: "Latin America", emergency: "123", lines: [{ name: "L\u00ednea de atenci\u00f3n 106", num: "106", available: "24/7" }] },
  CL: { name: "Chile", flag: "\u{1F1E8}\u{1F1F1}", region: "Latin America", emergency: "131", lines: [{ name: "Fono Infancia", num: "800 200 818", available: "24/7" }] },
  PE: { name: "Peru", flag: "\u{1F1F5}\u{1F1EA}", region: "Latin America", emergency: "117", lines: [{ name: "L\u00ednea 113 (MINSA)", num: "113", available: "24/7" }] },
  VE: { name: "Venezuela", flag: "\u{1F1FB}\u{1F1EA}", region: "Latin America", emergency: "911", lines: [{ name: "Instituto Nacional de Salud Mental", num: "0800-SALUD-11", available: "24/7" }] },
  EC: { name: "Ecuador", flag: "\u{1F1EA}\u{1F1E8}", region: "Latin America", emergency: "911", lines: [{ name: "L\u00ednea gratuita 171 (Ministerio Salud)", num: "171", available: "24/7" }] },
  BO: { name: "Bolivia", flag: "\u{1F1E7}\u{1F1F4}", region: "Latin America", emergency: "118", lines: [{ name: "Centro de Salud Mental Cochabamba", num: "0800-10-8080", available: "24/7" }] },
  CR: { name: "Costa Rica", flag: "\u{1F1E8}\u{1F1F7}", region: "Latin America", emergency: "911", lines: [{ name: "CCSS Mental Health Line", num: "800-000-0585", available: "24/7" }] },
  CU: { name: "Cuba", flag: "\u{1F1E8}\u{1F1FA}", region: "Latin America", emergency: "104", lines: [{ name: "L\u00ednea de Ayuda Psicol\u00f3gica", num: "103", available: "24/7" }] },
};

// ——— COMPETITOR ANALYSIS DATA ————————————————————————————————————————————
export const COMPETITORS: Competitor[] = [
  {
    name: "Woebot",
    status: "SHUT DOWN June 2025",
    statusColor: "#FF2D55",
    approach: "Keyword-based NLP + rule engine",
    good: ["Clinician-reviewed responses", "CBT-grounded", "HIPAA compliant"],
    bad: ["Dumped crisis hotline then abruptly changed topic", "Zero context awareness", "Couldn't distinguish venting from active crisis", "No global resources", "Regulatory limbo killed the business"],
    psychageAdvantage: "Psychage continues the conversation with warmth, doesn't abandon the user"
  },
  {
    name: "Crisis Text Line",
    status: "ACTIVE",
    statusColor: "#30D158",
    approach: "2-stage NLP: keyword filter \u2192 logistic regression (AUC 0.98)",
    good: ["0.98 AUC on prospective data", "Routes to human counselors", "Reduces wait times"],
    bad: ["US-centric, limited global reach", "Requires a counselor in the loop \u2014 not scalable to 195 countries", "Sold user data through Loris subsidiary (ethics scandal)"],
    psychageAdvantage: "Psychage is privacy-first by architecture \u2014 no data monetization ever"
  },
  {
    name: "BetterHelp",
    status: "FINED $7.8M",
    statusColor: "#FF9F0A",
    approach: "Human therapist matching + basic safety flags",
    good: ["Human therapist connection", "Large provider network"],
    bad: ["Shared IP addresses + health data with Facebook", "FTC fine for HIPAA-adjacent violations", "No proactive crisis detection", "Expensive for underserved users"],
    psychageAdvantage: "Free access, zero ad tracking, client-side processing for privacy"
  },
  {
    name: "Wysa",
    status: "ACTIVE",
    statusColor: "#30D158",
    approach: "AI + clinician escalation path",
    good: ["Escalation to human clinicians", "Evidence-based techniques", "Available in multiple countries"],
    bad: ["Subscription-based (creates access barrier)", "Limited languages (primarily English)", "No real-time IP-based crisis resource routing"],
    psychageAdvantage: "Free, 9+ languages, ThroughLine API for 175+ countries instantly"
  },
  {
    name: "Headspace / Calm",
    status: "ACTIVE",
    statusColor: "#30D158",
    approach: "Wellness content, no active crisis detection",
    good: ["High user engagement", "Quality meditation content"],
    bad: ["No crisis detection at all", "Wellness-only, no clinical layer", "Show meditation during active suicidal crisis (dangerous gap)"],
    psychageAdvantage: "Psychage has a full 3-tier system \u2014 no user falls through the gap"
  }
];

// ——— CRISIS KEYWORDS (multilingual) —————————————————————————————————————
export const CRISIS_KEYWORDS = {
  TIER3: ["kill myself","end my life","suicide","want to die","can't go on","no reason to live","take my life","end it all","harm myself","want to end it","don't want to be here","better off dead","self harm","cutting myself","matarme","suicidarme","quiero morir","me suicider","mourir","mich umbringen","suizid","\u0986\u09a4\u09cd\u09ae\u09b9\u09a4\u09cd\u09af\u09be","\u0645\u0648\u062a","\uc790\uc0b4","\u81ea\u6bba","\u60f3\u6b7b","me matar"],
  TIER2: ["hopeless","worthless","nobody cares","can't take it","no point","trapped","burden","give up","not okay","breaking down","falling apart","in crisis","struggling badly","pointless","empty inside","exhausted by life","no future","alone in this","sin esperanza","hoffnungslos","sans espoir","\u0986\u09b6\u09be\u09b9\u09c0\u09a8"],
  TIER1: ["sad","anxious","worried","overwhelmed","stressed","alone","depressed","scared","confused","lost","not great","rough day","struggling","low","down","tired","can't sleep","panic","nervous","afraid"]
};

// ——— MOOD HISTORY DATA ———————————————————————————————————————————————————
export const MOOD_LABELS = ["\ud83d\ude0a Great","\ud83d\ude42 Good","\ud83d\ude10 Okay","\ud83d\ude14 Low","\ud83d\ude22 Struggling","\ud83d\ude30 Crisis"];
export const MOOD_COLORS = ["#30D158","#64D2FF","#FFD60A","#FF9F0A","#FF6B6B","#FF2D55"];

// ——— SAFETY PLAN STEPS ——————————————————————————————————————————————————
export const SAFETY_PLAN_STEPS = [
  { label: "Warning Signs", field: "warnings" as const, prompt: "What thoughts, feelings, or situations tell you a crisis may be coming?", placeholder: "e.g. I start isolating, stop sleeping, feel nothing matters...", icon: "\u26a1" },
  { label: "Reasons to Live", field: "reasons" as const, prompt: "What are your personal reasons for wanting to stay alive? What matters most to you?", placeholder: "e.g. My family, my dog, wanting to finish my degree, travel...", icon: "\ud83d\udc9b" },
  { label: "Who to Call", field: "contacts" as const, prompt: "Who can you contact when things feel unbearable? Include name and how to reach them.", placeholder: "e.g. Maria \u2014 555-0192, Dr. Patel \u2014 clinic number, my brother James...", icon: "\ud83d\udcde" },
  { label: "Coping Strategies", field: "coping" as const, prompt: "What has helped you get through difficult moments before?", placeholder: "e.g. Walking outside, calling a friend, music, breathing exercises...", icon: "\ud83c\udf3f" },
  { label: "Safe Spaces", field: "places" as const, prompt: "Where can you go to feel safe if things feel overwhelming?", placeholder: "e.g. My grandmother's house, the library, the park near my office...", icon: "\ud83c\udfe1" },
] as const;

// ——— TAB DEFINITIONS ————————————————————————————————————————————————————
export const CRISIS_TABS = [
  { id: "demo", icon: "\ud83d\udcac", label: "AI Demo" },
  { id: "global", icon: "\ud83c\udf0d", label: "Global" },
  { id: "mood", icon: "\ud83d\udcca", label: "Mood" },
  { id: "safety", icon: "\ud83d\udee1\ufe0f", label: "Safety Plan" },
  { id: "compete", icon: "\ud83d\udd2c", label: "vs. Others" },
  { id: "arch", icon: "\u2699\ufe0f", label: "Architecture" },
] as const;

// ——— TEST PHRASES ———————————————————————————————————————————————————————
export const TEST_PHRASES = [
  "I've been feeling anxious lately",
  "I feel completely hopeless and trapped",
  "I want to kill myself",
  "Quiero suicidarme",
  "Je me sens sans espoir",
  "\u0986\u09a4\u09cd\u09ae\u09b9\u09a4\u09cd\u09af\u09be \u0995\u09b0\u09a4\u09c7 \u099a\u09be\u0987",
  "\u6211\u60f3\u6b7b",
];
