import { focusRing } from '@/components/Section'
import { cvHref } from '@/components/SiteHeader'
import { useLang } from '@/lang'

const email = 'hellokasko@gmail.com'
const links = [
  { label: 'Telegram', href: 'https://t.me/whoisyurii' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yurii-kasko/' },
]
const currentYear = new Date().getFullYear()

export function SiteFooter() {
  const { t } = useLang()

  return (
    <footer id="contact" className="bg-ink px-5 pt-28 pb-10 text-white lg:px-10 lg:pt-40">
      <a
        href={`mailto:${email}`}
        data-reveal
        className={`${focusRing} block font-display text-[clamp(1.75rem,6.4vw,6.5rem)] leading-none font-semibold tracking-[-0.04em] break-all transition-colors duration-300 hover:text-accent-soft`}
      >
        {email}
      </a>
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-lg">
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={`${focusRing} link`}>
            {link.label}
          </a>
        ))}
        <a href={cvHref} download className={`${focusRing} link`}>
          {t.header.loadCV}
        </a>
      </div>
      <div className="mt-28 flex flex-col gap-2 border-t border-white/20 pt-6 text-sm text-white/60 lg:flex-row lg:justify-between">
        <p>{t.footer.rights.replace('{{year}}', String(currentYear))}</p>
        <p>{t.footer.builtWith}</p>
      </div>
    </footer>
  )
}
