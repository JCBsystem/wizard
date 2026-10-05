# Steg 11 – Har du eller har du haft någon av följande sjukdomar?

- **URL:** https://quiz.companyx.example/2-3?step=11
- **Progress:** 10/26 (progress bar at top)

## Visible text (verbatim)

```
10/26
Har du eller har du haft någon av följande sjukdomar?

- Diabetes typ 1
- Multipel endokrin neoplasi typ II, gäller även om någon i din familj är drabbad
- Medullär tyreoideacancer (MTC), gäller även om någon i din familj är drabbad
- Ätstörningar (anorexia och/eller bulimi)
- Diabetesretinopati (förändringar i ögats näthinna orsakat av diabetes)

Ja
Nej
```

## Fields

| Type | Options | Required |
|---|---|---|
| Single-select (radio cards; auto-advance on click) | Ja · Nej | Yes (cannot advance without selecting) |

## Buttons

- **← (Go back)** – top left
- No next button; selecting an option advances automatically.

## Chosen

**Nej** (second option – "Ja" leads to `step=disqualified` with the text "Vid dessa sjukdomar passar tyvärr inte de läkemedel CompanyX förskriver." and a "Skrev du in fel?" button)

![step 11](step-11.png)
