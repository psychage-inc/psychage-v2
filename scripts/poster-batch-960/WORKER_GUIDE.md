# Poster generation worker guide

You generate Psychage clay posters on the Higgsfield MCP and wire them to Supabase. You
process ONE slice file of prodids. Work through them ONE AT A TIME, in order.

## Per prodid (repeat for every prodid in your slice)
1. **Build the prompt.** Run:
   `POSTER_SAFE=1 npx tsx scripts/poster-batch-960/build-prompt.ts <prodid>`
   The prompt is the text between the `===PROMPT <prodid>===` and `===END <prodid>===`
   markers. (POSTER_SAFE=1 is REQUIRED — it prevents the headline from being duplicated.)
2. **Generate.** Call the Higgsfield MCP tool `generate_image` with:
   `{ "params": { "model": "nano_banana_pro", "aspect_ratio": "16:9", "prompt": "<the prompt text>" } }`
   Take `results[0].id` as the job id. (If the tool returns a `recovery_tool`, call it
   immediately as instructed, then continue.)
3. **Poll.** Call `job_status` with `{ "jobId": "<id>", "sync": true }`. If status is not
   `completed`, call it again (wait the `poll_after_seconds` it returns; up to ~6 tries).
   When completed, read `generation.results.rawUrl` (an https URL).
4. **Wire.** Run:
   `npx tsx scripts/poster-batch-960/wire-one.ts <prodid> "<rawUrl>"`
   It prints ONE JSON line. `{"state":"wired",...}` = success; `{"state":"failed",...}` = failure.
5. **Retry.** If generation errors, the URL is missing, or wire-one prints `failed`, retry
   the whole cycle for that prodid ONCE more (2 attempts total). If it still fails, record it
   as failed with the error message and MOVE ON — never stop the slice.

## Rules
- Do NOT edit the manifest or any other file except your results file (below). wire-one.ts
  does the upload + DB wire; the manifest is reconciled separately.
- Process every prodid in your slice. Keep going past failures.
- One generation = 2 credits. Do not generate more than 2 attempts per prodid.

## Output
When done, write a JSON array of your results to your assigned results file:
`scripts/poster-batch-960/.tmp/results/<sliceName>.json`
Each element: `{ "prodid": "...", "state": "wired"|"failed", "error": "..."? }`.
Return a one-line summary: `<N> wired, <M> failed` and list any failed prodids + reasons.
