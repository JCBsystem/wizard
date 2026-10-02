# Research summary

10 agents, 2026-10-02. Mobbin ×3, Refero ×3, web ×4. Details + sources in each file; images in `img/`.

## What every source agrees on

1. **Short, human-first funnel.** Nordic players (Yazen, Kry, Doktor24) = short quiz → booked time with a person. Velora fits that model: ~10–12 screens, end in a booked meeting, not an account or card. → `web-competitors.md`
2. **Front-loaded progress bar, no "x/N".** Fast-early bar: 11.3% quit vs 21.8% slow-early (Conrad); odds ×0.80 across 32 experiments (Villar 2013). Call it *effort-weighted*, put heavy screens early. → `web-cro-evidence.md`
3. **Group what belongs together.** Fewer, simpler pages lower quit rates on mobile. Height + weight on one screen (Ro, Hers). → `web-cro-evidence.md`, `mobbin-intake.md`, `refero-intake.md`
4. **One-line "why we ask" under every sensitive field** + optional "Varför frågar vi?" sheet (Hers, Oura, Ada). Maps to `helpText`. → `mobbin-intake.md`, `refero-intake.md`, `web-trust-tone.md`
5. **Result before contact details.** Email gate before result loses 30–50% (vendor data). → `web-booking.md`
6. **Result = their answers played back + "kan passa dig, läkaren avgör" + what happens next.** No personal weight forecast. → `refero-results.md`, `mobbin-results.md`
7. **Trust right above one CTA:** named licensed clinician + photo, "Kostnadsfritt · 20 min · video · avboka fritt". → `mobbin-booking.md`, `refero-booking.md`
8. **Booking:** "Första lediga tid" one tap, next 3–5 days, 4–6 slots/day, sticky button naming the slot. Only name, mobile, email — after slot chosen. → all booking files
9. **Confirmation's job = show up.** "Vi ses torsdag kl 10:30!", add-to-calendar primary, SMS reminders 24 h + 1–2 h (no-shows 21% → 15%, meta-analysis), 3-step what happens next. → `web-booking.md`
10. **Language.** "vikt", "BMI", never "fetma/fet". → `web-trust-tone.md`

## Proposed flow (11 screens)

| # | Screen | Key detail |
|---|---|---|
| 1 | Start | "Tar 2 minuter · Kostnadsfritt · Inga förpliktelser" |
| 2 | Goal | One tap, no wrong answer (foot-in-the-door) |
| 3 | Sex + age | One screen |
| 4 | Height + weight | Live BMI, "an estimate is fine", why-we-ask |
| 5 | Conditions | Only if BMI 27–29.9. ≤6 options + "Inget av detta" |
| 6 | Safety | Contraindications (thyroid cancer history, pregnancy, pancreatitis), no "prefer not" |
| 7 | What matters to you | Worries/priorities → reused on result |
| 8 | Reviewing answers | 2–3 s, 3 real ticks, good-news path only |
| 9 | Result | Answers back, calm BMI, journey timeline, clinician, first free slot |
| 10 | Book | Slot + name/mobile/email |
| 11 | Confirmation | Date big, add to calendar, what happens next |

## Visual direction

Serif headlines, cream + sage + forest green (Ease Health), lots of air, thin bar, one muted CTA. Backup: Oura warm linen. → `refero-intake.md`

## Open decisions

- **Weight screen:** notes.md says own screen; Ro + Hers + 3 agents say combine with height. Recommend combine.
- **Result graph:** journey timeline (meeting → doctor decides → start → follow-up) vs personal weight curve. Recommend timeline (honest, promises nothing).

## Weak evidence — don't quote to leadership

Vendor-only: 743% / 86% multi-step uplifts, 30–50% email-gate loss, Calendly 28%. No primary test of "x of N" vs %. Ro/Hims/Noom/Embla rows from third-party reviews (sites blocked fetch).
