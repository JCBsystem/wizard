# CompanyX quiz: 26 screens to 20, every question kept

A working prototype of CompanyX's intake quiz (`app/`, config in `app/src/data/wizard-a.json` and `wizard-b.json`, two variants that differ only in the start-screen headline: A "Ta reda på om medicinsk viktnedgång kan passa dig", B "Kan medicinsk viktnedgång vara något för dig? Ta reda på det"). It asks the same 20 questions with the same titles, groups related ones, shows the result before asking for contact details, and ends with a booked video call. Screens and comparisons: `mockups/index.html`.

## Today vs new

| | Today (`docs/wizard/`) | New |
|---|---|---|
| Screens | 26, ending at the contact form | 20, from start screen to booked call |
| Questions | 20 | 20, titles word for word |
| Screens with questions | 20 | 15 |
| Info screens | 5 screens of their own | 0; text sits in the flow, full text behind "Läs mer" |
| Contact details | Screen 26, required to see the result | Screen 19, after the result and a picked time |
| Weight, height, target weight | Typed into an empty number box | Sliders |

## The 20 screens

| # | Section | CompanyX's screens on it (walkthrough number) |
|---|---|---|
| 01 | Start | New: "Ta reda på om medicinsk viktnedgång kan passa dig". Holds info 13 behind Läs mer |
| 02 | Mål | Goal (01) |
| 03 | Mål | Reasons (03) + how weight affects life (04) |
| 04 | Mål | Target weight (12) + pace (05) |
| 05 | Om dig | Sex (06) + age (07) |
| 06 | Om dig | Weight (08) + height (09) |
| 07 | Hälsa | BMI criteria (10) |
| 08 | Hälsa | Conditions (11) |
| 09 | Hälsa | Medication (14) + info 15, shown when the answer is "Ja" |
| 10 | Vanor | Lifestyle (16) + how long you have tried (17) |
| 11 | Vanor | Methods tried (18) |
| 12 | Vanor | What made it hard (20) |
| 13 | Framtid | Life at goal (22) |
| 14 | Framtid | Self-image (23) |
| 15 | Framtid | Treatment priorities (24) |
| 16 | Framtid | How you found us (25) |
| 17 | Resultat | "Medicinsk viktnedgång kan passa dig", goal and BMI played back. Holds info 02 |
| 18 | Bokning | "Välj en tid som passar". Holds info 19 |
| 19 | Bokning | CompanyX's contact form (26): Förnamn, Telefonnummer, Email |
| 20 | Bekräftelse | "Vi ses {{slot}}!" and next steps. Holds info 21 |

## Where CompanyX's 5 info screens went

The headline is kept; the original body text opens under "Läs mer".

| Today | Headline | Now on |
|---|---|---|
| 02 | "Ditt mål att förlora 1-10kg för gott är närmare än vad du tror" | 17 Resultat (the kg range follows the chosen goal) |
| 13 | "5 000+ har startat där du är nu" | 01 Start |
| 15 | "Vi hjälper dig med en smidig och snabb övergång" | 09 Hälsa, under the medication question when the answer is "Ja" |
| 19 | "9 av 10 medlemmar tycker CompanyX är det mest effektiva programmet de har testat" | 18 Bokning |
| 21 | "Hälsokontroll och blodprover" | 20 Bekräftelse |

## Changed text

- CompanyX's contact form title "Ange dina uppgifter för att se resultatet" is no longer true, since the result comes first. Screen 19 asks "Vart skickar vi bekräftelsen?"; the three fields are unchanged.
- Some screens get one added line saying why we ask, e.g. on conditions: "Vi frågar för att läkaren ska kunna bedöma om en behandling är säker för dig."

## Assumptions

- CompanyX's result and booking screens were not reached in the walkthrough (it stops at the contact form), so the copy on screens 01, 17, 18, 19 and 20 is ours.
- Call length (20 min), the named doctor and the time slots are placeholders.
