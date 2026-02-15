# Deployment Checklist

Pre-deployment verification checklist for Psychage V2.

---

## Pre-Deployment

### Environment Variables

- [ ] `VITE_API_URL` - Set to production backend URL
- [ ] `VITE_SUPABASE_URL` - Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- [ ] `VITE_SANITY_PROJECT_ID` - Sanity project ID
- [ ] `VITE_SANITY_DATASET` - Sanity dataset (production)
- [ ] `VITE_SANITY_API_VERSION` - Sanity API version
- [ ] `VITE_GEMINI_API_KEY` - Google Gemini API key (restrict in GCP console)
- [ ] `VITE_DEBUG_MODE` - Set to `false`

### Build Verification

```bash
# Run full build
npm run build

# Preview production build locally
npm run preview

# Verify in browser at http://localhost:4173
```

### Code Quality

- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` completes successfully (includes TypeScript check)
- [ ] No console errors in production build
- [ ] All critical routes load correctly

### Testing

- [ ] E2E auth tests pass: `npm run test:e2e`
- [ ] Manual smoke test of key features:
  - [ ] Homepage loads with hero section
  - [ ] Login/Signup forms work
  - [ ] Provider directory loads
  - [ ] Article pages render content from Sanity
  - [ ] Tools landing page displays correctly
  - [ ] Dashboard loads for authenticated users

### Security

- [ ] No API keys exposed in client-side code
- [ ] Supabase RLS policies configured
- [ ] CORS configured on backend
- [ ] Rate limiting enabled on API
- [ ] Gemini API key restricted to specific domains

---

## Deployment (Vercel)

### Vercel Configuration

File: `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Deployment Steps

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy from main branch
4. Verify deployment at production URL

### Environment Variables in Vercel

Add these in Project Settings > Environment Variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| VITE_API_URL | https://psychage-backend.vercel.app | Production |
| VITE_SUPABASE_URL | https://ozourhqyqtpppvpbhphw.supabase.co | All |
| VITE_SUPABASE_ANON_KEY | (your key) | All |
| VITE_SANITY_PROJECT_ID | w1sh63w6 | All |
| VITE_SANITY_DATASET | production | Production |
| VITE_SANITY_API_VERSION | 2024-01-01 | All |
| VITE_GEMINI_API_KEY | (your key) | All |
| VITE_DEBUG_MODE | false | Production |

---

## Post-Deployment

### Verification

- [ ] Homepage loads at production URL
- [ ] Navigation works (React Router)
- [ ] Auth flow works (login/signup)
- [ ] API calls succeed (check Network tab)
- [ ] Images and assets load
- [ ] No console errors
- [ ] Meta tags render correctly (SEO)

### Performance

- [ ] Lighthouse score > 80 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Core Web Vitals pass
- [ ] No layout shifts on page load

### Monitoring

- [ ] Error tracking enabled (if using Sentry/LogRocket)
- [ ] Analytics tracking (if applicable)
- [ ] Uptime monitoring configured

---

## Rollback Procedure

If issues are detected post-deployment:

1. **Quick Rollback**: In Vercel, go to Deployments > Previous deployment > "Instant Rollback"
2. **Investigate**: Check browser console, network tab, Vercel logs
3. **Fix Forward**: Create hotfix branch, test, deploy

---

## Production URLs

- **Frontend**: https://psychage.vercel.app (or custom domain)
- **Backend**: https://psychage-backend.vercel.app
- **Supabase**: https://ozourhqyqtpppvpbhphw.supabase.co
- **Sanity Studio**: https://psychage.sanity.studio

---

## Emergency Contacts

- **Vercel Support**: support@vercel.com
- **Supabase Status**: https://status.supabase.com
- **Sanity Status**: https://status.sanity.io

---

## Last Updated

February 2026
