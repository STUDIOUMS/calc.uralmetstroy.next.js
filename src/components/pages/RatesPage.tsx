'use client'
import { useEffect, useState, useCallback } from 'react'
import Header from '../Header'
import AppWrapper from '../AppWrapper'
import styled from 'styled-components'

interface Rate {
  code: string
  name: string
  nominal: number
  value: number
  previous: number
  change: number
}

interface RatesData {
  date: string
  rates: Rate[]
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap);
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: var(--color-white);
  border-radius: 10px;
  box-shadow: 0px 10px 30px 0px rgba(0,0,0,0.03);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

const CardLeft = styled.div``

const Code = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-black);
`

const Name = styled.div`
  font-size: 12px;
  color: var(--color-light);
  margin-top: 4px;
`

const Nominal = styled.div`
  font-size: 11px;
  color: var(--color-light);
  margin-top: 2px;
`

const CardRight = styled.div`
  text-align: right;
`

const Value = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--color-black);
`

const Change = styled.div<{ $positive: boolean; $zero: boolean }>`
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
  color: ${props => props.$zero ? 'var(--color-light)' : props.$positive ? '#22c55e' : '#ef4444'};
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--color-light);
  flex-wrap: wrap;
  gap: 8px;
`

const UpdateBtn = styled.button`
  background: none;
  border: 1px solid var(--color-line);
  border-radius: 20px;
  color: var(--color-light);
  cursor: pointer;
  font-family: var(--ff);
  font-size: 12px;
  padding: 4px 12px;
  transition: all 200ms;
  &:hover { border-color: var(--color-btn); color: var(--color-btn); }
`

const Spinner = styled.div`
  text-align: center;
  padding: 40px;
  color: var(--color-light);
  font-size: 14px;
`

const ErrorMsg = styled.div`
  text-align: center;
  padding: 40px;
  color: #ef4444;
  font-size: 14px;
`

const FLAG: Record<string, string> = {
  USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', CNY: '🇨🇳', JPY: '🇯🇵',
  CHF: '🇨🇭', TRY: '🇹🇷', KZT: '🇰🇿', BYN: '🇧🇾', AED: '🇦🇪',
  HKD: '🇭🇰', CAD: '🇨🇦', AUD: '🇦🇺', SEK: '🇸🇪', NOK: '🇳🇴',
}

export default function RatesPage() {
  const [data, setData] = useState<RatesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')
  const [countdown, setCountdown] = useState(60)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/rates')
      if (!res.ok) throw new Error()
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setData(json)
      setLastUpdate(new Date().toLocaleTimeString('ru-RU'))
      setCountdown(60)
    } catch {
      setError('Не удалось загрузить курсы валют. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { load(); return 60 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [load])

  const formatValue = (val: number) =>
    val.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 4 })

  const formatChange = (change: number) => {
    if (change === 0) return '—'
    return `${change > 0 ? '+' : ''}${change.toFixed(4)} ₽`
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    } catch { return '' }
  }

  return (
    <AppWrapper>
      <Header title="Курсы валют" />
      <div className="app-calc">
        <div className="appbox">
          <Meta>
            <span>
              {data ? `ЦБ РФ на ${formatDate(data.date)}` : 'Загрузка...'}
              {lastUpdate && ` · обновлено в ${lastUpdate}`}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{countdown}с</span>
              <UpdateBtn onClick={load} disabled={loading}>
                {loading ? 'Загрузка...' : 'Обновить'}
              </UpdateBtn>
            </div>
          </Meta>

          {loading && !data && <Spinner>Загрузка курсов...</Spinner>}
          {error && <ErrorMsg>{error}</ErrorMsg>}

          {data && (
            <Grid>
              {data.rates.map(rate => (
                <Card key={rate.code}>
                  <CardLeft>
                    <Code>{FLAG[rate.code] || ''} {rate.code}</Code>
                    <Name>{rate.name}</Name>
                    {rate.nominal > 1 && <Nominal>за {rate.nominal} {rate.code}</Nominal>}
                  </CardLeft>
                  <CardRight>
                    <Value>{formatValue(rate.value)} ₽</Value>
                    <Change $positive={rate.change >= 0} $zero={rate.change === 0}>
                      {formatChange(rate.change)}
                    </Change>
                  </CardRight>
                </Card>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </AppWrapper>
  )
}
