import type { Page } from '@playwright/test';
import dataA from '../../app/src/data/wizard-a.json';
import dataB from '../../app/src/data/wizard-b.json';
import type { Field, Step, Wizard } from '../../app/src/wizard/types';

export const wizardA = dataA as unknown as Wizard;
export const wizardB = dataB as unknown as Wizard;
export const wizard = wizardA;

// Hermetic: Firestore writes just queue offline; the app must not depend on them.
export const blockFirestore = (page: Page) => page.route(/firestore\.googleapis\.com/, (r) => r.abort());

const sample = (f: Field) => {
  if (f.type === 'number') return String(Math.min(f.max, Math.max(f.min, Number(f.placeholder?.match(/\d+/)?.[0] ?? f.min))));
  if (f.type === 'text' && f.inputType === 'email') return 'test@example.com';
  if (f.type === 'text' && f.inputType === 'tel') return '0701234567';
  return 'Test';
};

export async function answer(page: Page, f: Field) {
  if (f.type === 'single' || f.type === 'multi') await page.getByTestId(`option-${f.id}-${f.options[0].value}`).click();
  else if (f.type === 'yesno') await page.getByTestId(`option-${f.id}-yes`).click();
  else if (f.type === 'slider') await page.getByTestId(`slider-${f.id}`).getByRole('slider').press('ArrowRight'); // marks it answered
  else await page.getByTestId(`input-${f.id}`).fill(sample(f));
}

// Mirrors Wizard.tsx: only-single steps advance on pick, no CTA. A field with a note keeps the CTA.
export const isAuto = (s: Step) => !!s.fields?.length && s.fields.every((f) => f.type === 'single' && !f.note);
