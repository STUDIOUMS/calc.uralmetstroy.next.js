import type { Metadata } from 'next'
import MetalPricesPage from '@/components/pages/MetalPricesPage'

export const metadata: Metadata = {
  title: 'Цены на металл в Екатеринбурге',
  description: 'Актуальные цены на металлопрокат в Екатеринбурге: арматура, уголок, швеллер, балка, круг, лист, трубы. Цены обновляются автоматически по данным металлоторговых компаний.',
  alternates: { canonical: 'https://calc.uralmetstroy.ru/prices' },
  openGraph: {
    title: 'Цены на металлопрокат в Екатеринбурге — УралМетСтрой',
    description: 'Актуальные рыночные цены на сортовой и листовой металлопрокат, трубы. Обновляются ежедневно.',
    url: 'https://calc.uralmetstroy.ru/prices',
  },
}

export default function PricesPage() {
  return <MetalPricesPage />
}
