import type { ReactNode } from 'react'

export const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flare'

// A 4-column row on phones, 12 on desktop, aligned to the page grid lines.
export function Row({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`grid grid-cols-4 border-t border-rule lg:grid-cols-12 ${className}`}>{children}</div>
}

export function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-14 px-5 pt-14 pb-6 font-display text-3xl font-bold tracking-tight lg:pt-20 lg:text-4xl"
    >
      {children}
    </h2>
  )
}
