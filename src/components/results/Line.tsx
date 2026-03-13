'use client'
import styled from "styled-components"

interface ILine {
  children?: React.ReactNode
  name: string
  value?: string
  bold?: boolean
}

const LineBox = styled.div<{ $bold?: boolean }>`
  @media screen and (max-width: 720px) {
    ${props => props.$bold && `
      background: var(--color-line);
      border-radius: 8px 8px 0 0;
    `}
    border-top: 1px solid var(--color-line);
    display: grid;
    grid-template-columns: 140px 1.8fr;
    grid-template-areas: "f1 f2";
    padding: 8px 16px;
    &:first-child { border: 0; }
    .mb-visible { color: var(--color-grey); font-size: 12px; }
    div:nth-child(1) { grid-area: f1; }
    div:nth-child(2) { grid-area: f2; }
  }
`

const Line: React.FC<ILine> = ({ children, bold, name, value }) => {
  return (
    <LineBox $bold={bold}>
      <div className="mb-visible">{name}</div>
      <div>{value}{children}</div>
    </LineBox>
  )
}

export default Line
