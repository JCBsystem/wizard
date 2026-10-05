# CompanyX wizard

> The client's name is anonymized as **CompanyX** throughout this repo (code, copy, docs).

Mobile-first, JSON-driven intake wizard for medical weight-loss (CompanyX), with A/B copy variants and per-session Firestore analytics. Live: https://wizard1-f16de.web.app

## Quick start

```sh
cd app && npm i && npm run dev                     # dev server
cd e2e && npm i && npx playwright install chromium webkit && npm test   # e2e: 12 tests x 2 devices (iPhone 13 + Pixel 7) = 24
```

## Layout

```
app/                  Vite + React + TS + shadcn/ui
  src/data/wizard-a.json, wizard-b.json   questions and copy (one per variant)
  src/wizard/         Wizard, Field, variant, analytics, validate, types
  firestore.rules     sessions/{id}: create/update only, no read
e2e/                  Playwright tests (smoke, frame, flow-guards; both variants, mobile devices)
.claude/skills/       project skills: update-readme, write-e2e-test
docs/flow-analytics.html   analytics/flow report
.github/workflows/deploy.yml   CI/CD
notes.md, optimal-flow.md  decisions and flow rationale
```

## Config

Each JSON file is `{ ui, steps[] }` (types in `app/src/wizard/types.ts`). A step has `id`, optional `type` (`intro|result|booking|confirmation`; omitted = question step), `title`, `section` (progress segment), `fields[]`, plus optional `description`, `helpText`, `summary`, `bullets`, `notes`, `cta`.

Field types:
- `single`: `options`; `layout` is `row` (<=4 short options), `grid` (2 columns) or `chips`; default is stacked cards
- `multi`: `options`; `layout: "grid"`
- `number`: `min`, `max`, `unit`, `placeholder`, `half`, `help`
- `text`: `inputType` text|tel|email, `placeholder`
- `slider`: `unit`, `min`, `max`, `step`, `default`, `start`
- `yesno`: stores `yes`/`no`; `yesLabel`/`noLabel`

Auto-advance: a step whose fields are all plain `single` choices moves on when an option is tapped (no Next button). Guards: at most one pending advance timer, further taps/Back are ignored while a step change is in flight, and the final submit runs once per session.

Add a step: append an object to `steps` in both `wizard-a.json` and `wizard-b.json` (position = order), give it a unique `id` and `fields`. No code changes unless you need a new field type (`types.ts`, `Field.tsx`, `validate.ts`). Update e2e tests if the flow changes.

## A/B variants

`variant.ts` picks `a` or `b` by minute parity on first visit and saves it in localStorage (`companyx-wizard-variant`; progress `companyx-wizard`, session id `companyx-wizard-session`), so a person keeps their variant. `?variant=a|b` previews a variant and is never saved: no saved progress or session is read or written and no analytics are written. The variant is stored on every session. The two configs currently differ only in the start-screen headline.

## Analytics

One Firestore doc per session (`sessions/{id}`, project `wizard1-f16de`): variant, per-step visits and time, where the user stopped, resumes, and answers on submit. Rules allow create/update only, no read (open write, no auth; add App Check before real patients). Details: [docs/flow-analytics.html](docs/flow-analytics.html).

## CI/CD

`.github/workflows/deploy.yml`:
- Pull request to main: lint, build, e2e; same-repo PRs also get a Firebase Hosting preview channel.
- Push to main: lint, build, e2e, then deploy to Firebase Hosting (live).
- PR preview channels expire after 7 days.
- Concurrency: live deploys queue one at a time; superseded PR runs are cancelled.
- Hosting only: Firestore rules are deployed manually.
- Actions use Node 24 majors (checkout/setup-node/upload-artifact v7, download-artifact v8).
- Playwright report is uploaded on failure.

## Changes

- 2026-10-05: client anonymized as CompanyX (localStorage keys `companyx-wizard*`); `?variant=` is preview-only (no saved progress, no analytics); auto-advance timer/double-tap guards and submit-once; new `flow-guards.spec.ts` (24 tests total)
- 2026-10-05: CI concurrency, actions bumped to Node 24 majors, PR previews expire after 7d, CI deploys hosting only; added project skills `update-readme` and `write-e2e-test`
- 2026-10-05: keep A/B variant once assigned; `?variant=` previews only; docs updated
- 2026-10-05: e2e targets elements via `data-testid`; added A/B wizard variants
- 2026-10-02: reworked CompanyX intake flow
- 2026-10-02: scaffolded app, e2e and CI/CD
