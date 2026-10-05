import a from '@/data/wizard-a.json'
import b from '@/data/wizard-b.json'
import type { Wizard } from './types'

const KEY = 'velora-wizard-variant'

type Variant = 'a' | 'b'
const isVariant = (v: string | null): v is Variant => v === 'a' || v === 'b'

function resolve(): Variant {
  // Manual testing: ?variant=a|b shows that variant but never saves it, so a customer's variant is untouched.
  const forced = new URLSearchParams(location.search).get('variant')
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
