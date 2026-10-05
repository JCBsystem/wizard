---
name: update-readme
description: Use after changing code, config schema, CI or A/B/analytics behavior in the CompanyX wizard repo — updates README.md (affected sections + a dated line in Changes) so the README always matches the code.
---

# Update README

1. Find the date of the newest entry in README.md `## Changes`.
2. Read `git log --format='%ad %s' --date=short` and `git diff` since then, plus uncommitted changes.
3. Update only the README sections the changes affect (Quick start, Layout, Config, A/B variants, Analytics, CI/CD).
4. Verify every claim against the code (`app/src/wizard/types.ts`, `variant.ts`, `analytics.ts`, `app/firestore.rules`, `.github/workflows/deploy.yml`, the JSON configs). Never invent features.
5. Add one dated line (`- YYYY-MM-DD: what changed`) per meaningful change at the top of `## Changes` (newest first). Group trivial changes (typos, chores) into one line.
6. Keep it concise. No status chatter, no marketing language.
