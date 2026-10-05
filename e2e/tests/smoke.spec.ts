import { test, expect } from '@playwright/test';
import { wizardA, wizardB, blockFirestore, answer, isAuto } from './walk';

for (const [v, wizard] of [['a', wizardA], ['b', wizardB]] as const) {
  test(`happy path reaches confirmation (variant ${v})`, async ({ page }, testInfo) => {
    await blockFirestore(page);
    await page.goto(`/?variant=${v}`);
    const main = page.getByTestId('wizard');
    await expect(main).toHaveAttribute('data-variant', v);
    await expect(page.getByTestId('step-title')).toContainText(wizard.steps[0].title!);

    for (const step of wizard.steps) {
      await expect(main).toHaveAttribute('data-step', step.id);
      for (const f of step.fields ?? []) await answer(page, f);
      if (step.type === 'confirmation') break;
      // Auto-advance steps move on by themselves; the next data-step check waits for it.
      if (!isAuto(step)) await page.getByTestId('next').click();
    }

    await expect(main).toHaveAttribute('data-step', wizard.steps.at(-1)!.id);
    await expect(page.getByTestId('restart')).toBeVisible();
    await page.screenshot({ path: `screenshots/${testInfo.project.name}-${v}-confirmation.png`, fullPage: true });
  });
}

test('back returns to the previous step', async ({ page }) => {
  await blockFirestore(page);
  await page.goto('/?variant=a');
  const main = page.getByTestId('wizard');
  const [first, second] = wizardA.steps;
  for (const f of first.fields ?? []) await answer(page, f);
  if (!isAuto(first)) await page.getByTestId('next').click();
  await expect(main).toHaveAttribute('data-step', second.id);
  await page.getByTestId('back').click();
  await expect(main).toHaveAttribute('data-step', first.id);
});

test('variant is sticky across reload', async ({ page }) => {
  await blockFirestore(page);
  await page.goto('/');
  const v = await page.getByTestId('wizard').getAttribute('data-variant');
  expect(['a', 'b']).toContain(v);
  await page.reload();
  await expect(page.getByTestId('wizard')).toHaveAttribute('data-variant', v!);
});

test('?variant= shows a variant for testing without changing the customer\'s saved one', async ({ page }) => {
  await blockFirestore(page);
  const main = page.locator('main');
  await page.goto('/');
  const saved = await main.getAttribute('data-variant');
  const other = saved === 'a' ? 'b' : 'a';
  await page.goto(`/?variant=${other}`);
  await expect(main).toHaveAttribute('data-variant', other);
  await page.goto('/');
  await expect(main).toHaveAttribute('data-variant', saved!);
});
