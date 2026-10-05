import a from '@/data/wizard-a.json'
import b from '@/data/wizard-b.json'
import type { Wizard } from './types'

const KEY = 'companyx-wizard-variant'

type Variant = 'a' | 'b'
const isVariant = (v: string | null): v is Variant => v === 'a' || v === 'b'

const forced = new URLSearchParams(location.search).get('variant')
/** ?variant=a|b: a preview. Shows that variant but saves nothing (variant, progress, analytics session). */
export const preview = isVariant(forced)

function resolve(): Variant {
  if (isVariant(forced)) return forced
  // Once assigned, a customer keeps their variant.
  try {
    const saved = localStorage.getItem(KEY)
    if (isVariant(saved)) return saved
  } catch {
    /* no storage */
  }
  // ponytail: minute parity is a cheap pseudo-random split; swap for Math.random or server-side assignment if traffic patterns skew it.
  const v: Variant = new Date().getMinutes() % 2 ? 'b' : 'a'
  try {
    localStorage.setItem(KEY, v)
  } catch {
    /* no storage: variant lives for this page load only */
  }
  return v
}

export const variant: Variant = resolve()
export const config = (variant === 'a' ? a : b) as unknown as Wizard
