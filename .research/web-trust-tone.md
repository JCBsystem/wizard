# Trust, tone & sensitive questions in health funnels (web research)

Timebox ~15 min. All sources opened except where marked *(search snippet only)*.

## Findings

1. **Put the person first, not the condition.** OAC: say "person with obesity", not "obese person"; "By using 'obese,' we are dehumanizing individuals." Over a dozen medical bodies have adopted this. EASO's guide says the same.
   Source: https://www.obesityaction.org/action-through-advocacy/weight-bias/people-first-language/ · https://easo.org/wp-content/uploads/2024/05/Person-First-Language-guide-addressing-Weight-Bias.pdf *(search snippet only)*
   **CompanyX:** never use "obese/överviktig" as an adjective for the user. If a label is needed, describe the measurement ("ditt BMI"), not the person.

2. **Patients prefer neutral, measurable words.** World Obesity: use "weight, BMI, waist circumference" rather than "fat, fatness, heaviness"; obesity is a clinical term, not a description of how someone looks. Puhl et al. found "weight" and "unhealthy weight" rated most desirable, and "fatness", "heaviness" and "obesity" among the least.
   Source: https://www.worldobesity.org/resources/image-bank/image-bank-guidelines · Puhl 2011 https://pmc.ncbi.nlm.nih.gov/articles/PMC3310899 *(captcha, search snippet only)*
   **CompanyX:** questions say "vikt" and "längd". The result talks about "BMI" and "hälsa", never "fetma".

3. **In Swedish, "fetma" is now considered loaded. Use "obesitas" and person-first wording.** Region Stockholm's Centrum för obesitas says not to use "fetma", "fet" or "tjock", and to say "person som lever med obesitas". Läkartidningen (2025): almost 75% of 1,275 respondents in Obesitas Sverige's survey reported poor treatment in healthcare. Stigma leads people to avoid care.
   Source: https://lakartidningen.se/vetenskap/kliniska-implikationer-av-viktstigma-och-patientbemotande-vid-obesitas/ · centrumobesitas.se *(search snippet only; page now 404 after a redirect)*
   **CompanyX:** many users arrive having been badly treated in healthcare before. Say once, explicitly, that they will not be judged.

4. **Ask permission and explain the purpose before sensitive questions.** NN/g: build trust with easy questions first, and "consider explaining the purpose of asking it and the benefit that could come from answering it honestly". Offer "prefer not to say" and ranges where accuracy allows. Make the privacy model clear. Clinical version (Läkartidningen): "Är det okej om jag ställer några frågor om …?"
   Source: https://www.nngroup.com/articles/sensitive-questions/
   **CompanyX:** keep weight and conditions in the middle of the quiz, not first or last. Add a short intro screen before the health block: "Nu några frågor om din hälsa." Weight needs an exact value for BMI, so no ranges there. Add "Vet inte / vill hellre ta det på mötet" to the condition questions where screening allows.

5. **A one-line "why we ask" removes most of the reluctance.** Baymard: 14% refuse to give a phone number and 27% are reluctant to give date of birth. A brief inline explanation of why the field is needed reassures most users. A reason given ("because…") also raises compliance (Langer, cited by NN/g).
   Source: https://baymard.com/blog/explain-phone-number-field
   **CompanyX:** every sensitive field and the phone/personnummer fields at booking get one line of grey help text starting with "Vi frågar för att…".

6. **Showing real privacy rights builds trust. Vague badges don't.** Under the Patientdatalagen, journal data may be read only by staff involved in your care. You can request a log of who has read it. GDPR and the PDL apply equally to private providers (IMY). Private providers must keep journals for at least 10 years, and you almost always have the right to read yours (IVO).
   Source: https://www.imy.se/privatperson/dataskydd/vi-guidar-dig/dina-rattigheter-i-varden/ · https://www.ivo.se/om-din-patientjournal/
   **CompanyX:** under the weight field: "Bara vårdpersonal som är med i din vård kan se dina svar." Link to a short "Så skyddar vi dina uppgifter" page. Don't invent "GDPR-certifierad"; no such seal exists.

7. **Licensed clinicians are verifiable. Show it.** Socialstyrelsen's HOSP register of licensed healthcare staff is public, and anyone can check a legitimation. IVO's vårdgivarregister is *not* publicly searchable, so "Registrerad hos IVO" can't be checked by the user and is weaker.
   Source: search results for legitimation.socialstyrelsen.se and IVO *(search snippets only)*
   **CompanyX:** on the result and booking screens, show the meeting person's face, name and title, e.g. "Leg. sjuksköterska". That is a promise the user can check. Real photos, never stock.

8. **Trust in design = professional quality + upfront disclosure + real content + an external footprint.** NN/g's four factors. Disclose fees and the process upfront, and link to independent reviews (e.g. Trustpilot), not only on-site quotes. Industry blogs add that a mix of honest reviews reads as more genuine than flawless praise.
   Source: https://www.nngroup.com/articles/trustworthy-design/
   **CompanyX:** the result screen states "Mötet är kostnadsfritt och förpliktar inte till något", and says what treatment costs if you continue (or where to see it). Show one real review score with its source.

9. **Images: faces, everyday activity, no headless bodies.** World Obesity's guidelines ban neck-down or face-blurred shots, close-ups of bellies, and food or sedentary stereotypes. Show "normal, non-sedentary lifestyle activities".
   Source: https://www.worldobesity.org/resources/image-bank/image-bank-guidelines
   **CompanyX:** no before/after imagery or tape measures. Use clinician portraits or calm, everyday people.

10. **Legal limit: no prescription-drug advertising to the public.** In Dec 2024 Läkemedelsverket banned Yazen from marketing GLP-1 drugs (Ozempic/Wegovy) to the public, with a fine of 750,000 kr per violation. The ruling held that the ads reached "a broad audience, not just patients".
   Source: https://lakartidningen.se/nyheter/natklinik-forbjuds-gora-reklam-for-ozempic-hotas-med-dryga-viten/
   **CompanyX:** the quiz and result screens must not name drugs or promise medication ("du kan få Wegovy"). Frame the offer as "medicinsk viktbehandling kan passa dig – det avgör vi tillsammans på mötet". *Assumption: confirm with CompanyX's legal team.*

## Words to use / avoid

| Avoid (SV / EN) | Use instead (SV / EN) | Why |
|---|---|---|
| fetma, fet, tjock / fat, obese (adj.) | obesitas, din vikt / obesity, your weight | Centrum för obesitas; OAC |
| överviktig person / obese person | person med obesitas / person with obesity | person-first |
| bekämpa vikten, kampen / fight, battle | behandling, stöd / treatment, support | obesity is a chronic disease, not a failure |
| viljestyrka, disciplin / willpower | biologi, aptitreglering / biology | removes blame |
| bantning, diet / dieting | viktbehandling / weight treatment | clinical framing |
| Du kvalificerar dig! / You qualify! | Behandling kan passa dig / Treatment may suit you | honest, not a promise (finding 10) |
| Ozempic, Wegovy, GLP-1-spruta | medicinsk viktbehandling | Läkemedelsverket |
| Ange din vikt (command) / Enter weight | Hur mycket väger du idag? / What do you weigh today? | conversational, not an interrogation |
| Obligatoriskt / Required | (explain why instead) | Baymard |

## Example microcopy (Swedish first, English in brackets)

**Weight question**
- Rubrik: "Hur mycket väger du idag?" (What do you weigh today?)
- Hjälptext: "Vi frågar för att räkna ut ditt BMI, ett av flera sätt vården bedömer om behandling kan passa. En ungefärlig siffra räcker." (We ask to calculate your BMI, one of several ways care is assessed. A rough number is fine.)
- Under fältet: "🔒" icon + "Bara vårdpersonal i din vård ser dina svar." (Only clinicians involved in your care see your answers.) [lock as a UI icon only, not an emoji in copy]

**Conditions question**
- Intro screen: "Nu några frågor om din hälsa. De hjälper oss att se att behandlingen är säker för just dig." (A few health questions. They help us make sure treatment is safe for you.)
- Rubrik: "Har du någon av de här?" (Do you have any of these?) Options are multi-select, with "Inget av detta" and "Vet inte, jag tar det på mötet". (Note: "Vet inte" should still send the person to a clinician; don't let it silently skip a screening step.)
- Hjälptext: "Vissa tillstånd påverkar vilken behandling som passar. Det finns inga fel svar." (Some conditions affect which treatment suits you. There are no wrong answers.)

**Result screen**
- "Medicinsk viktbehandling kan passa dig." (Medical weight treatment may suit you.)
- "Utifrån dina svar är nästa steg ett kostnadsfritt samtal med [Anna, leg. sjuksköterska]. Ni går igenom din hälsa och dina mål. Du bestämmer sedan i lugn och ro." (Based on your answers, the next step is a free call with [Anna, licensed nurse]. You go through your health and goals, then decide in your own time.)
- Trust row: clinician photo · "Kostnadsfritt, inget åtagande" · review score with source.

**Booking**
- Rubrik: "Välj en tid som passar dig" (Pick a time that suits you)
- Phone help text: "Vi ringer bara inför och under ditt möte, aldrig för säljsamtal." (We only call about your meeting, never for sales.)
- Confirmation: "Klart, vi ses tisdag 14:30. Du får en bekräftelse via SMS. Mötet tar ca 20 min och du behöver inte förbereda något." (Done, see you Tuesday at 14:30. You'll get an SMS confirmation. The meeting takes about 20 min and needs no preparation.)
- Meeting length and SMS channel are assumptions; check what CompanyX actually does.

## Top 3 takeaways

1. **Language is the trust layer.** Use person-first, neutral words ("vikt", "BMI", "obesitas", never "fetma"), and say once, explicitly, that there is no judgement. Most of the audience has been treated badly in healthcare before.
2. **Every sensitive question needs a "Vi frågar för att…" line and a privacy line grounded in real rights** (only clinicians in your care see it, PDL/GDPR). Order easy questions first, put the health block mid-flow, and introduce it with a short intro screen.
3. **Make trust checkable and keep it legal.** Show a real, licensed clinician's face and title, state the price and that there's no commitment, and link to external reviews. Never name drugs or promise medication (Läkemedelsverket vs Yazen, 2024).
