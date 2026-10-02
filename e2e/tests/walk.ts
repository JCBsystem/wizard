import type { Locator, Page } from '@playwright/test';
import data from '../../app/src/data/wizard.json';
import type { Field, Step, Wizard } from '../../app/src/wizard/types';

export const wizard = data as unknown as Wizard;

// Hermetic: Firestore writes just queue offline; the app must not depend on them.
export const blockFirestore = (page: Page) => page.route(/firestore\.googleapis\.com/, (r) => r.abort());

const sample = (f: Field) => {
  if (f.type === 'number') return String(Math.min(f.max, Math.max(f.min, Number(f.placeholder?.match(/\d+/)?.[0] ?? f.min))));
  if (f.type === 'text' && f.inputType === 'email') return 'test@example.com';
  if (f.type === 'text' && f.inputType === 'tel') return '0701234567';
  return 'Test';
};

export async function answer(main: Locator, f: Field) {
  const el = main.locator(`[data-field="${f.id}"]`);
  if (f.type === 'single' || f.type === 'yesno') await el.getByRole('radio').first().click();
  else if (f.type === 'multi') await el.getByRole('checkbox').first().click();
  else if (f.type === 'slider') await el.getByRole('slider').press('ArrowRight'); // marks it answered
  else await el.locator('input').fill(sample(f));
}

// Mirrors Wizard.tsx: only-single steps advance on pick, no CTA. A field with a note keeps the CTA.
export const isAuto = (s: Step) => !!s.fields?.length && s.fields.every((f) => f.type === 'single' && !f.note);
