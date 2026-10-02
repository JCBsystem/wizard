import { test, expect } from '@playwright/test';
import { wizard, blockFirestore, answer, isAuto } from './walk';

test('happy path reaches confirmation', async ({ page }, testInfo) => {
  await blockFirestore(page);
  await page.goto('/');
  const main = page.locator('main');

  for (const step of wizard.steps) {
    await expect(main).toHaveAttribute('data-step', step.id);
    for (const f of step.fields ?? []) await answer(main, f);
    if (step.type === 'confirmation') break;
    // Auto-advance steps move on by themselves; the next data-step check waits for it.
    if (!isAuto(step)) await page.getByRole('button', { name: step.cta ?? wizard.ui.next }).click();
  }

  await expect(main).toHaveAttribute('data-step', wizard.steps.at(-1)!.id);
  await expect(page.getByRole('button', { name: wizard.ui.restart })).toBeVisible();
  await page.screenshot({ path: `screenshots/${testInfo.project.name}-confirmation.png`, fullPage: true });
});

test('back returns to the previous step', async ({ page }) => {
  await blockFirestore(page);
  await page.goto('/');
  const main = page.locator('main');
  const [first, second] = wizard.steps;
  for (const f of first.fields ?? []) await answer(main, f);
  if (!isAuto(first)) await page.getByRole('button', { name: first.cta ?? wizard.ui.next }).click();
  await expect(main).toHaveAttribute('data-step', second.id);
  await page.getByRole('button', { name: wizard.ui.back }).click();
  await expect(main).toHaveAttribute('data-step', first.id);
});
