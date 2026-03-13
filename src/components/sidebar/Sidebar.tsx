'use client'
import styled from "styled-components"
import { useAppStore } from "@/store/appStore"
import SideLogo from "./SideLogo"
import Link from "next/link"
import BtnIcon from "../ui/BtnIcon"
import { usePwaInstall } from "@/lib/usePwaInstall"

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
  const { isInstallable, install } = usePwaInstall()
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
          <li>
            <a href="https://t.me/umsmax" target="_blank" rel="noopener noreferrer" onClick={() => setAside()}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Написать разработчику
            </a>
          </li>
        </Nav>
        {isInstallable && (
          <Nav>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); install(); setAside() }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550.801 550.801"><g><path d="M488.427,197.019h-13.226v-63.822c0-0.401-0.063-0.799-0.116-1.205c-0.021-2.531-0.828-5.023-2.563-6.993L366.325,3.694c-0.031-0.034-0.063-0.045-0.084-0.076c-0.633-0.709-1.371-1.298-2.151-1.804c-0.232-0.158-0.465-0.287-0.707-0.422c-0.675-0.366-1.393-0.675-2.131-0.896c-0.2-0.053-0.379-0.135-0.58-0.19C359.871,0.119,359.037,0,358.193,0H97.201c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.378c-17.049,0-30.874,13.818-30.874,30.87v160.542c0,17.044,13.824,30.876,30.874,30.876h13.223V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.601-9.693,21.601-21.601V419.302h13.226c17.044,0,30.87-13.827,30.87-30.87V227.89C519.297,210.832,505.471,197.019,488.427,197.019z M97.201,21.601h250.193v110.51c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108h-356.4V21.601z M453.601,523.347h-356.4V419.302h356.4V523.347z"/></g></svg>
                Скачать на телефон
              </a>
            </li>
          </Nav>
        )}
        <AsideItem>
          <BtnIcon areaLabel="Смена цвета темы" classname={`switchIcon ${theme ? 'active' : ''}`} handler={() => toggleTheme()} />
        </AsideItem>
      </Aside>
      <Overlay $opened={aside} onClick={() => setAside()} />
    </>
  )
}

export default Sidebar
