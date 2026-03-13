import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cachePath = join(process.cwd(), 'src/app/api/prices/cache.json')
    const raw = readFileSync(cachePath, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600' },
    })
  } catch {
    return NextResponse.json({ error: 'Данные временно недоступны' }, { status: 503 })
  }
}
