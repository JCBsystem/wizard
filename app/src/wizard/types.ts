export type Option = { value: string; label: string }

/** A customer info-screen headline; `more` is its full original text, opened with "Läs mer". */
export type Note = { title: string; more: string[] }

/** `label` is the question heading. `description` as a list renders as bullets. `noteWhen` = show the note only for that answer. */
type FieldBase = { id: string; label?: string; description?: string | string[]; note?: Note; noteWhen?: string }

export type Field =
  /** layout "row" = compact horizontal segmented row (≤4 short options), "grid" = 2 columns, "chips" = wrapping; default stacked cards. */
  | (FieldBase & { type: 'single'; options: Option[]; layout?: 'row' | 'grid' | 'chips' })
  | (FieldBase & { type: 'multi'; options: Option[]; layout?: 'grid' })
  /** Stores 'yes' | 'no'. */
  | (FieldBase & { type: 'yesno'; yesLabel?: string; noLabel?: string })
  /** Stores the number as a string. `default` pre-fills the answer; without it the slider is unanswered until touched and the thumb waits at `start`. */
  | (FieldBase & { type: 'slider'; unit: string; min: number; max: number; step?: number; default?: number; start?: number; compact?: boolean; help?: { text: string; link: string } })
  /** No `unit` when the placeholder carries it. `half` = shares a row with the next half field. `help` = line + link under the input. */
  | (FieldBase & { type: 'number'; unit?: string; min: number; max: number; placeholder?: string; half?: boolean; help?: { text: string; link: string } })
  | (FieldBase & { type: 'text'; inputType?: 'text' | 'tel' | 'email'; placeholder?: string })

export type Step = {
  id: string
  /** Omitted = question step. */
  type?: 'intro' | 'result' | 'booking' | 'confirmation'
  /** Omitted on packed steps: each field's label is the question. */
  title?: string
  /** Small label above the title on the start screen ("2 minuter · Kostnadsfritt"). */
  kicker?: string
  /** Progress section this screen belongs to ("Mål", "Om dig"…); consecutive screens share one segment. */
  section?: string
  description?: string
  helpText?: string
  /** Answers played back as a small card; `value` takes {{placeholders}}. */
  summary?: { label: string; value: string }[]
  /** The clinician they will meet (booking). */
  person?: { name: string; role: string }
  /** Numbered "what happens next" list (start, result, confirmation). */
  bullets?: (string | Note)[]
  /** Shown after the fields. */
  notes?: Note[]
  /** Next-button label override. */
  cta?: string
  fields?: Field[]
}

export type Wizard = {
  ui: { next: string; back: string; almostDone: string; restart: string }
  steps: Step[]
}

export type Answers = Record<string, string | string[]>
