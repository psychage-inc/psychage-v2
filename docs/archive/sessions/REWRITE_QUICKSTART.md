# Article Rewrite Quick-Start Guide

## 🎯 Goal
Rewrite 998 articles to meet 1600-1800 word minimum using parallel Claude sessions.

## 📊 Current Status
- **Total Articles:** 998 need rewriting
- **Session Files:** 200 prompt files generated (5 articles each)
- **Location:** `session-prompts/session-001.txt` through `session-200.txt`

---

## ⚡ Quick Start (3 Steps)

### Step 1: Open Multiple Claude Sessions

**Option A: Claude.ai (Recommended)**
1. Go to https://claude.ai
2. Open 10-20 new conversations (Cmd/Ctrl+Click "New Chat")
3. Label them: Session 1, Session 2, etc.

**Option B: Poe (Alternative)**
1. Go to https://poe.com
2. Open 10-20 Claude Opus chats
3. Keep them in separate browser tabs

### Step 2: Copy-Paste & Execute

**For each session:**

1. Open `session-prompts/session-001.txt`
2. Copy entire file contents (Cmd/Ctrl+A, Cmd/Ctrl+C)
3. Paste into Claude session
4. Hit Enter/Send
5. Wait ~2-4 minutes for response
6. Copy HTML output
7. Save to `rewrites/session-001-output.html`

**Repeat for all 200 sessions** (or run in batches of 10-20)

### Step 3: Collect & Update Database

```bash
npx tsx scripts/collect-rewrites.ts
```

This will:
- Validate all rewrites (word count, format)
- Update Supabase database
- Mark articles as `rewrite_status = 'complete'`
- Generate completion report

---

## ⏱️ Time Estimates

| Parallel Sessions | Time to Complete 998 Articles |
|-------------------|-------------------------------|
| **10 sessions** | ~2 hours (20 batches × 5 min) |
| **20 sessions** | ~1 hour (10 batches × 5 min) |
| **50 sessions** | ~25 minutes (4 batches × 5 min) |

**Recommended:** 15-20 parallel sessions for balance

---

## 📋 Session Workflow (Per Session)

**Time:** ~5 minutes total

1. **Setup (30s):** Open prompt file, copy contents
2. **Execute (2-4m):** Paste into Claude, wait for response
3. **Collect (30s):** Copy HTML output, save to file

---

## 💾 Output File Naming

Save each session's output as:

```
rewrites/
  ├── session-001-output.html
  ├── session-002-output.html
  ├── session-003-output.html
  └── ... (200 files total)
```

**Create the directory:**
```bash
mkdir -p rewrites
```

---

## ✅ Validation Checklist (Per Article)

After rewriting, each article should have:

- ✅ **1600-1800 words** (measured without HTML tags)
- ✅ **Original title preserved** (EXACTLY as it was)
- ✅ **Practical exercises section** (2-3 step-by-step exercises)
- ✅ **3-5 concrete examples** (real scenarios)
- ✅ **7+ research citations** (naturally woven in)
- ✅ **HTML format** (Tailwind CSS classes preserved)
- ✅ **Readability ≤8th grade** (clear, accessible language)

---

## 🔧 Troubleshooting

### Claude refuses to output 5 articles
- **Solution:** Ask "Please output all 5 articles as requested"
- Or split session into 2-3 article batches

### Output is cut off mid-article
- **Solution:** Ask "Please continue from where you left off"
- Or use "Continue" button if available

### Word count too low
- **Solution:** Ask "Please expand [Article ID] to reach 1600-1800 words"

### Format doesn't match
- **Solution:** Show Claude an example of correct HTML format
- Reference the original article structure

---

## 📊 Progress Tracking

Create a simple spreadsheet or use this format:

```
Session | Articles | Status | Notes
--------|----------|--------|-------
001     | CAT01-001 to 005 | ✅ Done | All ≥1600
002     | CAT01-006 to 010 | 🔄 In Progress |
003     | CAT01-011 to 015 | ⏳ Pending |
...
```

**Or use the progress tracker:**
```bash
npx tsx scripts/track-rewrite-progress.ts
```

---

## 🎯 Optimization Tips

### Maximize Efficiency

1. **Batch Processing:**
   - Do Sessions 1-10 first
   - Collect outputs
   - Then do Sessions 11-20
   - Repeat until complete

2. **Parallel Execution:**
   - Open 10-20 sessions at once
   - Paste all prompts within 5 minutes
   - Collect all outputs together

3. **Token Conservation:**
   - Each prompt is self-contained
   - No follow-up questions needed
   - Single-shot execution

### Quality Control

1. **Spot Check Every 10th Session:**
   - Verify word counts
   - Check formatting
   - Ensure exercises included

2. **Before Database Update:**
   - Run validation script first
   - Fix any issues
   - Then bulk update database

---

## 📁 File Structure

```
psychage-v2/
├── session-prompts/        # 200 prompt files (READY)
│   ├── session-001.txt
│   ├── session-002.txt
│   └── ...
├── rewrites/              # Your output goes here (CREATE THIS)
│   ├── session-001-output.html
│   ├── session-002-output.html
│   └── ...
├── scripts/
│   ├── generate-rewrite-plan.ts      (✅ Done)
│   ├── generate-session-prompts.ts   (✅ Done)
│   ├── collect-rewrites.ts           (Next: Create)
│   └── track-rewrite-progress.ts     (Next: Create)
└── rewrite-plan.json      # Source data
```

---

## 🚀 Ready to Start?

**Complete these steps:**

1. ✅ Create output directory: `mkdir -p rewrites`
2. ✅ Open 10-20 Claude sessions
3. ✅ Start with `session-001.txt`
4. ✅ Copy → Paste → Execute → Save output
5. ✅ Repeat for all sessions
6. ✅ Run `collect-rewrites.ts` when done

---

## ❓ Questions?

- **How many sessions at once?** 10-20 is optimal
- **Can I pause?** Yes! Track progress and resume anytime
- **What if Claude times out?** Retry the same prompt
- **Can I use different AI models?** Stick to Claude Opus/Sonnet for consistency

---

## 📈 Expected Results

After completing all 200 sessions:

- ✅ **998 articles** expanded to 1600-1800 words
- ✅ **All articles** have practical exercises
- ✅ **All articles** have concrete examples
- ✅ **Database updated** with new content
- ✅ **Quality standards met** across the board

**Total time investment:** 1-2 hours with 15-20 parallel sessions

---

**Let's go! 🚀**
