# Steg 26 – Ange dina uppgifter för att se resultatet

- **URL:** https://quiz.velora.se/2-3?step=29
- **Progress:** 25/26
- **Kind:** Lead-capture form (contact details gate before results)

## Visible text (verbatim)

```
25/26
Ange dina uppgifter för att se resultatet

[Förnamn]
[Telefonnummer]
[Email]

Genom att klicka "OK" nedan så godkänner du att du har läst, förstått och accepterat våra Användarvillkor.

OK
```

## Fields

| Type | Placeholder | Required |
|---|---|---|
| Text input (`type="text"`) | Förnamn | Yes in practice – "OK" disabled until form valid (no HTML `required`) |
| Phone input (`type="tel"`) | Telefonnummer | Yes in practice |
| Email input (`type="email"`) | Email | Yes in practice |

No visible labels other than placeholders.

## Links

- **Användarvillkor** → https://www.velora.se/anvandarvillkor

## Buttons

- **← (Go back)**
- **OK** – disabled until fields are filled; submitting implies acceptance of the terms

## Chosen

Entered **Förnamn:** Test Testsson · **Telefonnummer:** 0701234567 · **Email:** test@example.com. "OK" then became enabled.

**Documentation stops here. OK was NOT clicked.** Clicking OK submits the contact details as a real lead to Velora. The agent's permission system blocked it as a real-world transaction. The remaining step (26/26, which presumably shows the result and the "Boka bedömningssamtal" button) was not reached.

(The screenshot shows the form before the dummy data was entered.)

![step 26](step-26.png)
