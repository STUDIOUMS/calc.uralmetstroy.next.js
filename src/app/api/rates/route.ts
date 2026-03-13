import { NextResponse } from 'next/server'

export const revalidate = 0

const MAIN_CURRENCIES = ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'CHF', 'TRY', 'KZT', 'BYN', 'AED', 'HKD', 'CAD', 'AUD', 'SEK', 'NOK']

export async function GET() {
  try {
    const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
      next: { revalidate: 0 },
      headers: { 'Accept': 'application/json' },
    })

    if (!res.ok) throw new Error('CBR API error')

    const data = await res.json()

    const rates = MAIN_CURRENCIES
      .filter(code => data.Valute[code])
      .map(code => {
        const v = data.Valute[code]
        const change = v.Value - v.Previous
        return {
          code: v.CharCode,
          name: v.Name,
          nominal: v.Nominal,
          value: v.Value,
          previous: v.Previous,
          change: +change.toFixed(4),
        }
      })

    return NextResponse.json({
      date: data.Date,
      rates,
    })
  } catch {
    return NextResponse.json({ error: 'Не удалось загрузить курсы' }, { status: 500 })
  }
}
