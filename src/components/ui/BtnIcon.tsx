'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled, { css } from "styled-components"

type ColorType = 'line' | 'warning' | 'blue' | 'transparent'

interface IBtnIcon<T> {
  classname?: string
  color?: ColorType
  handler?: React.Dispatch<React.SetStateAction<T>> | (() => void)
  rounded?: boolean
  areaLabel?: string
  to?: string
  type?: 'button' | 'link' | 'navlink'
}

const IconStyles = css<{ $color: ColorType, $rounded: boolean }>`
  background-color: var(--color-${props => props.$color});
  background-position: center; background-repeat: no-repeat; background-size: 20px;
  border: 0; border-radius: ${props => props.$rounded ? '50%' : '6px'};
  cursor: pointer; outline: none; padding: 0; height: 40px; width: 40px; display: inline-block;
`
const IconBtn = styled.button<{ $color: ColorType, $rounded: boolean }>`${IconStyles}`
const IconLink = styled(Link)<{ $color: ColorType, $rounded: boolean }>`${IconStyles}`

const BtnIcon: React.FC<IBtnIcon<any>> = ({ areaLabel, classname, color = 'line', handler, rounded = false, to, type = 'button' }) => {
  const pathname = usePathname()
  const isActive = to ? pathname === to : false
  const activeClass = isActive ? 'active' : ''
  const combinedClass = [classname, activeClass].filter(Boolean).join(' ')

  return (
    <>
      {(type === 'button') && <IconBtn className={combinedClass} onClick={handler as any} $color={color} $rounded={rounded} aria-label={areaLabel} />}
      {(type === 'link' || type === 'navlink') && <IconLink className={combinedClass} href={to!} $color={color} $rounded={rounded} aria-label={areaLabel} />}
    </>
  )
}

export default BtnIcon
