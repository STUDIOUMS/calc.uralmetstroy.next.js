'use client'
import styled from "styled-components"
import { useAppStore } from "@/store/appStore"
import SideLogo from "./SideLogo"
import Link from "next/link"
import BtnIcon from "../ui/BtnIcon"

const asideWidth = 300

const Aside = styled.aside<{ $opened: boolean }>`
  background: var(--color-bg); border-right: 1px solid var(--color-line);
  position: fixed; left: 0; top: 0; bottom: 0; width: ${asideWidth}px; z-index: 1000;
  transform: translateX(${props => props.$opened ? 'none' : `-${asideWidth}px`});
  transition: all 100ms linear;
`
const AsideItem = styled.div`padding: 14px 20px;`
const Overlay = styled.div<{ $opened: boolean }>`
  background: rgba(0,0,0,0.75); position: fixed; left: 0; top: 0; bottom: 0; right: 0; z-index: 990;
  display: ${props => props.$opened ? 'block' : 'none'};
`
const Nav = styled.ul`
  color: var(--color-text); display: block; margin: 0; padding: 0;
  li {
    border-bottom: 1px solid var(--color-line); font-size: 14px; list-style: none;
    a {
      align-items: center; color: var(--color-text); display: flex;
      padding: 14px 20px; text-decoration: none; transition: all 200ms ease-in-out;
      &:hover { background: var(--color-line); }
      svg { fill: var(--color-svg); width: 20px; margin: 0 14px 0 0; }
    }
  }
`

const Sidebar: React.FC = () => {
  const { aside, setAside, theme, toggleTheme } = useAppStore()
  return (
    <>
      <Aside $opened={aside}>
        <SideLogo title="Калькулятор металла и краски" />
        <Nav>
          <li>
            <Link href="/info" onClick={() => setAside()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.536 29.536"><g><path d="M14.768,0C6.611,0,0,6.609,0,14.768c0,8.155,6.611,14.767,14.768,14.767s14.768-6.612,14.768-14.767C29.535,6.609,22.924,0,14.768,0z M14.768,27.126c-6.828,0-12.361-5.532-12.361-12.359c0-6.828,5.533-12.362,12.361-12.362c6.826,0,12.359,5.535,12.359,12.362C27.127,21.594,21.594,27.126,14.768,27.126z"/><path d="M14.385,19.337c-1.338,0-2.289,0.951-2.289,2.34c0,1.336,0.926,2.339,2.289,2.339c1.414,0,2.314-1.003,2.314-2.339C16.672,20.288,15.771,19.337,14.385,19.337z"/><path d="M14.742,6.092c-1.824,0-3.34,0.513-4.293,1.053l0.875,2.804c0.668-0.462,1.697-0.772,2.545-0.772c1.285,0.027,1.879,0.644,1.879,1.543c0,0.85-0.67,1.697-1.494,2.701c-1.156,1.364-1.594,2.701-1.516,4.012l0.025,0.669h3.42v-0.463c-0.025-1.158,0.387-2.162,1.311-3.215c0.979-1.08,2.211-2.366,2.211-4.321C19.705,7.968,18.139,6.092,14.742,6.092z"/></g></svg>
              Справка
            </Link>
          </li>
        </Nav>
        <AsideItem>
          <BtnIcon areaLabel="Смена цвета темы" classname={`switchIcon ${theme ? 'active' : ''}`} handler={() => toggleTheme()} />
        </AsideItem>
      </Aside>
      <Overlay $opened={aside} onClick={() => setAside()} />
    </>
  )
}

export default Sidebar
