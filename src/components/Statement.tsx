import { useLang } from '@/lang'

export function Statement() {
  const { t } = useLang()

  return (
    <section className="px-5 py-32 lg:px-10 lg:py-48">
      <p className="max-w-[22ch] text-[clamp(2rem,5.2vw,4.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
        {t.hero.experience.split(' ').map((word, i) => (
          <span key={i} className="scrub-word">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
