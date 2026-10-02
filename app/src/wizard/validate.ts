import type { Field as FieldDef } from './types'

export function isValid(f: FieldDef, v: string | string[] | undefined) {
  if (f.type === 'multi') return Array.isArray(v) && v.length > 0
  if (typeof v !== 'string' || !v.trim()) return false
  if (f.type === 'yesno') return v === 'yes' || v === 'no'
  if (f.type === 'number' || f.type === 'slider') return Number(v) >= f.min && Number(v) <= f.max
  if (f.type === 'text' && f.inputType === 'email') return /^\S+@\S+\.\S+$/.test(v)
  return true
}
