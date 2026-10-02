# What we're building

A new version of Velora's quiz → result → booking flow. Mobile first. Clickable from the first question to the booking confirmation, with mocked times.

**In one sentence:** 26 steps become 11 screens, the result comes *before* we ask for contact details, and the flow ends with a booked meeting with a named person.

---

## Today vs. new

| | Today (quiz.velora.se/2-3) | New |
|---|---|---|
| Length | 26 steps, counter says "1/26" | 11 screens, of which 6 are questions |
| Progress | "N/26" counter | % bar that moves fast at the start |
| Questions that don't screen | ~8 motivation questions (reasons, how it affects your life, how fast, lifestyle, what's been hard, how you see yourself…) | 1 "what matters to you" screen; the rest moves to the meeting |
| Info / claim screens | 5 ("9 of 10 members…", "5 000+ started", chart "closer than you think") | 1 calm moment after BMI |
| Weight & height | 2 screens, weight first | 1 screen, BMI shown live |
| Contact details | Required **to see the result** (step 26) | Asked only **after** choosing a time, 3 fields |
| Result | Not reached in capture (behind the contact form) | Their answers played back + "kan passa dig, läkaren avgör" + what happens next |
| Booking | Not reached in capture | "Next available" one tap, clinician face, 0 kr, sticky button |
| Confirmation | — | "Vi ses torsdag kl 10:30!", add to calendar, SMS reminders |

Source: our capture in `docs/wizard/`.

---

## The new flow

| # | Screen | What's on it |
|---|---|---|
| 1 | **Start** | "Tar 2 minuter · Kostnadsfritt · Läses av legitimerad vårdpersonal" |
| 2 | **Your goal** | One tap, no wrong answer |
| 3 | **About you** | Sex + age on one screen |
| 4 | **Height & weight** | cm + kg, BMI shows live, "En uppskattning räcker" |
| 5 | **Health** | Only if BMI 27–29.9: weight-related conditions, "Inget av detta" |
| 6 | **Safety** | Conditions that rule out treatment, pregnancy, current medication |
| 7 | **Your worries** | One multi-select: cost, side effects, needles, being judged… (replaces ~8 motivation screens) |
| 8 | **Reviewing your answers** | 2–3 seconds, three real checks |
| 9 | **Result** | Their answers back, calm BMI, journey timeline, clinician, first free time |
| 10 | **Book** | Pick a time → name, mobile, email |
| 11 | **Confirmation** | Date big, add to calendar, what happens next, "Hur hittade du oss?" (optional) |

---

## The improvements, and why

### 1. Shorter: 26 → 11 screens
**What:** Merge screens that belong together (sex + age, height + weight). Cut the motivation questions to one. Cut 4 of 5 info screens.
**Why:** Fewer, simpler pages lower drop-off on mobile (meta-analysis). Healthcare forms already finish worst of all industries: 41% on mobile (Zuko). The nordic competitors (Yazen, Kry, Doktor24) keep it short and hand over to a person — the deep questions belong in the meeting.

### 2. Progress as %, fast at the start
**What:** No "1/26". A thin bar that moves quickly over the first screens, then slows. The heavy screens come early, so the bar matches the real effort. The bar never jumps backwards, even when the health screen is skipped or added.
**Why:** In experiments, 11% quit with a fast-start bar vs 22% with a slow-start one (Conrad et al.; 32 experiments in Villar 2013 agree). Seeing "26" up front makes it feel like a lot of work.

### 3. Result *before* contact details
**What:** Today you must give name, phone and email to see your result. New: result first, contact details only when booking.
**Why:** Gating the result behind a form loses 30–50% of people who finished the quiz (vendor data — directional). It also feels like a trick at the exact moment we want trust.

### 4. A result that feels like being understood
**What:** Play their own answers back and answer their worries ("Du nämnde biverkningar — det går vi igenom på mötet…"), then "Medicinsk viktnedgång kan passa dig — läkaren avgör tillsammans med dig". Then a timeline: meeting → doctor's assessment → start → follow-up.
**Why:** Hers and Ro do exactly this. It's honest screening: the doctor decides, and we promise no weight loss.

### 5. A human, risk-free booking
**What:** Clinician photo + title above the button. "Kostnadsfritt · 20 min · video · avboka när du vill". "Första lediga tid" as one tap. Only the next 3–5 days, a few times per day, no month calendar. Sticky button that names the time: "Boka tor kl 10:30". Never a dead-end day.
**Why:** It removes the last three doubts — who will I talk to, what does it cost, can I back out. Meetings booked sooner have fewer no-shows (4.3% vs 7.7%, 1.26M appointments).

### 6. A confirmation that gets people to show up
**What:** "Vi ses torsdag kl 10:30!", add to calendar as the main button, "Vi skickar en påminnelse via SMS", 3 steps of what happens next.
**Why:** Reminders cut no-shows from 21% to 15% (meta-analysis of 21 studies). A booked meeting nobody attends converts nobody.

### 7. Trust in every sensitive question
**What:** One line under each sensitive question saying why we ask ("Vikt och längd ger ditt BMI, som avgör om behandling kan vara aktuell"), and a "Varför frågar vi?" sheet. "Only your care team sees your answers."
**Why:** Most people in this audience have been treated badly in healthcare before (~75% in Sweden). Words matter: "vikt", "BMI" — never "fet" or "fetma".

### 8. Calm, premium look
**What:** Serif headings, cream background, forest green and sage, lots of air, one button per screen. Soft slide/fade between steps, so the flow feels like one conversation.
**Why:** The brief: "premium, safe and personal — something a person with overweight wants to keep tapping through". References: Ease Health, Oura.

### 9. Design rules (every screen)
- One question or one tight group per screen, one main button.
- Ask, don't command: "Hur mycket väger du idag?", not "Ange vikt".
- Numbers: numeric keypad (`inputmode="numeric"`). No sliders, drop-downs or wheel pickers.
- Tap targets at least 44 px.
- Real faces only. No before/after photos, tape measures, headless bodies.
- No confetti, mascots, countdowns or fake "analysing database" bars.

### 10. Small fixes found in today's flow
- Age options skip 71–75, but the rules say 18–75.
- "Hur hittade du oss?" is a marketing question in the middle of a health quiz → moved to the confirmation, optional.
- "Så snabbt som möjligt" as a goal invites unrealistic expectations → dropped.

---

## If time allows

- Save answers in the browser (localStorage), so Back or a reload never loses anything.
- Tap an answer on the result screen to change it.

## Not building (mention in the decision doc)

Out of scope per the brief — one line each in the decision doc:
- People who don't qualify, abandoned flows, error handling, real backend, login, integrations

## Decisions we made (say so if you disagree)

- **Height + weight on one screen** (Ro and Hers do this; 3 research agents recommended it).
- **Journey timeline instead of a weight curve** (honest, promises nothing).
- Meeting length (20 min) and who you meet (nurse/doctor) are placeholders.
- **Screening rule:** BMI ≥30, or 27–29.9 with a weight-related condition (FASS, Wegovy §4.1). Age 18–75 (Velora's own rule, from today's flow).

## Deliverables (from the brief)

1. Prototype link
2. One-page decision doc for leadership: today's problem, our version and why, expected impact, what we dropped
3. Approach + verbatim prompt log + where we steered the AI, incl. at least one case where it went wrong

## How we build it

- `app/` — Vite + React + shadcn. Questions live in `src/data/questions.json` (title, question, help text), so copy can change live in the presentation.
- `e2e/` — Playwright, iPhone + Pixel screenshots of today vs new.
- Research behind every point: `.research/index.html`.
