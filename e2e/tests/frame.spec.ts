import path from 'node:path';
import { test, expect } from '@playwright/test';
import { wizard, blockFirestore, answer, isAuto } from './walk';

test.setTimeout(90_000);

test('mobile frame holds on every step', async ({ page }, testInfo) => {
  const project = testInfo.project.name.replace(/ /g, '-');
  const viewport = page.viewportSize()!;
  await blockFirestore(page);
  await page.goto('/?variant=a');
  const main = page.getByTestId('wizard');

  for (const [i, step] of wizard.steps.entries()) {
    await expect(main).toHaveAttribute('data-step', step.id);
    // The app scrolls to top in an effect; force it so measurements aren't racing it.
    await page.evaluate(() => window.scrollTo(0, 0));
    // Let the step's enter animation settle so transforms don't skew overflow numbers or screenshots.
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))));

    const scroll = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, inner: window.innerWidth }));
    expect.soft(scroll.w, `[${step.id}] horizontal scroll: scrollWidth ${scroll.w} > innerWidth ${scroll.inner}`).toBeLessThanOrEqual(scroll.inner);

    // One question per screen: nothing may scroll vertically, neither the page nor the content area.
    const v = await page.evaluate(() => {
      const d = document.documentElement;
      const m = document.querySelector('[data-testid=wizard]');
      return {
        doc: { scrollHeight: d.scrollHeight, innerHeight: window.innerHeight },
        main: m ? { scrollHeight: m.scrollHeight, clientHeight: m.clientHeight } : null,
      };
    });
    const docOverflow = v.doc.scrollHeight - v.doc.innerHeight;
    expect.soft(docOverflow, `[${step.id}] page overflows by ${docOverflow}px (scrollHeight ${v.doc.scrollHeight} > innerHeight ${v.doc.innerHeight})`).toBeLessThanOrEqual(0);
    if (v.main) {
      const mainOverflow = v.main.scrollHeight - v.main.clientHeight;
      expect.soft(mainOverflow, `[${step.id}] main overflows by ${mainOverflow}px (scrollHeight ${v.main.scrollHeight} > clientHeight ${v.main.clientHeight})`).toBeLessThanOrEqual(0);
    }

    // Steps with only single-choice fields auto-advance on pick and may render no CTA.
    const autoAdvance = isAuto(step);
    const ctaName = step.type === 'confirmation' ? 'restart' : 'next';
    const cta = page.getByTestId(ctaName);
    const hasCta = (await cta.count()) > 0;
    expect.soft(hasCta || autoAdvance, `[${step.id}] CTA "${ctaName}" missing`).toBe(true);
    if (hasCta) {
      const box = await cta.boundingBox();
      expect.soft(box, `[${step.id}] CTA "${ctaName}" not visible`).not.toBeNull();
      if (box) {
        const bottom = Math.round(box.y + box.height);
        expect.soft(bottom, `[${step.id}] CTA bottom ${bottom} > viewport ${viewport.height}`).toBeLessThanOrEqual(viewport.height);
      }
    }

    const small = await page.evaluate(() => {
      const sel = 'button:not([role=radio]):not([role=checkbox]), [role=radio], [role=checkbox], input';
      return [...document.querySelectorAll<HTMLElement>(sel)]
        .filter((el) => el.getClientRects().length > 0 && el.getAttribute('aria-hidden') !== 'true')
        .map((el) => {
          // Radio/checkbox (Radix buttons or native inputs) are tapped via their card label.
          const role = el.getAttribute('role') ?? (el as HTMLInputElement).type;
          const toggle = role === 'radio' || role === 'checkbox';
          // A slider's native range input is hidden inside the thumb; the tap target is the slider control.
          const target = toggle ? el.closest('label') : role === 'range' ? el.closest('[data-slot=slider]') : null;
          const box = (target ?? el).getBoundingClientRect();
          const name = (el.getAttribute('aria-label') ?? el.closest('label')?.textContent ?? el.textContent ?? '').trim().slice(0, 40);
          return `${el.tagName.toLowerCase()}[${role}] "${name}" ${Math.round(box.height)}px`;
        })
        .filter((t) => Number(t.match(/(\d+)px$/)![1]) < 44);
    });
    expect.soft(small, `[${step.id}] tap targets under 44px`).toEqual([]);

    const smallFont = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLInputElement>('input:not([type=radio]):not([type=checkbox]):not([aria-hidden=true])')]
        .filter((el) => el.getClientRects().length > 0)
        .map((el) => `${el.getAttribute('aria-label') ?? el.name ?? el.type} ${parseFloat(getComputedStyle(el).fontSize)}px`)
        .filter((t) => parseFloat(t.match(/([\d.]+)px$/)![1]) < 16),
    );
    expect.soft(smallFont, `[${step.id}] inputs with font-size under 16px`).toEqual([]);

    const nn = String(i + 1).padStart(2, '0');
    await page.screenshot({ path: path.resolve(__dirname, '../screenshots/frame', `${project}-${nn}-${step.id}.png`) });

    for (const f of step.fields ?? []) await answer(page, f);
    if (step.type === 'confirmation') break;
    // Auto-advance steps move on by themselves; the next iteration's data-step wait covers it.
    if (hasCta) await cta.click();
  }

  await expect(main).toHaveAttribute('data-step', wizard.steps.at(-1)!.id);
});
