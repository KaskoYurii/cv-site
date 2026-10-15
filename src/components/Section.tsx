import type { ReactNode } from 'react'

export const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

export function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      data-reveal
      className="scroll-mt-24 font-display text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.9] font-bold tracking-[-0.04em] uppercase"
    >
      {children}
    </h2>
  )
}
