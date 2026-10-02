import { doc, getFirestore, increment, serverTimestamp, setDoc } from 'firebase/firestore'
import { app } from '@/lib/firebase'
import type { Answers } from './types'

// One Firestore doc per user: sessions/{sessionId}
// {
//   status: 'in_progress' | 'submitted', createdAt, updatedAt, submittedAt?, resumes, currentStep,
//   steps: { [stepId]: { visits, totalMs, lastStart, lastStop } },  // lastStart > lastStop (or no lastStop) = exited there
//   answers?  // written on submit
// }
const db = getFirestore(app)
const ID_KEY = 'velora-wizard-session'

let id: string | null = null
let current: { stepId: string; at: number } | null = null

function write(data: Record<string, unknown>) {
  if (!id) return
  setDoc(doc(db, 'sessions', id), { ...data, updatedAt: serverTimestamp() }, { merge: true }).catch((e) =>
    console.warn('[analytics]', e),
  )
}

function newSession() {
  id = crypto.randomUUID()
  try {
    localStorage.setItem(ID_KEY, id)
  } catch {
    /* no storage: session lives for this page load only */
  }
  write({ status: 'in_progress', createdAt: serverTimestamp(), resumes: 0, userAgent: navigator.userAgent })
}

/** Call once on load. Reuses the stored session when the user resumes mid-flow. */
export function begin(stepId: string, resumed: boolean) {
  if (id) return // already begun (StrictMode re-mount)
  try {
    id = localStorage.getItem(ID_KEY)
  } catch {
    id = null
  }
  if (id && resumed) write({ resumes: increment(1) })
  else newSession()
  start(stepId)
}

export function start(stepId: string) {
  current = { stepId, at: Date.now() }
  write({ currentStep: stepId, steps: { [stepId]: { visits: increment(1), lastStart: current.at } } })
}

/** No stop for a step = the user left the flow there. */
export function stop() {
  if (!current) return
  const now = Date.now()
  write({ steps: { [current.stepId]: { lastStop: now, totalMs: increment(now - current.at) } } })
  current = null
}

export function submit(answers: Answers) {
  write({ status: 'submitted', submittedAt: serverTimestamp(), answers })
}

/** Start over = new user doc. */
export function restart(stepId: string) {
  stop()
  newSession()
  start(stepId)
}
