import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/registry'
import './globals.scss'

const SITE_URL = 'https://calc.uralmetstroy.ru'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Калькулятор веса металла и расхода краски онлайн — УралМетСтрой',
    template: '%s — УралМетСтрой',
  },
  description: 'Бесплатный онлайн калькулятор веса металлопроката и расхода краски. Трубы, листы, уголки, швеллеры, балки, круги. Сталь, алюминий, медь, бронза, титан и другие металлы.',
  keywords: ['калькулятор веса металла', 'калькулятор металлопроката', 'вес металла онлайн', 'калькулятор краски', 'расход краски онлайн', 'вес трубы калькулятор', 'вес листа металла', 'металлопрокат расчёт'],
  authors: [{ name: 'УралМетСтрой', url: 'https://uralmetstroy.ru' }],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Калькулятор металла — УралМетСтрой',
    url: SITE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
