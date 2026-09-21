import { Row } from '@/components/Section'
import { useLang } from '@/lang'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  const { t } = useLang()

  return (
    <footer>
      <Row className="border-b border-rule text-sm text-ink-faint">
        <p className="col-span-4 px-5 py-6 lg:col-span-4">{t.footer.rights.replace('{{year}}', String(currentYear))}</p>
        <p className="col-span-4 px-5 pb-6 lg:col-span-8 lg:border-l lg:border-rule lg:py-6">{t.footer.builtWith}</p>
      </Row>
    </footer>
  )
}
