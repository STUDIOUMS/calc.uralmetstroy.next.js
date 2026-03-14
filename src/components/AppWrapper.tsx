'use client'
import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'
import Sidebar from './sidebar/Sidebar'

interface Props { children: React.ReactNode }

export default function AppWrapper({ children }: Props) {
  const { aside, theme } = useAppStore()

  useEffect(() => {
    const t = theme ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', t)
    document.body.setAttribute('data-theme', t)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme ? '#1B53BC' : '#151515')
  }, [theme])

  useEffect(() => {
    // Включаем анимацию перехода только после первой отрисовки, чтобы не мелькало
    requestAnimationFrame(() => {
      document.body.classList.add('theme-transitions-enabled')
    })
  }, [])

  useEffect(() => {
    aside ? document.body.classList.add('modalOpened') : document.body.classList.remove('modalOpened')
  }, [aside])

  return (
    <>
      <Sidebar />
      <div className="app">
        {children}
      </div>
    </>
  )
}
