import { useEffect } from 'react'
import { CheckIcon } from 'lucide-react'
import { cn } from 'cn'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { Field as FieldDef, Note as NoteDef } from './types'

type Props = {
  field: FieldDef
  /** Accessible name: the field label, or the step title for single-field steps. */
  name: string
  value: string | string[] | undefined
  onChange: (value: string | string[]) => void
}

// Option card (44px). The real control (role=radio/checkbox) is stretched
// invisibly over the whole card so any tap hits it directly; text and check icon are plain siblings.
// Press feedback: a quick scale-down while held, so a pick registers before the auto-advance.
const card =
  'relative flex min-h-11 cursor-pointer items-center gap-3 rounded-xl bg-card px-3.5 py-1.5 text-base font-medium leading-[125%] text-pretty text-foreground select-none transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] has-focus-visible:outline-2 has-focus-visible:outline-ring'
// Soft plum-tinted lift instead of a flat white box.
const lifted = 'shadow-[0_1px_2px_rgba(117,26,75,0.06),0_8px_20px_-14px_rgba(117,26,75,0.3)]'
const mark = 'flex size-5 shrink-0 items-center justify-center border-[1.5px] border-foreground/45 transition-colors duration-300'
// Inset ring: the picked card keeps its size and stays inside the column.
const selected = 'bg-[#fcf1f7] font-semibold ring-2 ring-primary ring-inset'
const control = 'absolute inset-0 size-full rounded-xl opacity-0 after:hidden'
// Segmented control: one joined bar, the picked segment is filled.
const bar = `grid-flow-col auto-cols-fr gap-0 rounded-2xl bg-card p-1 ${lifted}`
const segment = 'justify-center rounded-xl bg-transparent px-2 text-center shadow-none'
const filled = 'bg-primary font-semibold text-primary-foreground ring-0'
const stepper = `flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-card text-xl leading-none font-medium text-foreground select-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-90 ${lifted}`
// ≥16px font so iOS doesn't zoom on focus; md:text-lg beats shadcn's md:text-sm.
const input = 'text-base'

export function Field({ field, name, value, onChange }: Props) {
  const list = Array.isArray(value) ? value : []
  const text = typeof value === 'string' ? value : ''
  const descId = field.description ? `${field.id}-desc` : undefined
  const layout = field.type === 'single' || field.type === 'multi' ? field.layout : undefined
  const segmented = layout === 'row'
  const def = field.type === 'slider' ? field.default : undefined
  // Slider: thumb sits at `start` until touched; −/+ nudge one step for an exact value.
  const num = field.type === 'slider' ? (text ? Number(text) : (field.start ?? field.min)) : 0
  const nudge = (by: number) => field.type === 'slider' && onChange(String(Math.min(field.max, Math.max(field.min, num + by * (field.step ?? 1)))))
  // Seed the default answer so the slider's shown value is the stored one.
  useEffect(() => {
    if (def !== undefined && value === undefined) onChange(String(def))
  }, [def, value, onChange])

  return (
    <fieldset data-testid={`field-${field.id}`} aria-describedby={descId} className={cn('min-w-0 space-y-2', !('half' in field && field.half) && 'col-span-2')}>
      {/* The label is the question: a real heading, not a form label. */}
      <legend className={cn('mb-1.5 font-heading text-[20px] leading-[1.2] font-bold tracking-[-0.3px] text-pretty', !field.label && 'sr-only')}>{name}</legend>
      {/* A list to read before answering sits on its own white card, like the customer's form. */}
      {Array.isArray(field.description) && (
        <ul id={descId} className={cn('list-disc space-y-1 rounded-xl bg-card py-3 pr-3.5 pl-8 text-sm leading-[1.35] text-foreground/80 marker:text-primary', lifted)}>
          {field.description.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
      {typeof field.description === 'string' && (
        <p id={descId} className="-mt-0.5 text-sm leading-normal text-foreground/75">
          {field.description}
        </p>
      )}

      {field.type === 'single' && (
        <RadioGroup value={text} onValueChange={(v) => onChange(String(v))} // "chips" = equal-width tiles: two side by side, otherwise three per row.
          className={cn('gap-1.5', segmented && bar, layout === 'grid' && 'auto-rows-fr grid-cols-2', layout === 'chips' && (field.options.length === 2 ? 'grid-cols-2 gap-2' : 'grid-cols-3 gap-2'))}
        >
          {field.options.map((o) => {
            const sel = text === o.value
            return (
              <label
                key={o.value}
                // Odd count in a grid: the last option takes the full row.
                className={cn(
                  card,
                  lifted,
                  sel && selected,
                  segmented && segment,
                  layout === 'grid' && 'gap-2 px-2.5 text-[15px] leading-snug last:odd:col-span-2',
                  layout === 'chips' && 'min-h-[52px] justify-center rounded-2xl px-2 text-center text-[15px] font-semibold',
                  (segmented || layout === 'chips') && sel && filled,
                )}
              >
                <RadioGroupItem data-testid={`option-${field.id}-${o.value}`} value={o.value} className={control} />
                {/* Cards always carry the radio mark, stacked or in a grid, so one screen never mixes two card styles. */}
                {(!layout || layout === 'grid') && (
                  <span className={cn(mark, 'rounded-full', sel && 'border-primary')} aria-hidden>
                    {sel && <span className="size-2 rounded-full bg-primary motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-150" />}
                  </span>
                )}
                <span className="flex-1">{o.label}</span>
              </label>
            )
          })}
        </RadioGroup>
      )}

      {field.type === 'yesno' && (
        <RadioGroup value={text} onValueChange={(v) => onChange(String(v))} className={bar}>
          {[
            ['yes', field.yesLabel ?? 'Ja'],
            ['no', field.noLabel ?? 'Nej'],
          ].map(([v, label]) => (
            <label key={v} className={cn(card, segment, text === v && filled)}>
              <RadioGroupItem data-testid={`option-${field.id}-${v}`} value={v} className={control} />
              {label}
            </label>
          ))}
        </RadioGroup>
      )}

      {field.type === 'slider' && (
        // The number is the hero: big value over the slider, or beside it when `compact`.
        <div className={cn(field.compact && 'flex items-center gap-2')}>
          <output className={cn('block font-heading font-bold text-primary tabular-nums', field.compact ? 'w-[76px] shrink-0 text-[22px]' : 'text-[40px] leading-none tracking-[-1px]')}>
            {text || '–'}
            <span className="ml-1 text-lg font-medium tracking-normal text-foreground/60">{field.unit}</span>
          </output>
          <div className={cn('flex min-w-0 flex-1 items-center gap-2', !field.compact && 'mt-1')}>
            <button type="button" aria-label="Minska" className={stepper} onClick={() => nudge(-1)}>
              −
            </button>
            <Slider
              data-testid={`slider-${field.id}`}
              aria-label={name}
              min={field.min}
              max={field.max}
              step={field.step ?? 1}
              value={num}
              onValueChange={(v) => onChange(String(Array.isArray(v) ? v[0] : v))}
              className={cn('min-w-0 flex-1', !text && '[&_[data-slot=slider-thumb]]:opacity-40')}
            />
            <button type="button" aria-label="Öka" className={stepper} onClick={() => nudge(1)}>
              +
            </button>
          </div>
        </div>
      )}

      {field.type === 'multi' && (
        <div className={cn('grid gap-1.5', layout === 'grid' && 'auto-rows-fr grid-cols-2')}>
          {field.options.map((o) => {
            const sel = list.includes(o.value)
            return (
              <label key={o.value} className={cn(card, lifted, sel && selected, layout === 'grid' && 'gap-2 px-2.5 text-[15px] leading-snug last:odd:col-span-2')}>
                <Checkbox
                  data-testid={`option-${field.id}-${o.value}`}
                  className={control}
                  checked={sel}
                  onCheckedChange={(checked) => onChange(checked ? [...list, o.value] : list.filter((v) => v !== o.value))}
                />
                <span className={cn(mark, 'rounded-[4px]', sel && 'border-primary bg-primary text-primary-foreground')} aria-hidden>
                  {sel && <CheckIcon className="size-3.5" />}
                </span>
                <span className="flex-1">{o.label}</span>
              </label>
            )
          })}
        </div>
      )}

      {field.type === 'number' && (
        <div className="relative">
          <Input
            data-testid={`input-${field.id}`}
            aria-label={name}
            aria-describedby={cn(descId, field.unit && `${field.id}-unit`) || undefined}
            type="number"
            inputMode="numeric"
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            value={text}
            onChange={(e) => onChange(e.target.value)}
            className={cn(input, field.unit && 'pr-14', '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none')}
          />
          {field.unit && (
            <span id={`${field.id}-unit`} className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground">
              {field.unit}
            </span>
          )}
        </div>
      )}
      {(field.type === 'number' || field.type === 'slider') && field.help && (
        <p className="flex items-center justify-between gap-3 text-[13px] leading-snug text-muted-foreground">
          <span>{field.help.text}</span>
          {/* ponytail: no action yet, the customer's target-weight helper is not built. */}
          <button type="button" className="min-h-11 shrink-0 text-sm font-semibold text-primary underline">
            {field.help.link}
          </button>
        </p>
      )}

      {field.type === 'text' && (
        <Input
          data-testid={`input-${field.id}`}
          aria-label={name}
          aria-describedby={descId}
          type={field.inputType ?? 'text'}
          inputMode={field.inputType}
          // ponytail: types.ts has no `name` inputType; the id doubles as the autocomplete token
          // (name/tel/email). Unknown tokens are ignored by browsers.
          autoComplete={field.inputType ?? field.id}
          placeholder={field.placeholder}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          className={input}
        />
      )}

      {field.note && (!field.noteWhen || text === field.noteWhen) && <Note note={field.note} className="rounded-lg bg-primary/10 px-3" />}
    </fieldset>
  )
}

/** Customer info-screen headline; "Läs mer" opens its full text in a bottom sheet (native details, tap outside to close). */
export function Note({ note, className }: { note: NoteDef; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between gap-3 text-sm leading-[1.3] font-semibold', className)}>
      <span className="py-1.5 text-balance">{note.title}</span>
      <details className="group shrink-0 font-normal">
        <summary className="flex min-h-11 cursor-pointer list-none items-center font-semibold whitespace-nowrap text-primary underline group-open:before:fixed group-open:before:inset-0 group-open:before:z-10 group-open:before:bg-black/40 [&::-webkit-details-marker]:hidden">
          Läs mer
        </summary>
        <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-h-[75dvh] max-w-md space-y-2.5 overflow-y-auto rounded-t-2xl bg-card px-5 pt-5 pb-7 text-[15px] leading-normal">
          <h2 className="text-xl leading-tight">{note.title}</h2>
          {note.more.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </details>
    </div>
  )
}
