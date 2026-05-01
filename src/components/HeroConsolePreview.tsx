const consoleLines = [
  { prompt: 'create', value: 'interfaces that feel clear and reliable' },
  { prompt: 'connect', value: 'frontend, integrations, and backend workflows' },
  { prompt: 'ship', value: 'production-ready features with clean structure' },
]

export function HeroConsolePreview() {
  return (
    <aside
      className="relative mb-16 animate-[hero-fade_700ms_ease-out_460ms_both] lg:mb-0"
      aria-label="Animated development focus preview"
    >
      <div className="absolute -inset-6 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/70 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-400" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-amber-300" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="ml-3 text-xs text-slate-500">frontend.log</span>
        </div>

        <div className="space-y-5 px-5 py-6">
          {consoleLines.map((line, index) => (
            <div
              key={line.prompt}
              className="console-line flex min-w-0 items-start gap-3 text-sm"
              style={{ animationDelay: `${560 + index * 260}ms` }}
            >
              <span className="select-none text-orange-400">&gt;</span>
              <p className="min-w-0 leading-6 text-slate-300">
                <span className="font-semibold text-white">{line.prompt}</span>{' '}
                <span>{line.value}</span>
              </p>
            </div>
          ))}

          <div className="console-cursor flex items-center gap-3 pt-1 text-sm text-slate-500">
            <span className="select-none text-orange-400">&gt;</span>
            <span className="h-5 w-2 rounded-sm bg-orange-400" />
          </div>
        </div>
      </div>
    </aside>
  )
}
