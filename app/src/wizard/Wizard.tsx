import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import data from '@/data/wizard.json'
import { Field, Note } from './Field'
import { isValid } from './validate'
import * as analytics from './analytics'
import type { Answers, Field as FieldDef, Wizard as WizardDef } from './types'

const { steps, ui } = data as unknown as WizardDef
const fields = steps.flatMap((s) => s.fields ?? [])
// Where each section ends, as a position on the front-loaded progress bar.
const marks = steps.flatMap((s, i) => (i > 1 && s.section !== steps[i - 1].section ? [Math.sqrt(i / (steps.length - 1)) * 100] : []))
const STORAGE_KEY = 'velora-wizard'

// Shared surfaces. `shell` + `core` = a card sitting in a tinted tray (concentric radii), used for the
// few hero blocks only: start steps, answer summary, clinician.
const shadow = 'shadow-[0_1px_2px_rgba(117,26,75,0.06),0_10px_24px_-14px_rgba(117,26,75,0.25)]'
const pill = `rounded-full bg-card px-2.5 py-1 text-[11px] font-bold text-primary ${shadow}`
const shell = 'rounded-[1.375rem] bg-primary/[0.07] p-1.5 ring-1 ring-primary/10'
const core = 'rounded-2xl bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]'
const lift = 'shadow-[0_12px_24px_-12px_rgba(167,30,103,0.7)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]'

type State = { index: number; answers: Answers }

function load(): State {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '')
    // Clamp: steps may have been removed from the JSON since this was saved.
    return { index: Math.min(saved.index ?? 0, steps.length - 1), answers: saved.answers ?? {} }
  } catch {
    return { index: 0, answers: {} }
  }
}

// Values for {{placeholders}} in step copy: option labels per field id, plus BMI.
// ponytail: `bmi` is the only derived value and reads the hard-coded ids `weight`/`height`;
// declare derived values in the JSON if more are needed.
function templateVars(answers: Answers) {
  const vars: Record<string, string> = {}
  for (const f of fields) {
    const v = answers[f.id]
    if (v === undefined) continue
    const picked = Array.isArray(v) ? v : [v]
    vars[f.id] = ('options' in f ? f.options.filter((o) => picked.includes(o.value)).map((o) => o.label) : picked).join(', ')
  }
  const kg = Number(answers.weight)
  const m = Number(answers.height) / 100
  if (kg && m) vars.bmi = String(Math.round(kg / (m * m)))
  // ponytail: second hard-coded derived value, the amount inside the `goal` label ("1-10kg") for the customer's result headline.
  const goalKg = vars.goal?.match(/^Förlora (.+) för gott$/)?.[1]
  if (goalKg) vars.goalKg = goalKg
  return vars
}

export function Wizard() {
  const [state, setState] = useState(load)
  // True between a tap on an auto-advancing step and the step change, so the CTA never flashes in.
  const [advancing, setAdvancing] = useState(false)
  const { index, answers } = state
  const step = steps[index]
  const last = steps.length - 1
  const intro = step.type === 'intro'
  const done = step.type === 'confirmation'
  // Only single-choice fields: the last pick advances by itself, no CTA needed.
  // A field with a note keeps the CTA, so the note can be read before moving on.
  const auto = !!step.fields?.length && step.fields.every((f) => f.type === 'single' && !f.note)

  // Latest answers for the delayed auto-advance, which closes over an older render.
  const answersRef = useRef(answers)
  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  useEffect(() => {
    analytics.begin(step.id, index > 0) // once: resumed = came back mid-flow
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* private mode / quota: progress just isn't kept */
    }
  }, [state])

  const vars = templateVars(answers)
  const fill = (text: string) => text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '')
  // A note whose headline needs an answer that isn't there (goal undecided) is left out.
  const known = (text: string) => [...text.matchAll(/\{\{(\w+)\}\}/g)].every(([, key]) => key in vars)
  const validWith = (a: Answers) => (step.fields ?? []).every((f) => isValid(f, a[f.id]))
  const valid = validWith(answers)
  // Front-loaded: the first question already reads ~23 %, then it slows down.
  const pct = Math.round(Math.sqrt(index / last) * 100)
  // Step change as a view transition (CSS in index.css): content slides in the travel direction
  // (--dir on <html>), the rest crossfades. Browsers without the API just switch.
  const swap = (to: number, update: () => void) => {
    document.documentElement.style.setProperty('--dir', to < index ? '-1' : '1')
    if (document.startViewTransition) document.startViewTransition(() => flushSync(update))
    else update()
  }
  const go = (to: number) => {
    analytics.stop()
    if (steps[to].type === 'confirmation') analytics.submit(answersRef.current)
    analytics.start(steps[to].id)
    swap(to, () => {
      setAdvancing(false)
      setState((s) => ({ ...s, index: to }))
    })
  }
  const answer = (f: FieldDef, v: string | string[]) => {
    const next = { ...answers, [f.id]: v }
    setState((s) => ({ ...s, answers: { ...s.answers, [f.id]: v } }))
    if (auto && validWith(next)) {
      setAdvancing(true)
      window.setTimeout(() => go(index + 1), 250) // let the selected state show first
    }
  }
  // Auto steps only get a CTA when revisited with an answer already in place (after Back).
  const showCta = !auto || (valid && !advancing)

  // Shell: fixed-height column (no page scroll) — top bar / content / action bar.
  // The top bar keeps its 48px on the intro too, so content starts at the same y on every step;
  // the footer only exists with a CTA (auto steps need the height) — the transition hides that reflow.
  return (
    <main
      data-step={step.id}
      // Soft light from the top, so the page has depth instead of one flat pink.
      className="mx-auto flex h-dvh w-full max-w-md flex-col bg-[radial-gradient(120%_46%_at_50%_0%,rgba(255,255,255,0.8),transparent_72%)] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:border-x"
    >
      <header className="flex h-12 shrink-0 items-center gap-3 px-4">
        {intro ? (
          <span className="font-serif text-[26px] leading-none tracking-[-0.03em]">velora</span>
        ) : (
          <>
            {index > 0 && !done && (
              <Button variant="ghost" className="-ml-3 size-11 shrink-0 text-foreground [&_svg]:size-[18px] [&_svg]:stroke-2" aria-label={ui.back} onClick={() => go(index - 1)}>
                <ArrowLeft />
              </Button>
            )}
            {/* Front-loaded fill (notes.md): moves fast early, no number, no "x of N".
                A recessed groove with a glossy plum fill; light notches show where a section ends. */}
            <div className="flex-1" role="progressbar" aria-label="Förlopp" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
              <span className="relative block h-2.5 overflow-hidden rounded-full bg-primary/12 shadow-[inset_0_1px_2px_rgba(117,26,75,0.22)]">
                <span
                  className="absolute inset-0 rounded-full bg-linear-to-r from-[#751a4b] to-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
                  style={{ transform: `translateX(${pct - 100}%)` }}
                />
                {marks.map((m) => (
                  <span key={m} className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-background" style={{ left: `${m}%` }} />
                ))}
              </span>
              <p className="mt-1.5 text-xs leading-none font-medium text-foreground/70">{step.section ?? (done ? '' : ui.almostDone)}</p>
            </div>
          </>
        )}
      </header>

      <div className={`flex min-h-0 flex-1 flex-col gap-[18px] overflow-y-auto px-4 pb-1 [view-transition-name:step] ${intro ? 'pt-7' : 'pt-2'}`}>
        {step.kicker && <p className={`${pill} -mb-1 w-fit tracking-[0.12em] uppercase`}>{step.kicker}</p>}

        {step.title && (
          <header className="space-y-1.5">
            <h1 className={`font-bold text-balance ${intro ? 'text-[32px] leading-[1.1] tracking-[-0.9px]' : ''}`}>{fill(step.title)}</h1>
            {step.description && <p className="text-[15px] leading-relaxed text-foreground/75 text-pretty">{fill(step.description)}</p>}
          </header>
        )}

        {/* Their own answers, played back. */}
        {step.summary && (
          <dl className={`${shell} grid grid-cols-[1fr_auto] gap-0.5`}>
            {step.summary.map((s, i) => (
              <div key={s.label} className={`${core} px-4 py-2.5 ${i ? 'rounded-l-md' : 'rounded-r-md'}`}>
                <dt className="text-xs font-medium text-foreground/70">{s.label}</dt>
                <dd className="font-heading text-lg leading-tight font-bold">{fill(s.value) || '–'}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Who they will meet. */}
        {step.person && (
          <div className={shell}>
            <div className={`${core} flex items-center gap-3 p-3`}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary font-heading text-lg font-bold text-primary-foreground" aria-hidden>
                {step.person.name.split(' ').map((w) => w[0]).join('')}
              </span>
              <div>
                <p className="font-heading text-lg leading-tight font-bold">{step.person.name}</p>
                <p className="text-sm text-foreground/75">{step.person.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Two columns so `half` fields share a row; every other field spans both. */}
        {step.fields && (
          <div className="grid grid-cols-2 items-end gap-x-2.5 gap-y-[18px]">
            {step.fields.map((f) => (
              <Field
                key={f.id}
                field={f}
                name={fill(f.label ?? ('placeholder' in f ? f.placeholder : undefined) ?? step.title ?? '')}
                value={answers[f.id]}
                onChange={(v) => answer(f, v)}
              />
            ))}
          </div>
        )}

        {step.notes && (
          // The customer's proof points, as one plum card: the only dark surface on a screen.
          <div className={`divide-y divide-primary-foreground/20 rounded-2xl bg-primary px-4 text-primary-foreground empty:hidden [&_summary]:text-primary-foreground ${shadow}`}>
            {step.notes.filter((n) => known(n.title)).map((n) => (
              <Note key={n.title} note={{ ...n, title: fill(n.title) }} />
            ))}
          </div>
        )}

        {step.bullets && (
          <div className={intro ? shell : undefined}>
            <ol className={intro ? `${core} space-y-3.5 p-4` : 'space-y-2.5'}>
              {step.bullets.map((b, i) => (
                <li key={typeof b === 'string' ? b : b.title} className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary tabular-nums" aria-hidden>
                    {i + 1}
                  </span>
                  {typeof b === 'string' ? <span className="text-pretty">{fill(b)}</span> : <Note note={b} className="-my-2.5 flex-1 text-base" />}
                </li>
              ))}
            </ol>
          </div>
        )}

        {step.helpText && <p className={`${step.type ? 'mt-auto' : '-mt-2.5'} text-sm text-foreground/80 text-pretty`}>{step.helpText}</p>}
      </div>

      {showCta && (
        <footer className="shrink-0 space-y-2 px-4 py-3">
          {done ? (
            <Button variant="link" className="h-11 w-full text-sm font-semibold" onClick={() => {
              analytics.restart(steps[0].id)
              swap(0, () => setState({ index: 0, answers: {} }))
            }}>
              {ui.restart}
            </Button>
          ) : (
            // Arrow in its own circle, flush right; the label stays optically centred.
            <Button className={`group w-full justify-between pr-2 pl-12 ${lift}`} disabled={!valid} onClick={() => go(index + 1)}>
              <span className="flex-1 text-center">{step.cta ?? ui.next}</span>
              <span className="flex size-10 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5" aria-hidden>
                <ArrowRight className="size-[18px]" strokeWidth={2} />
              </span>
            </Button>
          )}
        </footer>
      )}
    </main>
  )
}
