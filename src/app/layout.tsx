import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/registry'
import './globals.scss'

const SITE_URL = 'https://calc.uralmetstroy.ru'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Калькулятор веса металла онлайн и расхода краски — УралМетСтрой',
    template: '%s — УралМетСтрой',
  },
  description: 'Бесплатный онлайн калькулятор веса металлопроката и расхода краски. Трубы, листы, уголки, швеллеры, балки, круги. Сталь, алюминий, медь, бронза, титан и другие металлы.',
  keywords: ['калькулятор веса металла онлайн', 'калькулятор металлопроката', 'вес металла онлайн', 'калькулятор краски', 'расход краски онлайн', 'вес трубы калькулятор', 'вес листа металла', 'металлопрокат расчёт'],
  authors: [{ name: 'УралМетСтрой', url: 'https://uralmetstroy.ru' }],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  manifest: '/manifest.json',
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
      <head>
        <meta name="theme-color" content="#1B53BC" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Калькулятор металла" />
        <link rel="apple-touch-icon" href="/assets/icons/icon-192x192.png" />
      </head>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
