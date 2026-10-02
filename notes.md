# Notes — decisions & plan

Brief: see `assignment.md`.

## Decisions so far

- **Fewer steps.** Today ~26 steps (counter shows "1/26", to verify). Target ~12 by merging related questions — sex, age, height on one screen.
- **Progress as %, front-loaded.** No "x/26" counter. Bar = `sqrt(step / total)` → step 1 of 12 ≈ 29%, step 3 = 50%, then slows. Last steps say "Almost done". Honest: tracks real progress, just weighted early when drop-off risk is highest.
- **Weight on its own screen** with a reassurance line (e.g. "Only your clinician sees this"). Sensitive question; trust is a core goal.
- **Questions in a JSON config** (title, description, question, help text). Enables the live-edit part of the presentation.
- **Better visuals on the result screen** (e.g. what the journey could look like) — the moment that turns screening into booking.
- **Help button** for trust. Click tracking = doc only.
- **Mobile first.**
- **Build: Vite + React + TS + shadcn/ui in `app/`**, Firebase project `wizard1-f16de` (hosting → published link). Playwright standalone in `e2e/` (mobile devices, screenshots).

## Decision doc only (not built)

Out of scope per brief ("no backend / integrations — mention briefly"):
- Time per step, drop-off per step and reason
- Save progress across sessions
- Help-button click tracking
- Non-qualifying paths, error handling

Frame as "how we'd measure the impact".

## Assumptions to state

- Medical screening: GLP-1 treatment typically requires BMI ≥30, or ≥27 with a weight-related condition. From memory — verify, label as assumption.

## Open

- Current-flow analysis (another agent downloading the current wizard) → problems list
- Competitors: 2–3 picked by hand (e.g. Yazen, Noom Med, Ro, Juniper — verify fit). Mobbin + Refero MCPs now configured (`.mcp.json`). Timebox ~20 min.
- Playwright: use only for phone-size screenshots of before/after, no test suite.

## Time plan (~2.5 h)

| Step | Time |
| --- | --- |
| Current flow walkthrough + problems | 25 min |
| Competitors + patterns | 20 min |
| Prototype | 75 min |
| Decision doc | 20 min |
| Approach + prompt log | 10 min |

## Deliverables checklist

- [ ] Prototype link (Claude artifact)
- [ ] One-page decision doc for leadership
- [ ] Approach + verbatim prompt log + ≥1 case where AI went wrong
