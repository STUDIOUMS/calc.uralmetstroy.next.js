import type { Metadata } from 'next'
import PaintCalc from '@/components/pages/PaintCalc'

export const metadata: Metadata = {
  title: 'Калькулятор расхода краски онлайн',
  description: 'Рассчитайте расход краски для металлических изделий онлайн: трубы, листы, уголки, швеллеры и другие профили. Учёт толщины покрытия, количества слоёв, двусторонней покраски. Стоимость материала.',
  alternates: { canonical: 'https://calc.uralmetstroy.ru/paint' },
  openGraph: {
    title: 'Калькулятор расхода краски по металлу — УралМетСтрой',
    description: 'Онлайн расчёт расхода краски для металлопроката с учётом толщины покрытия, слоёв и эффективности. Стоимость покраски.',
    url: 'https://calc.uralmetstroy.ru/paint',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Калькулятор расхода краски по металлу',
  url: 'https://calc.uralmetstroy.ru/paint',
  description: 'Онлайн калькулятор расхода краски для металлопроката. Рассчитывает потребность в краске, укрываемость, стоимость покрытия.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB' },
  provider: {
    '@type': 'Organization',
    name: 'УралМетСтрой',
    url: 'https://uralmetstroy.ru',
  },
}

export default function PaintPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PaintCalc />
    </>
  )
}
