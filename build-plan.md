# What we're building

A new version of Velora's quiz → result → booking flow. Mobile first. Clickable from the start screen to the booking confirmation, with mocked times.

**In one sentence:** 26 screens become 20, every question is kept, the result comes *before* we ask for contact details, and the flow ends with a booked meeting with a named doctor.

---

## Today vs. new

| | Today (quiz.velora.se/2-3) | New |
|---|---|---|
| Length | 26 steps, counter says "1/26" | 20 screens: start, 15 question screens, result, booking, contact, confirmation |
| Progress | "N/26" counter | % bar that moves fast at the start, with section marks |
| Questions | 20 | the same 20, titles word for word, grouped (sex + age, weight + height, target weight + pace, ...) |
| Info / claim screens | 5 ("9 of 10 members…", "5 000+ started", chart "closer than you think") | 0 stand-alone; headline kept in the flow, full text behind "Läs mer" |
| Weight & height | 2 screens, empty number boxes | 1 screen, sliders |
| Contact details | Required **to see the result** (step 26) | Asked only **after** the result and a picked time, 3 fields |
| Result | Not reached in capture (behind the contact form) | Their goal and BMI played back + "kan passa dig, läkaren avgör" + what happens next |
| Booking | Not reached in capture | Pick a time, named doctor, "Kostnadsfritt · 20 min · video · avboka fritt" |
| Confirmation | — | "Vi ses {{slot}}!", what happens next |

Source: our capture in `docs/wizard/`. Screen-by-screen mapping: `optimal-flow.md`.

---

## The improvements, and why

### 1. Shorter: 26 → 20 screens
**What:** Merge screens that belong together (sex + age, weight + height, target weight + pace). Every question stays; the 5 info screens become headlines with "Läs mer".
**Why:** Fewer, simpler pages lower drop-off on mobile (meta-analysis). Healthcare forms already finish worst of all industries: 41% on mobile (Zuko). Questions with one tap move on by themselves (auto-advance), so there is less to press.

### 2. Progress as %, fast at the start
**What:** No "1/26". A thin bar that moves quickly over the first screens, then slows. The heavy screens come early, so the bar matches the real effort.
**Why:** In experiments, 11% quit with a fast-start bar vs 22% with a slow-start one (Conrad et al.; 32 experiments in Villar 2013 agree). Seeing "26" up front makes it feel like a lot of work.

### 3. Result *before* contact details
**What:** Today you must give name, phone and email to see your result. New: result first, contact details only when booking.
**Why:** Gating the result behind a form loses 30–50% of people who finished the quiz (vendor data — directional). It also feels like a trick at the exact moment we want trust.

### 4. A result that feels like being understood
**What:** Play their own goal and BMI back, then "Medicinsk viktnedgång kan passa dig — läkaren avgör tillsammans med dig". Then three steps: free video call → the doctor goes through your answers → you decide together.
**Why:** Hers and Ro do exactly this. It's honest screening: the doctor decides, and we promise no weight loss.

### 5. A human, risk-free booking
**What:** Named doctor and title above the button. "Kostnadsfritt · 20 min · video · avboka när du vill". A short list of the next few days, no month calendar.
**Why:** It removes the last three doubts — who will I talk to, what does it cost, can I back out. Meetings booked sooner have fewer no-shows (4.3% vs 7.7%, 1.26M appointments).

### 6. A confirmation that gets people to show up
**What:** "Vi ses {{slot}}!", "Vi skickar en påminnelse via SMS", 3 steps of what happens next.
**Why:** Reminders cut no-shows from 21% to 15% (meta-analysis of 21 studies). A booked meeting nobody attends converts nobody.

### 7. Trust in every sensitive question
**What:** One line under sensitive questions saying why we ask ("Vi frågar för att läkaren ska kunna bedöma om en behandling är säker för dig"). "Dina svar är hälsouppgifter. Bara vårdpersonal i din vård ser dem."
**Why:** Most people in this audience have been treated badly in healthcare before (~75% in Sweden). Words matter: "vikt", "BMI" — never "fet" or "fetma".

### 8. Calm, premium look
**What:** Velora's own palette and fonts (plum on soft pink, Ubuntu + Manrope), lots of air, one button per screen. Soft transition between steps, so the flow feels like one conversation.
**Why:** The brief: "premium, safe and personal — something a person with overweight wants to keep tapping through".

### 9. Design rules (every screen)
- One question or one tight group per screen, one main button.
- Ask, don't command: "Hur mycket väger du idag?", not "Ange vikt".
- Numbers: sliders for weight, height and target weight.
- Tap targets at least 44 px.
- Real faces only. No before/after photos, tape measures, headless bodies.
- No confetti, mascots, countdowns or fake "analysing database" bars.

### 10. Small fixes found in today's flow
- The contact form title "Ange dina uppgifter för att se resultatet" is no longer true, so it now asks "Vart skickar vi bekräftelsen?".
- Age options skip 71–75, but the rules say 18–75. Kept as in Velora's flow; flagged.

---

## Measurement and variants

Two start-screen headlines run as an A/B test. Every visit is one Firestore doc with variant, time per step, where the person left, resumes and (on submit) answers. Answers and step are also saved in the browser, so Back or a reload never loses anything. See `docs/flow-analytics.html`.

## Not building (mention in the decision doc)

Out of scope per the brief — one line each in the decision doc:
- People who don't qualify, error handling, real booking backend, login, integrations

## Decisions we made (say so if you disagree)

- **Weight + height on one screen** (Ro and Hers do this; 3 research agents recommended it).
- **Keep every question** rather than cutting motivation questions: the screens are fewer, the content is Velora's.
- Meeting length (20 min), the named doctor and the time slots are placeholders.
- **Screening rule:** BMI ≥30, or 27–29.9 with a weight-related condition (FASS, Wegovy §4.1). Age 18–75 (Velora's own rule, from today's flow).

## Deliverables (from the brief)

1. Prototype link
2. One-page decision doc for leadership: today's problem, our version and why, expected impact, what we dropped
3. Approach + verbatim prompt log + where we steered the AI, incl. at least one case where it went wrong

## How we build it

- `app/` — Vite + React + shadcn. Questions live in `src/data/wizard-a.json` and `wizard-b.json` (titles, questions, help text), so copy can change live in the presentation. Hosted on Firebase; CI runs lint, build and e2e, then deploys on push to main.
- `e2e/` — Playwright, both variants on iPhone + Pixel.
- Research behind every point: `.research/index.html`.
