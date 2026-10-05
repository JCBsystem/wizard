import a from '@/data/wizard-a.json'
import b from '@/data/wizard-b.json'
import type { Wizard } from './types'

const KEY = 'velora-wizard-variant'

function resolve(): 'a' | 'b' {
  let v = new URLSearchParams(location.search).get('variant') as 'a' | 'b' | null
  if (v !== 'a' && v !== 'b') {
    try {
      v = localStorage.getItem(KEY) as 'a' | 'b' | null
    } catch {
      v = null
    }
  }
  // ponytail: minute parity is a cheap pseudo-random split; swap for Math.random or server-side assignment if traffic patterns skew it.
  if (v !== 'a' && v !== 'b') v = new Date().getMinutes() % 2 ? 'b' : 'a'
  try {
    localStorage.setItem(KEY, v)
  } catch {
    /* no storage: variant lives for this page load only */
  }
  return v as 'a' | 'b'
}

export const variant: 'a' | 'b' = resolve()
export const config = (variant === 'a' ? a : b) as unknown as Wizard
