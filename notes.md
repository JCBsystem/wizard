# Notes — decisions & plan

Brief: see `assignment.md`.

## Decisions so far

- **Same questions, fewer screens.** Today 26 screens ("1/26"); new flow 20, from start screen to booked call. All 20 questions kept with their titles word for word; related ones share a screen (sex + age, weight + height, target weight + pace). Today's 5 info screens are one headline each, full text behind "Läs mer".
- **Progress as %, front-loaded.** No "x/N" counter. Bar = `sqrt(step / last)`, so it moves fast early and slows; section marks (Mål, Om dig, Hälsa, Vanor, Framtid) sit on the bar. Last steps say "Nästan klart". Never 100% early. Evidence: fast-early bar 11.3% quit vs slow-early 21.8% (Conrad et al.); review of 32 experiments: odds of quitting ×0.80 (Villar 2013). See `.research/web-cro-evidence.md`.
- **Weight + height on one screen**, BMI computed live and shown on the next screen. Decided 2026-10-02: saves a step; trust comes from the line "Bara vårdpersonal i din vård ser dina svar" on the start screen, not a separate screen.
- **Questions in two JSON configs** (`wizard-a.json`, `wizard-b.json`): titles, descriptions, help text, field types (single with row/grid/chips layout, multi, number, text, slider, yesno). Copy changes live without touching code.
- **A/B variants.** The two configs differ only in the start-screen headline. A new visitor gets a minute-parity split, saved in the browser, so a customer never switches variant. `?variant=a|b` previews a variant for testing without saving it. The variant is stored on every session.
- **Auto-advance** on screens where every field is a plain single-choice: tap the answer and the flow moves on, no Next button.
- **Soft transitions** between steps (View Transitions), so the flow feels like one conversation.
- **Resume.** Answers and step are saved in localStorage; a reload or later visit continues where the person left.
- **Result before contact details.** Result plays back goal and BMI, then booking with a named doctor (placeholder), then name, phone, email, then confirmation.
- **Mobile first.** Velora's own look: Ubuntu headings, Manrope text, plum/pink on soft pink.
- **Build: Vite + React + TS + shadcn/ui in `app/`**, Firebase Hosting on project `wizard1-f16de`; CI (lint, build, Playwright e2e) deploys on every push to main. Playwright in `e2e/` runs both variants on mobile devices.

## From research (`.research/`)

- Result before contact details. Ask name, mobile (+46 prefilled), email only at booking. Gating result behind email loses 30–50% of quiz finishers (vendor data, weaker).
- No fake "analysing" bars or countdowns (Noom). A short truthful "reviewing" screen (labour illusion, Buell & Norton) was considered, not built.
- Result: repeat their answers (goal, BMI tags), "kan passa dig", not "you qualify". What happens next: meeting → clinician decides → treatment. No personal weight predictions.
- Trust above one CTA: named licensed clinician with photo, "Gratis · 20 min · video · avboka fritt", rating, quote about experience.
- Booking: "Första lediga tid" one-tap, next 3–5 days only, sticky "Boka tor kl 10:30". Scarcity only when true.
- Confirmation: "Vi ses torsdag kl 10:30!", Add to calendar as main button, 3-step what happens next, no upsell.
- Visual direction (research): serif headlines, sage on cream. Built instead in Velora's own palette and fonts.
- Language: "vikt", "BMI", person-first. Avoid "fetma", "fet", "tjock". Say once there's no judgement (~75% report poor treatment in healthcare, Obesitas Sverige 2025).
- "Vi frågar för att…" line under every sensitive field; optional "Varför frågar vi?" sheet → `helpText` in questions JSON.
- Contraindications (Velora's own list) on their own screen, Ja/Nej, no "prefer not to answer".
- Benchmark: 44.4% of healthcare form starters finish, 40.8% on mobile (Zuko 2025).

## Measurement

Every visitor gets one Firestore doc: variant, per-step visits and time, where they stopped, resumes, and the answers on submit. Gives conversion, drop-off per step and time per step, split by variant. See `docs/flow-analytics.html`.

Not built (out of scope per brief): non-qualifying paths, error handling, help-button click tracking.

## Assumptions to state


- Medical screening (verified, FASS Wegovy 4.1): BMI ≥30, or 27–<30 with ≥1 of: prediabetes/type 2 diabetes, high blood pressure, high blood fats, sleep apnoea, cardiovascular disease. Mounjaro same per Kry (not opened in FASS). Compute BMI live; show the condition list only when BMI 27–29.9.

## Deliverables checklist

- [ ] Prototype link (Firebase Hosting)
- [ ] One-page decision doc for leadership
- [ ] Approach + verbatim prompt log + ≥1 case where AI went wrong
