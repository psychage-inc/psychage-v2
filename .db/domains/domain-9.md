# Domain 9: Admin CRUD Operations

## Code Path Trace

### Article Admin: src/services/articleAdminService.ts
- Status lifecycle: `draft → in_review → approved/rejected → published → paused → archived`
- Review pipeline: `planned → researched → drafted → in_review → approved → published`
- `ARTICLE_STATUS_TRANSITIONS` constant validates allowed transitions
- `article_status_history` INSERT on EVERY transition (with timestamp + user)
- `logAdminAction()` called comprehensively on: status change, ratings, comments, images, citations, derivatives, reviewer assignment

### Provider Admin
- V1 (ProviderManagement.tsx): approve/reject/suspend — NO audit logging
- V2 (ProviderEditor.tsx): full CRUD with TanStack Query — HAS audit logging
- V2 uses `logAdminAction()` for mutations

### Bulk Import
- V2: NPPES NPI batch import (BulkImport page)

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| ADM-001 | major | V1 admin pages don't write audit logs for provider status changes | ProviderManagement.tsx | - | Add logAdminAction() calls — or deprecate V1 |
| ADM-002 | info | No review moderation queue exists (DB has columns but no admin page) | - | - | Future feature — DB schema ready |
| ADM-003 | info | Article RLS disabled — admin checks frontend-only via useAdminAuth() | - | - | Documented risk |
| ADM-004 | info | No provider DELETE capability in either V1 or V2 — correct design | - | - | Soft delete via status change |

## Edge Cases Verified
- ✅ Article status transitions validated via ARTICLE_STATUS_TRANSITIONS
- ✅ article_status_history records every transition with timestamp + user
- ✅ Article CRUD: admin auth checked via useAdminAuth() (RLS disabled)
- ✅ Image upload: Supabase Storage + article_images table
- ✅ Citation CRUD: getArticleCitations, saveArticleCitation, deleteArticleCitation
- ⚠️ V1 admin mutations not audit-logged (ADM-001)
