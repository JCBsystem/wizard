# CompanyX — Work Assignment: Full-stack Patient Experience

Source: https://claude.ai/artifact/BDqN57JJwA7mo2GoCmEjpc (original in Swedish)
Start here: https://quiz.companyx.example/2-3

**Task: build a better way into CompanyX.** There's no answer key. CompanyX cares more about how you think, prioritize and build than about polish.

| Constraint | Value |
| --- | --- |
| Work time | 2–3 h max (hard prioritization is part of the task) |
| Deadline | 7 days from receiving the case |
| AI | Required |
| Follow-up | 30 min presentation |

## The happy path (what to improve)

1. **Questions**: the person answers the quiz at quiz.companyx.example/2-3.
2. **Result**: they're told medical weight loss may suit them.
3. **Pick a time**: they book a free online meeting with clinical staff.
4. **Confirmation**: done, and they know what happens next.

## Background

The quiz is CompanyX's most important surface and the first time a prospective patient meets the product. It decides whether medical weight loss may be right, then leads to booking a free online meeting. The flow must do three things at once:

- **Convert**: every extra percentage point from first question to booked meeting matters.
- **Screen correctly**: the right people reach the meeting, and everyone is treated with respect.
- **Build trust**: this is about health and weight. Tone and reassurance matter as much as the buttons.

## What to do

Review the current quiz and booking flow. Build a better version of the happy path: a person who qualifies and books an online meeting, from the first question to confirmation.

- **Explore**: walk the flow from quiz.companyx.example/2-3, ideally on mobile. Filling in and submitting the quiz with made-up data is fine. Go as far as the booking step and look at it.
  - ⚠️ **Do NOT create a real booking.** Bookings go to real clinical staff.
- **Build with AI**: an improved, clickable happy path from start to booking confirmation. Booking can be mocked with made-up times.
- **Make deciding easy**: assume leadership sees the deliverable and must pick a direction within a few minutes.

## Most important

**Design is decisive.** This flow is the storefront, and design is judged as hard as the solution. Aim for premium, safe and personal: something a person with overweight wants to keep tapping through on mobile. Think about typography, rhythm, microcopy, transitions between steps, and making each screen feel like being understood rather than interrogated.

**One considered iteration beats many variants.** AI makes ten variants cheap. What's valued is the judgment to choose, refine and justify. One well-made version always beats several half-finished ones.
- If showing more than one: **max three**, with clearly different approaches (not just color or copy), plus a clear recommendation of which to pursue and why.

**Out of scope**: non-qualifying people, abandoned flows, error handling, real backend, login, integrations. Briefly mention what you'd do, but don't spend time on it.

## Rules

- **Time**: max 2–3 hours.
- **AI is required**: any tools (Claude, Codex, Cursor, v0…). Judged on *how smartly* it was used: where AI accelerated, where you redirected it, how you ensured quality.
- **Medical knowledge**: not required. Write out any assumptions about medical rules.
- **Questions**: ask if anything's unclear. Asking counts as a plus.

## Deliverables

1. **Prototype**: link to a published Claude artifact (or v0 or similar).
2. **One-page decision document** for leadership: the problem in today's flow, the recommended version and why, expected impact, and what you dropped. Multiple versions → compare side by side.
3. **Approach & prompt log**
   - **Approach**: how you broke down the problem, the order you worked in, the decisions that set the direction.
   - **Prompt log**: the prompts that actually produced the solution, in order, **verbatim** (shared conversation link, export or copied text). Not tidied up afterwards.
   - **Steering**: where you changed or rejected AI suggestions, and **at least one case where AI went wrong** and how you noticed.

## After submission

CompanyX reviews the submission and decides whether to move to a presentation. Written feedback either way.

**Presentation: 30 min with the tech lead**

| Min | Content |
| --- | --- |
| 0–5 | Present as you would to leadership: recommendation first, then the flow |
| 5–15 | How you approached the problem + the 2–3 prompts that made the biggest difference |
| 15–25 | Make a small change live with your usual AI tools |
| 25–30 | Your questions to them |

## Evaluation criteria

- **Design & feel**: would you trust it with your own health?
- **Product understanding**: what the flow must achieve for the patient and for CompanyX.
- **AI & approach**: used with judgment, and can you follow how the solution grew?
- **Prioritization**: were hours spent on what matters most?
- **Decidability**: can leadership understand and choose within minutes?
- **Communication**: can you explain your choices and take questions on them?
