import { useLang } from '@/lang'

export function Statement() {
  const { t } = useLang()

  return (
    <section className="px-5 py-24 lg:px-10 lg:py-32">
      <p className="max-w-[18ch] font-display text-[clamp(2.25rem,6.5vw,6.5rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
        {t.hero.experience.split(' ').map((word, i) => (
          <span key={i} className="scrub-word">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
