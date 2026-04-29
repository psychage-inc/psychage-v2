# How to Use the AI Rebuild Research Prompt

## 📋 Overview

You now have a comprehensive research prompt that will guide Claude (claude.ai) to design a world-class mental health AI chatbot for Psychage. Here's how to use it:

---

## 🚀 Step-by-Step Process

### **Step 1: Copy the Research Prompt**

Open [`AI_REBUILD_RESEARCH_PROMPT.md`](./AI_REBUILD_RESEARCH_PROMPT.md) and copy the entire contents.

### **Step 2: Start a New Claude Chat**

Go to [claude.ai](https://claude.ai) and start a **new conversation** (important: use a fresh chat for best results).

### **Step 3: Paste the Prompt**

Paste the entire research prompt into Claude and send it.

### **Step 4: Wait for Research** (30-60 minutes)

Claude will:
- ✅ Research mental health AI safety standards (FDA, HIPAA, APA)
- ✅ Analyze RAG architectures (vector databases, embeddings, retrieval)
- ✅ Study web search integration patterns (Brave, Perplexity, etc.)
- ✅ Compare LLM providers (Claude, GPT-4, Gemini) for healthcare
- ✅ Design complete technical architecture
- ✅ Examine existing systems (Woebot, Wysa, HealthTap)
- ✅ Create safety protocols and crisis detection flows
- ✅ Write detailed prompts for safety classifiers
- ✅ Provide cost breakdowns and implementation timeline

### **Step 5: Receive Complete Technical Specification**

Claude will deliver a **3000-5000 word technical specification** with:

1. **Executive Summary** - What we're building
2. **Safety & Compliance Framework** - Legal/ethical guidelines
3. **Technical Architecture** - Complete system design
4. **Content Retrieval Strategy** - RAG + web search
5. **LLM Configuration** - Prompts, models, providers
6. **Implementation Roadmap** - Phased build plan
7. **Technology Stack** - Specific tool recommendations
8. **Code Architecture** - File structure and modules
9. **Testing Strategy** - Quality assurance plan
10. **Privacy & Data Handling** - GDPR/HIPAA compliance

### **Step 6: Copy the Specification**

When Claude finishes, **copy the entire technical specification** it generates.

### **Step 7: Return to Claude Code (Me!)**

Come back to this project and say:

> "Here's the technical specification from Claude. Let's build the AI chatbot system according to this spec."

Then paste the specification.

### **Step 8: Implementation Begins** 🎉

I (Claude Code) will:
- ✅ Review the specification
- ✅ Set up the project structure
- ✅ Install required dependencies
- ✅ Build the RAG pipeline (content ingestion, vector search)
- ✅ Implement safety classifiers (input/output validation)
- ✅ Create the LLM integration (with proper prompts)
- ✅ Add web search fallback
- ✅ Build the chat UI component
- ✅ Set up API routes
- ✅ Write comprehensive tests
- ✅ Deploy and configure

---

## 🎯 What You'll Get

### From Claude (Research Phase):
- Deep research from 15+ authoritative sources
- Production-ready architecture design
- Safety protocols aligned with FDA/HIPAA
- Specific technology recommendations with cost estimates
- Complete prompt engineering templates
- Implementation timeline

### From Claude Code (Build Phase):
- Fully functional AI chatbot
- Internal content (articles/videos) with RAG
- Web search fallback for missing content
- Multi-layer safety screening
- Crisis detection system
- Clean, tested, documented code
- Ready to deploy on Vercel

---

## 📊 Expected Timeline

| Phase | Duration | Who |
|-------|----------|-----|
| Research & Spec | 1-2 hours | Claude (claude.ai) |
| Review & Questions | 30 min | You + Claude Code |
| Implementation | 4-8 hours | Claude Code |
| Testing & Refinement | 2-3 hours | Claude Code |
| **Total** | **8-14 hours** | - |

---

## 💡 Pro Tips

1. **Use Claude Pro/Opus** on claude.ai if possible - better research quality
2. **Read the spec before implementation** - you might want to adjust priorities
3. **Start with Phase 1 (MVP)** - internal RAG only, add web search later
4. **Test safety early** - try to break it with edge cases
5. **Monitor costs** - set up billing alerts on LLM provider

---

## 🔄 Alternative: Quick Start

If you want to skip research and start building immediately:

**Option A**: Use the existing advanced AI system in `/src/app/api/ai/` as a base
- Already has RAG, safety, analytics
- Just needs frontend integration

**Option B**: I can design a simpler system based on best practices
- Faster to build (2-4 hours)
- May not be as comprehensive

Let me know which path you prefer!

---

## ❓ Questions to Consider

Before sending to Claude for research, think about:

1. **Budget**: How much per month for AI (LLM + search + vector DB)?
   - Low: $50-100/month (1K users)
   - Medium: $200-500/month (5K users)
   - High: $1K+/month (20K+ users)

2. **Priority**: Speed vs Safety vs Features?
   - Fast MVP: 2-3 days
   - Production-ready: 1-2 weeks
   - Enterprise-grade: 3-4 weeks

3. **Hosting**: Where will this run?
   - Vercel Serverless (easy, scales automatically)
   - Dedicated backend (more control, better for heavy traffic)

4. **Content Update Frequency**:
   - Weekly article updates? (simple re-indexing)
   - Daily? (need automated pipeline)
   - Real-time? (webhook-based ingestion)

**Add these answers** to the research prompt if you have strong preferences!

---

## 📞 Next Steps

1. ✅ Read through `AI_REBUILD_RESEARCH_PROMPT.md`
2. ✅ Copy it to claude.ai
3. ✅ Wait for the technical specification
4. ✅ Bring it back here
5. ✅ Let's build! 🚀

---

**Questions?** Just ask! I'm here to help throughout the entire process.
