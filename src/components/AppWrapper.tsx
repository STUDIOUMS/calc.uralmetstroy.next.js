'use client'
import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'
import Sidebar from './sidebar/Sidebar'

interface Props { children: React.ReactNode }

export default function AppWrapper({ children }: Props) {
  const { aside, theme } = useAppStore()

  useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', 'light')
    } else {
      document.body.setAttribute('data-theme', 'dark')
    }
  }, [theme])

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
