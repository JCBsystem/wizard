# Notes — decisions & plan

Brief: see `assignment.md`.

## Decisions so far

- **Fewer steps.** Today ~26 steps (counter shows "1/26", to verify). Target ~12 by merging related questions — sex, age, height on one screen.
- **Progress as %, front-loaded.** No "x/26" counter. Bar = `sqrt(step / total)` → step 1 of 12 ≈ 29%, step 3 = 50%, then slows. Last steps say "Almost done". Weighted by effort: early screens are the heavy merged ones. Never show 100% early. Evidence: fast-early bar 11.3% quit vs slow-early 21.8% (Conrad et al.); review of 32 experiments: odds of quitting ×0.80 (Villar 2013). See `.research/web-cro-evidence.md`.
- **Height + weight on one screen** ("Din utgångspunkt", as Hers/Ro), BMI computed live, reassurance line under weight (e.g. "Bara vårdpersonal i din vård ser dina svar"). Decided 2026-10-02: saves a step; trust comes from the line, not a separate screen.
- **Questions in a JSON config** (title, description, question, help text). Enables the live-edit part of the presentation.
- **Better visuals on the result screen** (e.g. what the journey could look like) — the moment that turns screening into booking.
- **Help button** for trust. Click tracking = doc only.
- **Mobile first.**
- **Build: Vite + React + TS + shadcn/ui in `app/`**, Firebase project `wizard1-f16de` (hosting → published link). Playwright standalone in `e2e/` (mobile devices, screenshots).

## From research (`.research/`)

- Result before contact details. Ask name, mobile (+46 prefilled), email only at booking. Gating result behind email loses 30–50% of quiz finishers (vendor data, weaker).
- Short truthful "reviewing your answers" screen before the result (labour illusion, Buell & Norton). No fake database bars, no countdowns (Noom).
- Result: repeat their answers (goal, BMI tags), "kan passa dig", not "you qualify". What happens next: meeting → clinician decides → treatment. No personal weight predictions.
- Trust above one CTA: named licensed clinician with photo, "Gratis · 20 min · video · avboka fritt", rating, quote about experience.
- Booking: "Första lediga tid" one-tap, next 3–5 days only, sticky "Boka tor kl 10:30". Scarcity only when true.
- Confirmation: "Vi ses torsdag kl 10:30!", Add to calendar as main button, 3-step what happens next, no upsell.
- Visual direction: serif headlines, forest green / sage on cream (Ease Health), warm linen (Oura) as backup.
- Language: "vikt", "BMI", person-first. Avoid "fetma", "fet", "tjock". Say once there's no judgement (~75% report poor treatment in healthcare, Obesitas Sverige 2025).
- "Vi frågar för att…" line under every sensitive field; optional "Varför frågar vi?" sheet → `helpText` in questions JSON.
- Contraindications (thyroid cancer history, pregnancy, pancreatitis) own screen, no "prefer not to answer".
- Benchmark: 44.4% of healthcare form starters finish, 40.8% on mobile (Zuko 2025).

## Decision doc only (not built)

Out of scope per brief ("no backend / integrations — mention briefly"):
- Time per step, drop-off per step and reason
- Save progress across sessions
- Help-button click tracking
- Non-qualifying paths, error handling

Frame as "how we'd measure the impact".

## Assumptions to state


- Medical screening (verified, FASS Wegovy 4.1): BMI ≥30, or 27–<30 with ≥1 of: prediabetes/type 2 diabetes, high blood pressure, high blood fats, sleep apnoea, cardiovascular disease. Mounjaro same per Kry (not opened in FASS). Compute BMI live; show the condition list only when BMI 27–29.9.

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
