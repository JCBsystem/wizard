import { test, expect, type Page } from '@playwright/test';
import type { Wizard } from '../../app/src/wizard/types';
import { wizardA, wizardB, isAuto, answer } from './walk';

// Firestore is intercepted (aborted, nothing leaves the machine). The SDK opens its Write channel
// only on the first write, so the number of intercepted requests tells whether analytics wrote.
const spyFirestore = async (page: Page) => {
  const requests: string[] = [];
  await page.route(/firestore\.googleapis\.com/, (r) => {
    requests.push(r.request().url());
    return r.abort();
  });
  return requests;
};

for (const [v, other, wiz] of [['a', 'b', wizardB], ['b', 'a', wizardA]] as const) {
  test(`?variant=${other} preview leaves saved session/progress alone and writes nothing (saved ${v})`, async ({ page }) => {
    const requests = await spyFirestore(page);
    await page.addInitScript(([s]) => {
      localStorage.setItem('companyx-wizard-session', 'real-session');
      localStorage.setItem('companyx-wizard', JSON.stringify({ index: 2, answers: {} }));
      localStorage.setItem('companyx-wizard-variant', s);
    }, [v]);
    await page.goto(`/?variant=${other}`);
    const main = page.getByTestId('wizard');
    await expect(main).toHaveAttribute('data-variant', other);
    await expect(main).toHaveAttribute('data-step', wiz.steps[0].id); // fresh, not the saved index
    const first = wiz.steps[0];
    for (const f of first.fields ?? []) await answer(page, f);
    if (!isAuto(first)) await page.getByTestId('next').click();
    await expect(main).toHaveAttribute('data-step', wiz.steps[1].id);

    const ls = await page.evaluate(() => ({
      s: localStorage.getItem('companyx-wizard-session'),
      p: localStorage.getItem('companyx-wizard'),
      v: localStorage.getItem('companyx-wizard-variant'),
    }));
    expect(ls).toEqual({ s: 'real-session', p: JSON.stringify({ index: 2, answers: {} }), v });
    await page.waitForTimeout(500); // give a (wrongly) opened write channel time to show up
    expect(requests).toHaveLength(0);
  });
}

// Walk to the first auto-advance step after the intro (so Back exists); returns its index.
async function reachAuto(page: Page, wiz: Wizard) {
  const idx = wiz.steps.findIndex((s, i) => i > 0 && isAuto(s));
  const main = page.getByTestId('wizard');
  for (const s of wiz.steps.slice(0, idx)) {
    await expect(main).toHaveAttribute('data-step', s.id);
    for (const f of s.fields ?? []) await answer(page, f);
    if (!isAuto(s)) await page.getByTestId('next').click();
  }
  await expect(main).toHaveAttribute('data-step', wiz.steps[idx].id);
  return idx;
}

// Clicks in one page task: Playwright's per-click actionability waits can exceed the 250ms
// auto-advance on a slow runner, which would make "immediately" and "quick" untrue.
const tap = (page: Page, ...ids: string[]) =>
  page.evaluate((ids) => ids.forEach((id) => document.querySelector<HTMLElement>(`[data-testid="${id}"]`)!.click()), ids);

for (const [v, wiz] of [['a', wizardA], ['b', wizardB]] as const) {
  test(`pick on an auto step then Back immediately stays on the previous step (variant ${v})`, async ({ page }) => {
    await spyFirestore(page);
    await page.goto(`/?variant=${v}`);
    const main = page.getByTestId('wizard');
    const idx = await reachAuto(page, wiz);
    const f = wiz.steps[idx].fields![0];
    if (f.type !== 'single') throw new Error('auto step starts with a single field');
    await tap(page, `option-${f.id}-${f.options[0].value}`, 'back');
    await expect(main).toHaveAttribute('data-step', wiz.steps[idx - 1].id);
    await page.waitForTimeout(600); // longer than the 250ms auto-advance: it must stay cancelled
    await expect(main).toHaveAttribute('data-step', wiz.steps[idx - 1].id);
  });

  test(`two quick taps on an auto step advance once with a single pending advance timer (variant ${v})`, async ({ page }) => {
    await spyFirestore(page);
    // Track pending 250ms timers (the auto-advance delay): a second tap must not add a second one.
    await page.addInitScript(() => {
      const pending = new Set<number>();
      const w = window as unknown as { __maxPending: number };
      w.__maxPending = 0;
      const set = window.setTimeout.bind(window);
      const clear = window.clearTimeout.bind(window);
      window.setTimeout = ((fn: () => void, ms?: number, ...a: unknown[]) => {
        if (ms !== 250) return set(fn, ms, ...a);
        const id = set(() => { pending.delete(id); fn(); }, ms, ...a);
        pending.add(id);
        w.__maxPending = Math.max(w.__maxPending, pending.size);
        return id;
      }) as typeof setTimeout;
      window.clearTimeout = ((id?: number) => { pending.delete(id as number); clear(id); }) as typeof clearTimeout;
    });
    await page.goto(`/?variant=${v}`);
    const main = page.getByTestId('wizard');
    const idx = await reachAuto(page, wiz);
    const f = wiz.steps[idx].fields![0];
    if (f.type !== 'single') throw new Error('auto step starts with a single field');
    // Re-tapping the same radio does nothing, so the second quick tap is a different option.
    await tap(page, `option-${f.id}-${f.options[0].value}`, `option-${f.id}-${f.options[1].value}`);
    await expect(main).toHaveAttribute('data-step', wiz.steps[idx + 1].id);
    await page.waitForTimeout(600);
    await expect(main).toHaveAttribute('data-step', wiz.steps[idx + 1].id);
    expect(await page.evaluate(() => (window as unknown as { __maxPending: number }).__maxPending)).toBe(1);
  });
}
