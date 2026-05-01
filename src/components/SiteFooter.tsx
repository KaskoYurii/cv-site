const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-sm text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} Yurii Kasko. All rights reserved.</p>
        <p className="text-slate-600">Built with React, TypeScript, and Tailwind CSS.</p>
      </div>
    </footer>
  )
}

