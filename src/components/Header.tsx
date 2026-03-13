'use client'
import BtnIcon from './ui/BtnIcon'
import { useAppStore } from '@/store/appStore'

interface IHeader { title: string }

const Header: React.FC<IHeader> = ({ title }) => {
  const { theme, setAside } = useAppStore()
  return (
    <div className="app-header">
      <h1>{title}</h1>
      <BtnIcon areaLabel="Калькулятор металла" classname="calcMetalIcon" to="/" type="navlink" />
      <BtnIcon areaLabel="Калькулятор краски" classname="calcSprayIcon" to="/paint" type="navlink" />
      <BtnIcon areaLabel="Меню" classname={`menuIcon ${theme ? 'active' : ''}`} handler={() => setAside()} />
    </div>
  )
}

export default Header
