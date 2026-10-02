import { test, expect } from '@playwright/test';

test('home loads with a button', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('button').first()).toBeVisible();
  await page.screenshot({ path: `screenshots/${testInfo.project.name}-home.png`, fullPage: true });
});
