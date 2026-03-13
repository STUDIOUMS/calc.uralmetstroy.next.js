import type { Metadata } from 'next'
import MetalCalc from '@/components/pages/MetalCalc'

export const metadata: Metadata = {
  title: 'Калькулятор веса металла онлайн',
  description: 'Рассчитайте вес металлопроката онлайн: трубы профильные и круглые, листы, уголки, швеллеры, балки, круги, квадраты, полосы, шестигранники. Сталь, алюминий, медь, бронза, титан и другие металлы. Быстро и точно.',
  alternates: { canonical: 'https://calc.uralmetstroy.ru' },
  openGraph: {
    title: 'Калькулятор веса металла онлайн — УралМетСтрой',
    description: 'Онлайн расчёт веса металлопроката для 10 форм и 13 видов металлов. Сотни марок стали, алюминия, меди, бронзы, титана.',
    url: 'https://calc.uralmetstroy.ru',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Калькулятор веса металла онлайн',
  url: 'https://calc.uralmetstroy.ru',
  description: 'Бесплатный онлайн калькулятор для расчёта веса металлопроката: трубы, листы, уголки, швеллеры, балки, круги, квадраты, полосы, шестигранники.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB' },
  provider: {
    '@type': 'Organization',
    name: 'УралМетСтрой',
    url: 'https://uralmetstroy.ru',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MetalCalc />
    </>
  )
}
