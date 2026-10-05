---
name: write-e2e-test
description: Use when adding or changing behavior in the CompanyX wizard (app/) and a Playwright test is needed — how to write e2e tests in e2e/ using the shared walk helpers, data-driven from wizard-a/b.json, mobile projects, Firestore blocked.
---
# Writing e2e tests (CompanyX wizard)

Tests live in `e2e/tests/*.spec.ts`; shared helpers in `e2e/tests/walk.ts`. Config: `e2e/playwright.config.ts` (starts the app on :5173, projects `iPhone 13` + `Pixel 7`). CI runs all of it on every push/PR.

Run: `cd e2e && npx playwright test` · one file: `npx playwright test tests/smoke.spec.ts` · one project: `--project="iPhone 13"` · debug: `--ui`.

## Rules
- Data-driven: iterate `wizardA` / `wizardB` (from walk.ts, i.e. `app/src/data/wizard-{a,b}.json`). Never hardcode step ids, titles or copy.
- Use walk.ts helpers: `answer(page, field)`, `isAuto(step)`, `blockFirestore(page)`, `wizard` (= wizardA).
- Always `await blockFirestore(page)` before `goto` (hermetic, no network dependency).
- Pin the variant with `/?variant=a|b` (preview only, never saved to localStorage). Without it the variant is random-ish and sticky.
- Select by `getByTestId`: `wizard` (the `<main>`, carries `data-step` and `data-variant`), `step-title`, `next`, `back`, `restart`, `option-<fieldId>-<value>`, `input-<fieldId>`, `slider-<fieldId>`, `field-<fieldId>`; or by role/aria-label. Never CSS classes.
- Auto-advance steps (`isAuto`: only single-choice fields, no note) have no `next` CTA; they move on after the pick. Click `next` only if `!isAuto(step)`.
- Wait with `await expect(main).toHaveAttribute('data-step', id)`, never `waitForTimeout`.
- One behavior per test, named for the behavior. Assertions must fail when the feature breaks (no `toBeVisible` on something always there, no empty loops).
- Add a helper to walk.ts only when 2+ tests need it.
- Mobile only: viewports come from the projects; don't set your own.

## Template
```ts
import { test, expect } from '@playwright/test';
import { wizardA, wizardB, blockFirestore, answer, isAuto } from './walk';

for (const [v, wiz] of [['a', wizardA], ['b', wizardB]] as const) {
  test(`first step advances to the second (variant ${v})`, async ({ page }) => {
    await blockFirestore(page);
    await page.goto(`/?variant=${v}`);
    const main = page.getByTestId('wizard');
    const [first, second] = wiz.steps;
    await expect(main).toHaveAttribute('data-step', first.id);

    for (const f of first.fields ?? []) await answer(page, f);
    if (!isAuto(first)) await page.getByTestId('next').click();

    await expect(main).toHaveAttribute('data-step', second.id);
  });
}
```

## Checklist before done
- [ ] Break the feature on purpose once; the test must fail. Restore it.
- [ ] `npx playwright test` passes on both projects (iPhone 13, Pixel 7).
- [ ] Run it 2-3 times (`--repeat-each=3`); no flakiness, no fixed timeouts.
- [ ] No hardcoded ids/copy; `blockFirestore` present; no stray files (screenshots/test-results are artifacts, not committed).
