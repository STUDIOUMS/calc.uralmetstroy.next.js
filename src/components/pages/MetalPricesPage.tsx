'use client'
import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar/Sidebar'

interface PriceItem {
  slug: string
  name: string
  group: string
  minPrice: number | null
  maxPrice: number | null
  unit: string
  url: string
  error?: boolean
}

interface PricesData {
  updatedAt: string
  source: string
  region: string
  items: PriceItem[]
}

const Page = styled.div`display: flex; min-height: 100vh;`
const Main = styled.main`
  flex: 1; padding: 20px; max-width: 900px; margin: 0 auto; width: 100%;
`
const GroupTitle = styled.h2`
  color: var(--color-text); font-size: 16px; font-weight: 600;
  margin: 24px 0 12px; padding-bottom: 8px;
  border-bottom: 2px solid var(--color-accent);
`
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;
`
const Card = styled.a`
  background: var(--color-bg2); border: 1px solid var(--color-line);
  border-radius: 8px; padding: 14px 16px; text-decoration: none;
  display: block; transition: all 150ms ease;
  &:hover { border-color: var(--color-accent); background: var(--color-hover); }
`
const CardName = styled.div`
  color: var(--color-text); font-size: 13px; font-weight: 500; margin-bottom: 8px;
  line-height: 1.4;
`
const PriceRow = styled.div`display: flex; align-items: baseline; gap: 6px;`
const MinPrice = styled.span`
  color: var(--color-accent); font-size: 18px; font-weight: 700;
`
const MaxPrice = styled.span`color: var(--color-text2); font-size: 13px;`
const Unit = styled.span`color: var(--color-text2); font-size: 12px;`
const FromLabel = styled.span`color: var(--color-text2); font-size: 12px;`
const NoPrice = styled.div`color: var(--color-text2); font-size: 13px; font-style: italic;`

const Meta = styled.div`
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  margin-bottom: 20px; font-size: 12px; color: var(--color-text2);
`
const UpdatedAt = styled.span``
const SourceLink = styled.a`
  color: var(--color-accent); text-decoration: none;
  &:hover { text-decoration: underline; }
`
const RefreshBtn = styled.button`
  background: none; border: 1px solid var(--color-line); border-radius: 4px;
  color: var(--color-text2); font-size: 12px; padding: 3px 10px; cursor: pointer;
  transition: all 150ms ease;
  &:hover { border-color: var(--color-accent); color: var(--color-accent); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`
const ErrorMsg = styled.div`
  color: var(--color-text2); text-align: center; padding: 40px;
  font-size: 14px;
`
const Disclaimer = styled.div`
  margin-top: 24px; padding: 12px 16px;
  background: var(--color-bg2); border: 1px solid var(--color-line);
  border-radius: 8px; font-size: 12px; color: var(--color-text2); line-height: 1.6;
`

function formatPrice(n: number): string {
  return n.toLocaleString('ru-RU')
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch { return iso }
}

export default function MetalPricesPage() {
  const [data, setData] = useState<PricesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchPrices = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/prices', { cache: 'no-store' })
      if (!res.ok) throw new Error()
      const json: PricesData = await res.json()
      setData(json)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPrices() }, [fetchPrices])

  const groups = data ? Array.from(new Set(data.items.map(i => i.group))) : []

  return (
    <Page>
      <Sidebar />
      <Main>
        <Header title="Цены на металл в Екатеринбурге" />

        {loading && <ErrorMsg>Загрузка цен...</ErrorMsg>}
        {error && <ErrorMsg>Не удалось загрузить данные. Попробуйте позже.</ErrorMsg>}

        {data && !loading && (
          <>
            <Meta>
              <UpdatedAt>Обновлено: {formatDate(data.updatedAt)}</UpdatedAt>
              <SourceLink href="https://mc.ru/region/ekaterinburg/metalloprokat/sortovoy" target="_blank" rel="noopener noreferrer">
                Источник: mc.ru
              </SourceLink>
              <RefreshBtn onClick={fetchPrices} disabled={loading}>
                Обновить
              </RefreshBtn>
            </Meta>

            {groups.map(group => {
              const items = data.items.filter(i => i.group === group)
              return (
                <div key={group}>
                  <GroupTitle>{group} металлопрокат</GroupTitle>
                  <Grid>
                    {items.map(item => (
                      <Card key={item.slug} href={item.url} target="_blank" rel="noopener noreferrer">
                        <CardName>{item.name}</CardName>
                        {item.minPrice ? (
                          <PriceRow>
                            <FromLabel>от</FromLabel>
                            <MinPrice>{formatPrice(item.minPrice)}</MinPrice>
                            <Unit>{item.unit}</Unit>
                            {item.maxPrice && item.maxPrice !== item.minPrice && (
                              <MaxPrice>до {formatPrice(item.maxPrice)}</MaxPrice>
                            )}
                          </PriceRow>
                        ) : (
                          <NoPrice>Цена по запросу</NoPrice>
                        )}
                      </Card>
                    ))}
                  </Grid>
                </div>
              )
            })}

            <Disclaimer>
              Цены носят ознакомительный характер и актуальны на дату обновления. Данные получены с открытых источников.
              Для точной стоимости обратитесь к поставщику. Цены указаны за тонну (руб./т) или по единице измерения.
            </Disclaimer>
          </>
        )}
      </Main>
    </Page>
  )
}
