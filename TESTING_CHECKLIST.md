# MindMate 2.0 - End-to-End Testing Checklist

**Goal**: Verify the complete system works from database → API → UI

---

## ✅ Pre-Flight Checklist

### 1. Install Dependencies

```bash
npm install @anthropic-ai/sdk openai @vercel/node tsx @portabletext/toolkit
```

**Verify installation**:
```bash
npm list @anthropic-ai/sdk openai tsx
```

Should show all three packages installed.

---

### 2. Environment Variables

Check your `.env` file has these (copy from `.env.ai.example`):

```bash
# Required for testing
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
VITE_SUPABASE_URL=https://...supabase.co

# Already have these
VITE_SANITY_PROJECT_ID=w1sh63w6
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

**Check if they're loaded**:
```bash
# Quick test
node -e "require('dotenv').config(); console.log('✅ ANTHROPIC_API_KEY:', process.env.ANTHROPIC_API_KEY ? 'SET' : 'MISSING'); console.log('✅ OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'SET' : 'MISSING');"
```

---

## 🗄️ Database Setup

### Step 1: Run Migration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. SQL Editor → New Query
4. Copy entire contents of: `supabase/migrations/20260303000003_mindmate_pgvector.sql`
5. Paste and click **Run**

**Expected output**:
```
✅ MindMate 2.0 vector database schema created successfully
```

### Step 2: Verify Database

```bash
npm run ai:test
```

**Expected**: 5/5 tests pass

**If fails**, check errors and fix:
- Test 1 fails → Check `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Test 2 fails → Run `CREATE EXTENSION IF NOT EXISTS vector;` in SQL editor
- Test 3 fails → Re-run migration
- Test 4 fails → Check `OPENAI_API_KEY`
- Test 5 warns "No embeddings" → Normal at this stage

---

## 📚 Content Ingestion

### Step 3: Ingest Test Articles

Start with 5 articles:

```bash
npm run ai:ingest:test
```

**Expected output**:
```
🚀 MindMate 2.0 - Sanity Content Ingestion

📚 Fetching articles from Sanity...
✅ Found 5 published articles

📦 Processing batch 1/1

  Processing: [Article Title]
  📄 Created 8 chunks
  ✅ Inserted 8/8 chunks

...

====================================================================
✅ INGESTION COMPLETE
====================================================================
Articles processed: 5/5
Chunks created: 40-60
====================================================================
```

**If fails**:
- "No articles found" → Check `VITE_SANITY_PROJECT_ID` is correct
- "OpenAI error" → Check `OPENAI_API_KEY`
- "Supabase error" → Check service role key

### Step 4: Verify Embeddings

```bash
npm run ai:test
```

Now Test 5 should show:
```
5️⃣  Testing vector search...
   📊 Found 40-60 embeddings in database
   ✅ Vector search working (found 3 results)

   🔍 Top result:
      Title: [Article Title]
      Similarity: 75-85%
```

---

## 🎨 Frontend Testing

### Step 5: Start Dev Server

```bash
npm run dev
```

**Expected**: Server starts on `http://localhost:5173`

### Step 6: Open MindMate

Visit: `http://localhost:5173/tools/mindmate`

**Expected visual**:
- ✅ Blue disclosure banner at top (first visit)
- ✅ MindMate header with bot icon
- ✅ Empty chat with "How can I help you today?"
- ✅ 3 suggested questions
- ✅ Input field at bottom
- ✅ "MindMate is an AI education assistant, not a therapist" disclaimer

**Check**:
- [ ] Page loads without console errors
- [ ] Dark mode toggle works (if you have it)
- [ ] Mobile view looks good (resize browser)

---

## 💬 Chat Functionality Testing

### Test 1: Normal Query

**Input**: "What is anxiety?"

**Expected flow**:
1. Message appears in chat (right side, teal bubble)
2. Loading animation shows (pulsing dots)
3. AI response appears (left side, white bubble with MindMate icon)
4. Citation cards appear below response (if articles match)
5. Thumbs up/down buttons appear

**Check**:
- [ ] Message sends on Enter key
- [ ] Message sends on Send button click
- [ ] Loading state shows
- [ ] Response appears in < 5 seconds
- [ ] Citations are clickable
- [ ] Citations link to correct articles

**If fails**:
- Network error in console → Check API route exists at `/api/ai/chat`
- 500 error → Check server logs for details
- No response → Check `ANTHROPIC_API_KEY`
- No citations → Expected if RAG threshold too high (check similarity scores)

---

### Test 2: Crisis Detection ⚠️

**Input**: "I want to hurt myself"

**Expected flow**:
1. Message sends normally
2. **Amber safety banner appears** at top of chat
3. Banner shows:
   - "You're not alone, and support is available right now"
   - 988 Suicide & Crisis Lifeline (clickable)
   - Crisis Text Line (clickable)
   - International resources (clickable)
4. **10-second countdown** before dismiss button activates
5. AI response should be crisis template (not LLM-generated)

**Check**:
- [ ] Safety banner appears immediately
- [ ] Countdown shows and counts down
- [ ] Can't dismiss before 10 seconds
- [ ] All resource links work
- [ ] 988 link opens phone dialer (on mobile)
- [ ] Crisis Text Line opens SMS (on mobile)

**If fails**:
- Banner doesn't appear → Check `safetyLevel` in API response
- LLM generates response → Crisis detection failed (check `/api/ai/chat` safety layer)

---

### Test 3: Feedback

**Input**: Any normal question

**After AI responds**:
1. Hover over AI message
2. See thumbs up/down buttons
3. Click thumbs up
4. Button becomes disabled

**Check**:
- [ ] Feedback buttons appear
- [ ] Click registers
- [ ] Button disables after click
- [ ] Request sent to `/api/ai/feedback` (check Network tab)

---

### Test 4: Session Persistence

1. Send a few messages
2. Refresh page
3. Messages should reload

**Check**:
- [ ] Messages persist after refresh
- [ ] Session ID stays the same
- [ ] "Clear chat" button works

---

### Test 5: Disclosure Banner

1. First visit → Banner shows
2. Click X to dismiss
3. Refresh page → Banner shouldn't show
4. Clear localStorage → Banner shows again

**Check**:
- [ ] Banner appears on first visit
- [ ] Dismisses properly
- [ ] Doesn't show again after dismiss

---

## 🎨 UI/UX Testing

### Visual Checks

**Light Mode**:
- [ ] Chat bubbles have proper contrast
- [ ] Citation cards are readable
- [ ] Buttons are clearly visible
- [ ] Loading states are clear

**Dark Mode**:
- [ ] All text is readable
- [ ] Colors adapt properly
- [ ] No harsh white backgrounds
- [ ] Proper contrast maintained

**Mobile** (resize to 375px width):
- [ ] Chat bubbles stack properly
- [ ] Input field is accessible
- [ ] Citation cards fit screen
- [ ] Safety banner is readable
- [ ] No horizontal scroll

**Animations**:
- [ ] Messages slide in smoothly
- [ ] Loading animation is smooth
- [ ] Banner slide-down is smooth
- [ ] No jank or stuttering

---

## 🧪 Edge Case Testing

### Test 6: Empty Query

**Input**: Send empty message (just spaces)

**Expected**: Nothing happens, send button disabled

**Check**:
- [ ] Can't send empty messages

---

### Test 7: Very Long Message

**Input**: Paste 500+ words

**Expected**: Sends normally, response may take longer

**Check**:
- [ ] Long message displays properly
- [ ] API handles it (may truncate)
- [ ] Response still works

---

### Test 8: Rapid Fire

**Input**: Send 5 messages quickly

**Expected**:
- Messages queue properly
- No race conditions
- Responses appear in order

**Check**:
- [ ] All messages send
- [ ] All responses appear
- [ ] Correct order maintained

---

### Test 9: Special Characters

**Input**: "What about anxiety & depression? (PTSD too!)"

**Expected**: Handles normally

**Check**:
- [ ] Special characters don't break anything
- [ ] Response is coherent

---

### Test 10: Multiple Citations

**Input**: "Tell me about depression, anxiety, and PTSD"

**Expected**: Multiple citation cards if matches found

**Check**:
- [ ] Multiple cards render
- [ ] All cards are clickable
- [ ] No duplicates

---

## 📊 Performance Testing

### Metrics to Check

Open DevTools → Network tab:

1. **First message**:
   - [ ] API response < 3 seconds
   - [ ] Embedding generation < 500ms
   - [ ] Vector search < 200ms

2. **Page load**:
   - [ ] Initial load < 2 seconds
   - [ ] No bundle size warnings

3. **Memory**:
   - [ ] No memory leaks (send 20 messages, check memory usage)
   - [ ] localStorage stays reasonable size

---

## ✅ Final Checklist

Before declaring success:

- [ ] All 10 tests pass
- [ ] No console errors
- [ ] Crisis detection works 100%
- [ ] Citations link correctly
- [ ] Feedback works
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Performance acceptable

---

## 🐛 Common Issues & Fixes

### Issue: "API route not found" (404)

**Cause**: Vercel dev server not running or API routes not detected

**Fix**:
```bash
npm i -g vercel
vercel dev
```

Use Vercel dev instead of Vite dev for local API routes.

---

### Issue: "No citations appear"

**Cause**: Similarity threshold too high or no matching articles

**Fix**:
1. Check similarity scores in logs
2. Lower threshold in API route (0.72 → 0.6)
3. Ingest more articles

---

### Issue: "Crisis banner doesn't trigger"

**Cause**: Safety layer not detecting keywords

**Fix**:
Check `/api/ai/chat` → `classifyInputSafety` function
Verify crisis keywords include your test phrase

---

### Issue: "Rate limit exceeded"

**Cause**: Sent too many requests (20/min limit)

**Fix**: Wait 1 minute or increase limit in `/api/ai/chat`

---

## 📝 Test Results Template

After testing, document results:

```
## Test Results - [Date]

**Environment**: Local dev
**Browser**: Chrome/Firefox/Safari
**Database**: Embeddings count: XX

### Passed Tests
- ✅ Test 1: Normal query
- ✅ Test 2: Crisis detection
- ✅ Test 3: Feedback
- ✅ Test 4: Session persistence
- ✅ Test 5: Disclosure banner
- ✅ Test 6-10: Edge cases

### Failed Tests
- ❌ [Test name]: [Issue description]

### Bugs Found
1. [Bug description] - [Severity: Critical/High/Medium/Low]
2. [Bug description] - [Severity]

### Performance
- Average response time: Xs
- Page load time: Xs
- Memory usage: Acceptable/High

### Notes
- [Any observations]
- [Suggestions for improvement]

### Next Steps
- [ ] Fix bugs
- [ ] Deploy to staging
- [ ] Run safety test suite
```

---

**Start with Step 1 (Dependencies) and work through each section!**

Report back any errors and we'll fix them together. 🚀
