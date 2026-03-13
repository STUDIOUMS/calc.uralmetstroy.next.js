import type { Metadata } from 'next'
import RatesPage from '@/components/pages/RatesPage'

export const metadata: Metadata = {
  title: 'Курсы валют ЦБ РФ онлайн',
  description: 'Актуальные курсы валют Центрального Банка России: доллар, евро, юань, фунт, иена и другие. Обновляются ежедневно.',
  alternates: { canonical: 'https://calc.uralmetstroy.ru/rates' },
}

export default function Page() {
  return <RatesPage />
}
