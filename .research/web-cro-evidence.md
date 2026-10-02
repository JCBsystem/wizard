# CRO evidence: multi-step quiz / form funnels

Slice: what the evidence says on step count, screen grouping, progress bars, "analyzing" screens, and commitment.
I opened every source listed. Peer-reviewed or primary numbers are marked **[primary]**. Vendor or blog numbers are marked **[vendor]**.

---

## 1. A progress bar that moves fast early lowers drop-off. One that moves slow early raises it. A plain linear bar does nothing measurable.
- **Numbers [primary]:** Villar, Callegaro & Yang (2013) meta-analysed 32 randomized experiments.
  - Constant-speed bar vs no bar: no significant effect.
  - Fast-to-slow bar: drop-off odds ×0.80 (LOR 0.212, p = .02, 7 studies, one outlier removed).
  - Slow-to-fast bar: drop-off odds ×1.56 (p = .001).
  - When a completion incentive was offered, a constant bar *increased* drop-off (×1.17).
- **Source:** https://openaccess.city.ac.uk/14427/ (full PDF: https://openaccess.city.ac.uk/id/eprint/14427/4/Social%20Science%20Computer%20Review-2013-Villar-744-62.pdf)
- **For Velora:** this supports our front-loaded `sqrt(step/total)` bar. It also suggests the bar only pays off if it's front-loaded. A linear bar is mostly decoration.

## 2. The original experiment: breakoff of 11.3% (fast-to-slow) vs 21.8% (slow-to-fast)
- **Numbers [primary]:** Conrad, Couper, Tourangeau & Peytchev. 57 question screens, roughly 3,180 respondents. Breakoff by bar type:
  | Bar | Breakoff |
  | --- | --- |
  | None | 12.7% |
  | Constant | 14.4% |
  | Slow-to-fast | 21.8% |
  | Fast-to-slow | 11.3% |
- Their fast-to-slow bar was `log(screen)/log(total)`: 50% after 9 of 57 screens, then 36 more screens to reach 90%.
- A deliberately hard item in the middle (open-ended answer) caused breakoffs. In the fast-to-slow group that effect was "virtually eliminated".
- Their conclusion: "constant speed feedback for a longer questionnaire … is a disincentive to continue."
- **Sources:**
  - https://statspolicy.gov/assets/fcsm/files/docs/spwp38_Conrad_Couper_Tourangeau.pdf
  - Journal version (abstract): Interacting with Computers 22(5), 2010, https://dl.acm.org/doi/abs/10.1016/j.intcom.2010.03.001. The abstract adds that *intermittent* feedback kept the benefits and reduced the costs.
- **For Velora:**
  - Our sqrt curve is gentler than theirs. On 12 steps it gives 29% / 50% / 71% / 87% / 96% at steps 1 / 3 / 6 / 9 / 11. That's fine.
  - It also supports dropping the current "1/26" counter. A linear counter on a long flow reads as slow progress.
  - Since the weight question is our "hard item", it should come after a few quick wins, not first.

## 3. ⚠ CONTRADICTION with notes.md: a front-loaded bar is not automatically "honest"
- **Claim [primary]:** Villar et al. say that if a nonlinear bar "intentionally misrepresents the actual progress … this would raise important ethical questions, and we do not recommend this deceptive type of use." They also say variable speed "may be valid and ethical as long as they reflect actual progress", for example when early questions take longer.
- **Source:** same PDF as #1, p. 748 and p. 757.
- **For Velora:**
  - notes.md calls the sqrt bar "honest: tracks real progress". On a fixed 12-step flow it does not track real progress in steps. It *does* track progress in effort if the heavier screens come first.
  - Fix:
    1. Order the merged, heavier screens (sex/age/height, weight, conditions) early.
    2. Make the bar never jump backwards.
    3. In the decision doc, describe it as "weighted by effort".
  - Trust is a stated goal and this is a medical funnel, so expect a reviewer to raise this. Address it before they do.

## 4. Head start: an "already started" frame nearly doubles completion
- **Numbers [primary, via summary]:** Nunes & Drèze (2006), car-wash field experiment with 300 cards.
  - 8 stamps needed, card empty: 19% completed.
  - 10-stamp card with 2 pre-stamped (same 8 purchases): 34% completed.
  - Citation: J. Consumer Research 32(4), 504–512.
- **Source:** https://www.coglode.com/nuggets/endowed-progress-effect (the primary JCR/ResearchGate copy returned 403, so the numbers come from this summary)
- **For Velora:** the bar can start above 0% on screen 1, which sqrt already does (29%). We can also count the landing-page click or the "Is Velora for you?" intro as step 1 done. Same mechanism, no deception.

## 5. Commitment: an easy first "yes" multiplies compliance with the big ask
- **Numbers [primary]:** Freedman & Fraser (1966).
  - Exp. 1: after a small first request, 52.8% agreed to the large request vs 22.2% with no first request.
  - Exp. 2: 76.0% vs 16.7% when the two requests were similar in both task and issue.
- **Source:** https://www.bulidomics.com/w/images/6/6c/Freedman_fraser_footinthedoor_jpsp1966.pdf (JPSP 4(2), 195–202, Tables 1–2)
- **For Velora:**
  - Q1 should be one tap with no wrong answer, for example the goal ("What would you like help with?").
  - Then ask for the "big" commitment (book a meeting) in the same theme as the quiz: "your plan, with a clinician". The effect was strongest when the two requests were similar.
  - Don't open with weight or contact details.

## 6. A "we're analyzing your answers" screen raises perceived value, but backfires when the result is bad news
- **Numbers [primary]:** Buell & Norton (2011), Management Science 57(9).
  - Exp. 2: with a visible work log, 62% preferred the 30-second wait and 63% the 60-second wait over instant results. Without transparency, only 42% and 23% did.
  - Exp. 5 (boundary condition): for **unfavorable** outcomes, a transparent 15-second wait gave the *lowest* value ratings (M = 2.47 vs 3.24 for instant). At 30 seconds it was worse (2.10).
  - The authors also say the benefit shrinks as the wait gets longer.
- **Sources:**
  - https://www.hbs.edu/ris/Publication%20Files/Norton_Michael_The%20labor%20illusion%20How%20operational_f4269b70-3732-4fc4-8113-72d0c47533e0.pdf
  - https://pubsonline.informs.org/doi/10.1287/mnsc.1110.1376
- **For Velora:**
  - A short (about 2–4 s) "Reviewing your answers: BMI ✓ health factors ✓ treatment options ✓" screen before a **qualifying** result is supported by the evidence.
  - For **non-qualifying** users, skip it or keep it minimal. Long theatre followed by "not eligible" is the worst case the paper found.
  - Also: show real checks (the BMI calculation), not fake ones. Trust is a stated goal.

## 7. Multi-step beats a single long page, but only when the form is long
- **Numbers [vendor]:**
  - Venture Harbour: 0.96% to 8.1% after moving an enquiry form to one-question-at-a-time (+743%). Single site, no sample size given.
  - HubSpot reports "86% higher conversion" for multi-step forms. I could only reach this through Zuko, not the original.
  - Zuko's caveat: single-page forms are better for simple forms with 2–5 fields. Saving data between steps alone gave "up to 10%".
- **Sources:**
  - https://ventureharbour.com/cro-case-studies/
  - https://www.zuko.io/blog/single-page-or-multi-step-form
- **For Velora:**
  - A screening quiz is long and branching, so stay multi-step.
  - Save answers between steps (local storage at minimum). It's cheap, and "save progress" is already in our doc-only list.
  - Treat these vendor numbers as direction, not effect size. Don't quote 743% to leadership.

## 8. ⚠ PARTIAL CONTRADICTION: strict one-question-per-screen isn't optimal on mobile either
- **Numbers [primary]:** Mavletova & Couper (2015) meta-analysed 14 studies (39 samples) of mobile web surveys.
  - Shorter surveys and less complex design (fewer grids, sliders, drop-downs) lowered breakoff.
  - Scrolling vs paging had no overall effect.
  - In individual experiments, breakoff was 12.2% with all items on one page vs 13.0% on two pages and 14.9% on three. In another, 3.1% (scroll) vs 7.5% (paging).
  - Baseline: 41% breakoff on smartphones vs 24% on PC (Decipher).
- **GOV.UK [guidance]:** start with "one thing per page", but "user research will tell you when you can merge pages together."
- **Sources:**
  - https://publications.hse.ru/pubs/share/folder/l9nat4zsan/164997950.pdf
  - https://www.gov.uk/service-manual/design/form-structure
- **For Velora:**
  - This *supports* merging sex, age and height on one screen. Fewer pages helps when the items are simple and related.
  - It does not contradict notes.md. It does contradict the common "one question per screen always" CRO advice, so cite it in the decision doc.
  - Avoid sliders and drop-downs for height/weight. Use numeric inputs (`inputmode="numeric"`).

## 9. Benchmarks: health forms convert below average, and mobile converts worst
- **Numbers [vendor]:**
  - Zuko 2025, start-to-completion:
    | Segment | Overall | Desktop | Mobile | Sessions |
    | --- | --- | --- | --- | --- |
    | Healthcare | 44.4% | 49.9% | 40.8% | 727k |
    | All industries | 51.7% | 54.5% | 47.5% | 93M |
  - Baymard: 18% of shoppers abandon because checkout is "too long or complicated". Most flows can cut 20–60% of visible fields, and an ideal checkout has about 12 form elements.
- **Sources:**
  - https://www.zuko.io/benchmarking/industry-benchmarking
  - https://baymard.com/blog/checkout-flow-ux-optimization
- **For Velora:**
  - A realistic target for the quiz is a 45–55% start-to-complete rate on mobile.
  - Measure it per step (already doc-only in notes.md).
  - Baymard's line "the perception of work is as damaging as the work itself" is the cleanest one-liner for why we cut from 26 to ~12 steps.

## Gaps / not found
- **"x of N" vs %:** I found no primary A/B test comparing the two. The evidence above is about *speed* of progress, not format. Conrad used "percent completed".
- **Peytchev (2009) on breakoff by position and sensitive items:** only seen in a search snippet (the page returned 403). Not cited.

---

## Top 3 takeaways
1. **Keep the front-loaded bar, but change the justification.**
   - The meta-analysis shows fast-to-slow cuts drop-off (odds ×0.80) and slow-to-fast raises it (×1.56). A linear "1/26" counter is no better than nothing.
   - Make it honest by putting the heavy screens early and calling it effort-weighted. The current "honest" claim in notes.md is challengeable.
2. **Order screens for commitment.** One-tap, no-wrong-answer Q1 (goal) → merged simple basics → weight (with reassurance) → conditions → result → booking framed as the natural next step. Foot-in-the-door: 76% vs 17%.
3. **"Analyzing" screen only on the good-news path.** Keep it short (2–4 s), with real checks, before a qualifying result. Skip it for non-qualifying users: transparency followed by bad news scored worst in Buell & Norton.
