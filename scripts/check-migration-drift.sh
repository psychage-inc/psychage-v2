#!/usr/bin/env bash
#
# Migration drift-check
# ---------------------
# Fails if the local supabase/migrations/ tree and the remote (linked project)
# applied-migration history have diverged:
#   - a version applied on remote but missing from supabase/migrations/, or
#   - a local migration file with no corresponding applied remote version.
#
# Required secrets / env (CI sets these from repository secrets):
#   SUPABASE_ACCESS_TOKEN  - personal access token for the Supabase CLI
#   SUPABASE_PROJECT_REF   - the linked project ref (e.g. abcdefghijklmno)
#
# When SUPABASE_ACCESS_TOKEN is absent, the check SKIPS with a visible warning
# and exits 0 (so the gate is not falsely red before the secret is configured).
#
# Requires the `supabase` CLI on PATH (CI installs it via supabase/setup-cli).

set -euo pipefail

MIGRATIONS_DIR="$(cd "$(dirname "$0")/.." && pwd)/supabase/migrations"

if [ -z "${SUPABASE_ACCESS_TOKEN:-}" ]; then
  echo "::warning::drift-check skipped: secret not configured (SUPABASE_ACCESS_TOKEN absent)"
  echo "drift-check skipped: SUPABASE_ACCESS_TOKEN not set."
  exit 0
fi

if [ -z "${SUPABASE_PROJECT_REF:-}" ]; then
  echo "::warning::drift-check skipped: secret not configured (SUPABASE_PROJECT_REF absent)"
  echo "drift-check skipped: SUPABASE_PROJECT_REF not set."
  exit 0
fi

if ! command -v supabase >/dev/null 2>&1; then
  echo "ERROR: supabase CLI not found on PATH." >&2
  exit 1
fi

echo "Linking to Supabase project ${SUPABASE_PROJECT_REF}..."
supabase link --project-ref "$SUPABASE_PROJECT_REF" >/dev/null

echo "Fetching remote migration history..."
# `supabase migration list` prints a table with Local | Remote | Time columns.
# Extract the timestamp version tokens from each side.
LIST_OUTPUT="$(supabase migration list --linked)"
echo "$LIST_OUTPUT"

# Local versions: the 14-digit timestamp prefix of each migration file.
LOCAL_VERSIONS="$(
  find "$MIGRATIONS_DIR" -maxdepth 1 -name '*.sql' -type f \
    | sed -E 's#.*/([0-9]{14})_.*#\1#' \
    | grep -E '^[0-9]{14}$' \
    | sort -u
)"

# Parse the CLI table. Rows look like:  "  <local> | <remote> | <time>"
# A column is blank when that side lacks the version.
REMOTE_ONLY=""
LOCAL_ONLY=""
while IFS= read -r row; do
  # only data rows containing a pipe and a 14-digit token
  case "$row" in
    *"|"*) ;;
    *) continue ;;
  esac
  local_col="$(echo "$row" | awk -F'|' '{gsub(/[^0-9]/,"",$1); print $1}')"
  remote_col="$(echo "$row" | awk -F'|' '{gsub(/[^0-9]/,"",$2); print $2}')"
  if [ -n "$remote_col" ] && [ -z "$local_col" ]; then
    REMOTE_ONLY="${REMOTE_ONLY}${remote_col}\n"
  fi
  if [ -n "$local_col" ] && [ -z "$remote_col" ]; then
    LOCAL_ONLY="${LOCAL_ONLY}${local_col}\n"
  fi
done <<< "$LIST_OUTPUT"

DRIFT=0

if [ -n "$REMOTE_ONLY" ]; then
  echo ""
  echo "DRIFT: versions applied on remote but absent from supabase/migrations/:" >&2
  printf "%b" "$REMOTE_ONLY" | sed '/^$/d' | sed 's/^/  - /' >&2
  DRIFT=1
fi

if [ -n "$LOCAL_ONLY" ]; then
  echo ""
  echo "DRIFT: local migration files not present in remote applied history:" >&2
  printf "%b" "$LOCAL_ONLY" | sed '/^$/d' | sed 's/^/  - /' >&2
  DRIFT=1
fi

if [ "$DRIFT" -ne 0 ]; then
  echo "" >&2
  echo "Migration drift detected. Reconcile local supabase/migrations/ with remote history." >&2
  exit 1
fi

echo ""
echo "PASS: local migrations and remote applied history are in sync."
exit 0
