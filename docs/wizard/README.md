# Velora quiz (2-3) – wizard walkthrough

Start: https://quiz.velora.se/2-3?step=1 · Captured 2026-10-02 · Desktop viewport, full-page screenshots.

Navigation was done only through UI clicks. The `step` URL param does not map 1:1 to screens: some numbers are skipped (7, 16–18, 24), `step=15` is used for two screens, and branch screens use names (`bmi-criteria`, `disqualified`). The on-page counter (`N/26`) is a separate sequence.

**Status: incomplete.** The walkthrough stops at the lead form (counter 25/26). Clicking "OK" there submits contact details as a real lead, and the permission system blocked it. The final screen with "Boka bedömningssamtal" was not reached and has not been documented.

## Steps

| # | Counter | URL step | Title | Type | Answer chosen |
|---|---|---|---|---|---|
| [01](step-01.md) | 1/26 | 1 | Vad är ditt viktminskningsmål? | single-select | Förlora 1-10kg för gott |
| [02](step-02.md) | 2/26 | 2 | Ditt mål att förlora 1-10kg för gott är närmare än vad du tror | info (chart) | Fortsätt |
| [03](step-03.md) | 3/26 | 3 | Vilka är de främsta anledningarna till att du vill gå ner i vikt? | multi-select | Bli mer självsäker |
| [04](step-04.md) | 4/26 | 4 | Hur påverkar din nuvarande vikt ditt liv? | single-select | Inte så mycket |
| [05](step-05.md) | 5/26 | 5 | Hur vill du uppnå din målvikt? | single-select | Så snabbt som möjligt |
| [06](step-06.md) | 6/26 | 6 | Vilket biologiskt kön är du? | single-select | Man |
| [07](step-07.md) | 7/26 | 8 | Hur gammal är du? | single-select | 18-30 år (*not first: "Under 18 år" disqualifies*) |
| [08](step-08.md) | 8/26 | 9 | Vad är din nuvarande vikt? | number | 95 |
| [09](step-09.md) | 9/26 | 10 | Hur lång är du? | number | 178 |
| [10](step-10.md) | 9/26 | bmi-criteria | Ditt BMI är 30. Uppfyller du något av följande 3 kriterier? | single-select | Ja |
| [11](step-11.md) | 10/26 | 11 | Har du eller har du haft någon av följande sjukdomar? | single-select | Nej (*not first: "Ja" disqualifies*) |
| [12](step-12.md) | 11/26 | 12 | Vad är din målvikt? | text (numeric) | 87 |
| [13](step-13.md) | 12/26 | 13 | 5 000+ har startat där du är nu | info (testimonial) | Fortsätt |
| [14](step-14.md) | 13/26 | 14 | Tar du mediciner idag för viktnedgång? | single-select | Ja |
| [15](step-15.md) | 14/26 | 15 | Vi hjälper dig med en smidig och snabb övergång | info (testimonial) | Fortsätt |
| [16](step-16.md) | 15/26 | 15 | Vad beskriver din nuvarande livsstil bäst? | single-select | Jag lever ett aktivt liv och äter för det mesta nyttigt |
| [17](step-17.md) | 16/26 | 19 | Hur länge har du försökt gå ner i vikt? | single-select | Sista 12 månaderna |
| [18](step-18.md) | 17/26 | 20 | Vilka metoder har du tidigare provat för att gå ner i vikt? | multi-select | Dieter (t.ex. Keto eller LCHF) |
| [19](step-19.md) | 18/26 | 21 | 9 av 10 medlemmar tycker Velora är det mest effektiva programmet de har testat | info (comparison) | Nästa |
| [20](step-20.md) | 19/26 | 22 | Vad har gjort det svårt att gå ner i vikt tidigare? | multi-select | Jag förlorar motivationen |
| [21](step-21.md) | 20/26 | 23 | Hälsokontroll och blodprover | info | Jag förstår |
| [22](step-22.md) | 21/26 | 25 | När jag har nått mitt mål, vill jag gärna... | multi-select | Tänka mindre på mat överlag |
| [23](step-23.md) | 22/26 | 26 | När jag tänker på mig själv vid mitt mål ser jag mig själv... | multi-select | Känna mig mer energisk |
| [24](step-24.md) | 23/26 | 27 | När du överväger behandling, vilka av följande är viktigast för dig? | multi-select | Jag vill maximera mina resultat |
| [25](step-25.md) | 24/26 | 28 | Hur hittade du oss? | single-select | Vänner, familj eller kollega |
| [26](step-26.md) | 25/26 | 29 | Ange dina uppgifter för att se resultatet | lead form (name/tel/email) | Filled with dummy data; **OK not clicked** |

Side branch: [side-disqualified.md](side-disqualified.md) – age < 18 → `step=disqualified`.

## Path taken

The first option was picked at every step, with two exceptions where the first option ends the quiz (step 07 age, step 11 contraindications). Dummy data used: 95 kg, 178 cm (BMI 30), target 87 kg, Test Testsson / 0701234567 / test@example.com.

## Branching observed

- **Disqualification:** "Under 18 år" (step 07) and "Ja" to the contraindicated conditions (step 11) both lead to `step=disqualified`, which has a "Skrev du in fel?" button to go back. "Nej" on BMI criteria (step 10) probably also disqualifies (not tested).
- **Skipped URL steps:** `step=7` is skipped after choosing "Man" (probably a pregnancy/breastfeeding question for women). `step=16–18` are skipped after the lifestyle question. `step=24` is skipped after the blood-test info screen.
- **Conditional screens:** `bmi-criteria` is shown after height, with the BMI computed from earlier answers. The "smidig och snabb övergång" screen (step 15) appears after "Ja" to current weight-loss medication, probably only on that answer.
- **Content oddity:** the age options jump from "51-70 år" to "Över 75 år", so 71–75 is missing, yet the disqualification text says 18-75.
