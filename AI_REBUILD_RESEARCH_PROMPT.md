# AI Chatbot Rebuild - Research & Specification Prompt

**INSTRUCTIONS FOR CLAUDE (claude.ai):**

You are tasked with conducting comprehensive research to design a production-grade mental health AI chatbot for Psychage, a mental health education platform. Your goal is to research best practices, safety protocols, and technical architectures, then deliver a **complete technical specification** that Claude Code can use to build the system.

---

## PROJECT CONTEXT

### Current System
Psychage v2 currently has:
- **MindMate AI**: Basic Google Gemini chatbot (client-side only)
- **Content**: 100+ articles on Sanity CMS + Supabase, mental health videos
- **Tools**: Symptom Navigator, Clarity Score, Mood Journal, Sleep Tracker
- **Users**: Patients seeking mental health education (NOT therapy/diagnosis)

### Target System Requirements
Build an AI chatbot that:
1. **Primary**: Retrieves and links to Psychage's own articles/videos when relevant
2. **Secondary**: If no internal content exists, searches verified web sources (NIMH, Mayo Clinic, etc.)
3. **Safety**: Multiple safety screens to prevent diagnostic language, harmful advice
4. **Compliance**: HIPAA-aware, privacy-first, crisis detection
5. **User Experience**: Fast, helpful, educational (never diagnostic)

---

## RESEARCH TASKS

### PHASE 1: Mental Health AI Safety & Compliance (60 minutes)

Research and document:

1. **Regulatory Landscape**
   - FDA guidelines for mental health AI/chatbots (Digital Health Software Precertification)
   - HIPAA compliance for conversational AI (even if not storing PHI)
   - EU AI Act implications for health-related AI
   - What distinguishes "educational" vs "diagnostic" AI legally?

2. **Safety Protocols from Top Institutions**
   - How does Woebot, Wysa, Replika handle safety?
   - Stanford HAI recommendations for mental health AI
   - What are the industry-standard safety classifiers?
   - Crisis detection: suicide/self-harm keyword lists and beyond

3. **Ethical Guidelines**
   - APA (American Psychological Association) guidelines for mental health tech
   - How to communicate AI limitations to users
   - Informed consent patterns for AI mental health tools
   - When to redirect to human professionals

**Sources to check**:
- FDA Digital Health Center
- NIMH AI research initiatives
- Papers from JMIR Mental Health, Nature Digital Medicine
- Woebot Health blog/research papers
- Reddit: r/MachineLearning, r/LanguageModels (real-world implementation discussions)

---

### PHASE 2: RAG Architecture for Healthcare (45 minutes)

Research best practices for Retrieval-Augmented Generation in healthcare:

1. **Vector Database Selection**
   - pgvector vs Pinecone vs Weaviate vs Qdrant for healthcare
   - Embedding models: OpenAI ada-002 vs Cohere vs open-source alternatives
   - Hybrid search (keyword + semantic) for medical content

2. **Content Ingestion Pipeline**
   - How to chunk mental health articles for optimal retrieval?
   - Metadata strategies (condition tags, severity levels, content types)
   - Handling videos vs articles vs interactive tools
   - Update frequency and cache invalidation

3. **Citation & Source Attribution**
   - How do production RAG systems cite sources?
   - Link injection patterns (don't hallucinate URLs)
   - How to rank internal vs external sources

**Sources to check**:
- LangChain documentation on RAG patterns
- OpenAI cookbook RAG examples
- Papers: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
- Vercel AI SDK RAG implementations
- Real-world examples: Perplexity AI, You.com architecture blogs

---

### PHASE 3: Web Search Integration (30 minutes)

Research how to safely integrate web search as a fallback:

1. **Search APIs & Providers**
   - Brave Search API vs Bing API vs Google Custom Search vs Serper
   - Which allows health-related queries without restrictions?
   - Cost comparison ($/1000 queries)

2. **Source Verification**
   - How to whitelist/trust domains (NIMH, Mayo Clinic, WebMD, etc.)?
   - Domain authority scoring
   - How to filter out unreliable health advice (anti-vax, pseudo-science)
   - Reddit-based health info: when is it valuable vs dangerous?

3. **Search Result Processing**
   - How to extract clean text from web pages
   - LLM-based summarization of search results
   - How to attribute multiple sources in a single answer

**Sources to check**:
- Brave Search API docs
- Perplexity AI technical blog (they're the leader in cited AI search)
- Search quality research papers
- Reddit: r/datasets for health source lists

---

### PHASE 4: LLM Provider Selection & Prompt Engineering (30 minutes)

Research optimal LLM setup for mental health education:

1. **Model Selection**
   - Claude 3.5 Sonnet vs GPT-4 vs Gemini 1.5 Pro for healthcare
   - Which has best safety features out-of-the-box?
   - Which handles citation/grounding best?
   - Cost per conversation

2. **Prompt Engineering Patterns**
   - System prompts that prevent diagnostic language
   - How to enforce "educational only" responses
   - Few-shot examples for mental health conversations
   - Structured output for citations

3. **Safety Layers**
   - Pre-processing: input classification (crisis, harmful, off-topic)
   - Post-processing: output validation (no diagnosis, no medical advice)
   - How to handle edge cases (user asks for suicide methods, medication advice, etc.)

**Sources to check**:
- Anthropic's Claude prompt library (especially healthcare examples)
- OpenAI safety best practices
- Papers on "Constitutional AI" and "AI Safety via Debate"
- Real examples from healthcare AI companies

---

### PHASE 5: Technical Architecture Design (45 minutes)

Based on all research, design the optimal architecture:

1. **System Components**
   - Frontend chat UI (React component)
   - Backend API routes (Next.js API routes or separate service?)
   - Vector database (where hosted?)
   - LLM provider integration
   - Web search integration
   - Analytics & monitoring

2. **Data Flow**
   ```
   User Query → Safety Check → Intent Classification →
   Internal RAG Search → (if insufficient) Web Search →
   LLM Generation with Citations → Output Validation →
   Response with Links → Analytics Log
   ```

3. **Deployment Strategy**
   - Vercel Serverless vs dedicated backend (Fly.io, Railway)?
   - Edge functions for low latency?
   - Caching strategy (Redis?)
   - Rate limiting approach

**Consider**:
- Psychage already uses: React, TypeScript, Supabase, Sanity CMS, Vercel
- Budget: startup-friendly costs
- Scale: 1K-10K users initially

---

### PHASE 6: Similar System Analysis (30 minutes)

Study existing mental health AI chatbots:

1. **Woebot**
   - How does their conversation flow work?
   - What safety disclaimers do they use?
   - How do they handle crisis situations?

2. **Wysa**
   - Content linking patterns
   - Privacy approach
   - AI + human therapist handoff

3. **HealthTap / K Health**
   - Symptom → Information flow
   - How they avoid diagnosis while being helpful

4. **Perplexity AI** (not mental health, but citation leader)
   - How do they present sources?
   - UI/UX for cited answers

**Analyze**: What works? What's clunky? What can Psychage do better?

---

## DELIVERABLE FORMAT

After completing your research, provide a **comprehensive technical specification document** with these sections:

### 1. Executive Summary
- What you're building (1 paragraph)
- Key differentiators from current MindMate
- Expected user experience improvement

### 2. Safety & Compliance Framework
- Required legal disclaimers
- Safety classifier specifications (input/output)
- Crisis detection protocol (step-by-step)
- Off-limits topics and how to handle them
- Sample conversation showing safety in action

### 3. Technical Architecture
```
DETAILED SYSTEM DESIGN:
├── Frontend Component (React/TypeScript)
├── API Layer (Next.js routes or separate service)
├── Content Pipeline (Sanity → Vector DB)
├── RAG Engine (embeddings, search, ranking)
├── Web Search Fallback (when to trigger, how to verify)
├── LLM Integration (provider, model, prompts)
└── Analytics & Monitoring
```

### 4. Content Retrieval Strategy
- **Internal Content (Psychage articles/videos)**
  - Embedding strategy
  - Metadata schema
  - Ranking algorithm (relevance score)
  - Link injection format

- **External Content (web search)**
  - Trigger conditions (when RAG fails)
  - Trusted domain whitelist (20+ sources)
  - Search query formulation
  - Result filtering and summarization

### 5. LLM Configuration
- **Recommended Provider & Model**: [Your choice based on research]
- **System Prompt Template**: Full prompt engineering
- **Input Safety Classifier Prompt**: Exact prompt
- **Output Validator Prompt**: Exact prompt
- **Crisis Response Template**: Pre-written responses
- **Example Conversations**: 5 scenarios (general question, crisis, diagnosis attempt, medication question, off-topic)

### 6. Implementation Roadmap
Break down into phases:
- **Phase 1**: Core RAG with internal content only (MVP)
- **Phase 2**: Add web search fallback
- **Phase 3**: Advanced safety classifiers
- **Phase 4**: Analytics, A/B testing, optimization

### 7. Technology Stack Recommendations
For each component, specify:
- **Vector DB**: [Choice] - why?
- **LLM Provider**: [Choice] - why?
- **Search API**: [Choice] - why?
- **Embedding Model**: [Choice] - why?
- **Hosting**: [Choice] - why?
- **Cost estimate**: $/month for 1K conversations

### 8. Code Architecture Outline
Provide file structure:
```
src/
├── components/ai/
│   ├── PsychageAI.tsx          # Main chat UI
│   ├── MessageList.tsx          # Chat messages
│   ├── CitationCard.tsx         # Article/video links
│   └── SafetyBanner.tsx         # Crisis overlays
├── lib/ai/
│   ├── config.ts                # Configuration
│   ├── rag/
│   │   ├── embeddings.ts        # Generate embeddings
│   │   ├── search.ts            # Vector search
│   │   └── ranking.ts           # Result ranking
│   ├── web-search/
│   │   ├── search.ts            # Web search API
│   │   └── source-verify.ts    # Domain trust scoring
│   ├── safety/
│   │   ├── input-classifier.ts  # Pre-LLM safety
│   │   ├── output-validator.ts  # Post-LLM safety
│   │   └── crisis.ts            # Crisis detection
│   ├── llm/
│   │   ├── provider.ts          # LLM abstraction
│   │   ├── prompts.ts           # All prompts
│   │   └── streaming.ts         # Response streaming
│   └── analytics.ts             # Privacy-safe tracking
└── app/api/ai/
    ├── chat/route.ts            # Main endpoint
    ├── embed/route.ts           # Ingestion endpoint
    └── feedback/route.ts        # User feedback
```

### 9. Testing Strategy
- Unit tests (safety classifiers, RAG search)
- Integration tests (end-to-end conversation flow)
- Safety tests (adversarial inputs, jailbreak attempts)
- Performance benchmarks (response time, cost per query)

### 10. Privacy & Data Handling
- What data is stored (conversations? anonymized?)
- User consent flow
- Data retention policy
- GDPR compliance approach

---

## OUTPUT FORMAT

**Title**: "Psychage AI Chatbot - Complete Technical Specification"

**Structure**: Use the 10 sections above

**Tone**: Technical but clear (Claude Code should be able to implement directly)

**Length**: 3000-5000 words (be thorough)

**Include**:
- ✅ Specific technology choices with justification
- ✅ Code snippets for critical prompts
- ✅ Database schema examples
- ✅ API endpoint specifications
- ✅ Safety protocols with examples
- ✅ Cost breakdown
- ✅ Timeline estimate (hours to implement each phase)

**End with**: "READY FOR IMPLEMENTATION - Pass this spec to Claude Code to begin building"

---

## RESEARCH QUALITY EXPECTATIONS

- Cite at least 15 unique sources (papers, docs, blogs)
- Include real-world examples from production systems
- Balance academic rigor with startup practicality
- Prioritize safety without sacrificing user experience
- Consider Psychage's existing tech stack (React, Supabase, Vercel)
- Budget-conscious (optimize for startup costs)

---

**BEGIN YOUR RESEARCH NOW.**

Take your time to explore each phase thoroughly. The quality of this research will determine the success of the rebuilt AI system. When you're done, deliver the complete technical specification that Claude Code can use to build a world-class mental health AI chatbot.

Good luck! 🚀
