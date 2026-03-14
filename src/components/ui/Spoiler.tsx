'use client'
import { useRef, useState } from "react"
import styled from "styled-components"

interface ISpoiler {
  all?: boolean
  children: React.ReactNode
  current: number
  handler: React.Dispatch<React.SetStateAction<number>>
  index: number
  title: string
}

// Styles
const SpoilerBody = styled.div`
  margin: 0 0 var(--paragraph);
`
const Head = styled.button`
  background: var(--color-bg);
  border: 0;
  border-radius: 10px;
  color: var(--color-black);
  cursor: pointer;
  display: block;
  font-family: var(--ff);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  padding: 10px 16px;
`
const Hidden = styled.div<{ $height: number, $open: boolean }>`
  height: ${props => props.$open ? `${props.$height}px` : 0};
  overflow: hidden;
  transition: height 200ms linear;
`
const HiddenInner = styled.div`
  padding-top: 16px;
`

// Spoiler
const Spoiler: React.FC<ISpoiler> = ({ all = false, children, current, handler, index, title }) => {
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const opened: boolean = !all ? current === index : open

  // clickHandler
  const clickHandler = () => {
    !all ? (current !== index) ? handler(index) : handler(0) : setOpen(!open)
  }

  return (
    <SpoilerBody>
      <Head onClick={clickHandler}>{title}</Head>
      <Hidden $open={opened} $height={ref.current?.clientHeight!}>
        <HiddenInner ref={ref}>
          {children}
        </HiddenInner>
      </Hidden>
    </SpoilerBody>
  )
}

export default Spoiler
