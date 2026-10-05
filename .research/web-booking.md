# Booking & lead-capture step: evidence and spec

Scope: result → book free online meeting → confirmation (mobile, Sweden, GLP-1).
Pages marked (opened) were fetched and read. Pages marked (search snippet) could not be opened (paywall/captcha), so treat those numbers as weaker.

## Findings

1. **Gating the result behind contact details costs a lot of people.** ConvertFlow sees **30–50% of quiz finishers drop** when email is required before results. Putting it after the result gets fewer emails but more conversions. This is vendor data from e-commerce, not peer-reviewed.
   Source (opened): https://www.convertflow.com/blog/how-to-fix-ecommerce-quiz-funnel-drop-off-in-2026
   **CompanyX:** show the result ("may suit you") **ungated**. Ask for contact details only as part of booking, where they are clearly needed ("so the nurse can call you"). The result itself is what earns the details.

2. **Field count matters more than step count.** Baymard: the average checkout has **11.3 fields** but **8 is enough**, and 17% abandon over complexity. With split first/last name fields, **42% type their full name into "First name"**; a single "Full name" field causes 4% hesitation. Baymard also says to delay account creation to the confirmation page.
   Source (opened): https://baymard.com/blog/checkout-flow-average-form-fields
   **CompanyX:** booking form = **3 fields** (full name, mobile, email). No account and no password. Defer anything else (address, personnummer) until after the meeting.

3. **A short booking horizon lowers no-shows.** In 1.26M appointments, no-shows were **4.3% at 0–15 days lead time vs 7.7% at >60 days**. "Appointment confirmed = yes" was among the top 3 predictors of attendance (Marshfield, PMC). A study of new patients reports **30% no-show for new vs 21% for follow-up patients**, and **23% (<30 d) vs 47% (≥30 d)** (Health Care Manager 2017, search snippet).
   Source (opened): https://pmc.ncbi.nlm.nih.gov/articles/PMC10503036/ · (search snippet) https://journals.lww.com/healthcaremanagerjournal/abstract/2017/01000/lead_time_to_appointment_and_no_show_rates_for_new.2.aspx
   **CompanyX:** offer only the **next 3–5 days**, default to the soonest day, and lead with "Next available: today 16:30". CompanyX's leads are new patients, the high-risk group.

4. **Reminders work, and several beat one.** A meta-analysis of 21 studies found no-shows of **15% with digital notifications vs 21% without (RR 0.75)**. **Multiple notifications raised attendance by 25% vs 6% for a single one.**
   Source (opened): https://pmc.ncbi.nlm.nih.gov/articles/PMC5093388/
   **CompanyX:** send SMS + email right away, an SMS 24 h before, and one 1–2 h before with the join link. The confirmation page says this explicitly ("We'll text you a reminder").

5. **The same pattern holds for meetings booked online.** Calendly users report an **average 28% drop in no-shows** with automated reminders (88% saw a decrease). Calendly's advice: 2–3-day windows for inbound leads, reminders at 24 h and 4 h, and an agenda sent ahead. Vendor survey.
   Source (opened): https://calendly.com/blog/reduce-no-show-rates-sales
   **CompanyX:** put a 3-bullet "what we'll talk about" agenda on the confirmation page and in the email.

6. **Limit the slot choices.** Decision time grows with the number of options (Hick's law). Booking guidance says to show a few slots and let people expand for more. This is a principle, not a measured study for booking.
   Source (opened via search): https://thedecisionlab.com/reference-guide/design/hicks-law
   **CompanyX:** a horizontal row of day chips (5 days), then **4–6 slots per day** grouped Morning/Afternoon/Evening, plus "Show more times". Scarcity must be **true**: show "2 times left today" only when it really is so. Fake urgency hurts trust in a health context.

7. **BankID is universal in Sweden, but it's a heavy step.** **95% of Swedes use mobile BankID** (99% aged 18–64, 84% aged 65+, 74% aged 76+). Freja is at 4%. Kry, Doktor.se, 1177 and Yazen all use BankID to log in to their **clinics**. IMY: authentication strength should match how sensitive the data is.
   Sources (opened): https://svenskarnaochinternet.se/rapporter/svenskarna-och-internet-2025/anvandning-av-internet-och-e-tjanster/ · https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/informationssakerhet/autentisering/ · (search) https://clinic.yazen.com/login/bankid
   **CompanyX:** **don't require BankID to book a free intro meeting.** The meeting is not a record-reading e-service. Requiring BankID adds an app switch and makes the step feel like a commitment. Use it **later** (the clinic and prescription step needs a verified identity and personnummer). On the confirmation page, say "Before treatment you'll verify with BankID". This is an assumption about CompanyX's legal setup; confirm with the team.

8. **The confirmation page's job is reassurance.** NN/g: confirmation steps calm anxiety and build trust. Show exactly what was booked, and let people create an account after the main task, not during it.
   Sources (opened): https://www.nngroup.com/articles/after-the-buy-button-in-e-commerce/ · Baymard (above) on delaying account creation
   **CompanyX:** the confirmation shows the exact date, time, length, format and who calls. It has **Add to calendar** (.ics / Google), **Change time**, a 3-step "what happens next", and "how to prepare" (nothing needed, ~20 min, somewhere private).

## Recommended booking-step spec (mocked prototype)

**Screen A: Result (ungated)**
- Heading: "Medicinsk viktminskning kan passa dig" plus 1–2 personalised lines drawn from their answers.
- Primary CTA: "Boka ett kostnadsfritt samtal". Below it: "15–20 min · Online · Ingen kostnad, inget åtagande".
- Show "Nästa lediga tid: idag 16:30" directly on the result screen. That cuts out one decision.

**Screen B: Pick a time**
- Day chips for the next 5 days (Today, Tomorrow, Fri 4 Oct…). Today, or the first day with slots, is preselected.
- 4–6 slot buttons (min 44px tall), grouped by time of day, plus "Visa fler tider".
- Header: "Samtal med legitimerad sjuksköterska" with a small avatar or team photo. Time zone is implicit (Swedish time).
- Honest scarcity only ("2 tider kvar idag" when true). No countdown timers.
- Sticky CTA: "Fortsätt med tis 3 okt 16:30".

**Screen C: Your details (3 fields)**
- Order: Mobilnummer (type=tel, +46 prefilled, autocomplete=tel) → Namn (single field, autocomplete=name) → E-post (type=email, autocomplete=email).
- Helper copy: "Vi ringer/skickar länken hit. Vi delar aldrig dina uppgifter."
- Consent: one line linking to the privacy policy, plus an unchecked opt-in for marketing (GDPR). Health answers are covered by the privacy note.
- Summary chip at the top: "tis 3 okt · 16:30 · Ändra".
- CTA: "Boka samtalet". No BankID, no password, no personnummer.

**Screen D: Confirmation**
- Check-mark animation, then: "Du är bokad, Anna." Below: "tis 3 okt kl 16:30 · 20 min · Videosamtal".
- Buttons: "Lägg till i kalender" (primary secondary-style) and "Ändra tid".
- What happens next: 1) Bekräftelse på SMS + e-post nu → 2) Påminnelse dagen innan och 1 h före med länk → 3) Samtalet: vi går igenom din hälsa, dina mål och om behandling passar. Du bestämmer sedan.
- How to prepare: "Inget att förbereda. Ha gärna din vikt och eventuella mediciner i huvudet."
- Trust: who they will meet (licensed nurse/doctor), "Kostnadsfritt, inget åtagande", and how to get help or a contact.
- Later step: "Om du går vidare verifierar du dig med BankID".

## Top 3 takeaways
1. **Show the result ungated. Ask for contact details only at booking: 3 fields, no BankID or account.** Gating loses about 30–50% of finishers (vendor data), and every extra field costs completions (Baymard).
2. **Short horizon, fewer slots, soonest first.** No-shows rise with lead time (4.3% → 7.7%; new patients far worse). Offer the next 3–5 days and preselect "next available".
3. **The confirmation page plus reminders is the no-show fix.** Reminders give RR 0.75, and multiple reminders beat one (25% vs 6%). Add to calendar, an agenda/what to expect, and an easy reschedule.
