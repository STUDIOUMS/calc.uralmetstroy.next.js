'use client'
import styled from "styled-components"
import { ShapeType } from "@/types"

interface IShape { current: string; handler: (val: ShapeType) => void; el: ShapeType }

export const ShapeList = styled.div`
  column-count: 2;
  column-gap: 10px;
  @media screen and (max-width: 1020px) { column-count: 3; }
  @media screen and (max-width: 720px) { column-count: 2; }
`
const ShapeBtn = styled.button<{ $active: boolean }>`
  align-items: center;
  background: var(--color-${props => props.$active ? 'bg' : 'white'});
  border: 1px solid ${props => props.$active ? 'var(--color-warning)' : 'transparent'};
  border-radius: 10px;
  color: var(--color-${props => props.$active ? 'btn' : 'black'});
  cursor: pointer;
  display: inline-flex;
  font-family: var(--ff);
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  min-height: 50px;
  outline: none;
  padding: 3px;
  text-align: left;
  width: 100%;
  @media screen and (max-width: 720px) { font-size: 14px; min-height: 40px; }
`
const Icon = styled.div<{ $active: boolean }>`
  background-color: var(--color-bg);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  margin: 0 12px 0 0;
  min-width: 44px;
  svg { fill: var(--color-${props => props.$active ? 'btn' : 'svg'}); }
  @media screen and (max-width: 720px) { background-size: 18px; height: 36px; min-width: 36px; }
`

const Shape: React.FC<IShape> = ({ current, handler, el }) => {
  return (
    <ShapeBtn type="button" onClick={() => handler(el)} $active={current === el.value}>
      <Icon $active={current === el.value}>
        {el.value === 'pipe-square' && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Vector 3"><path id="Rectangle 17 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M20.5333 1.46667H1.46667L1.46667 20.5333H20.5333V1.46667ZM1.46667 0C0.656649 0 0 0.656649 0 1.46667V20.5333C0 21.3434 0.656649 22 1.46667 22H20.5333C21.3434 22 22 21.3434 22 20.5333V1.46667C22 0.656649 21.3434 0 20.5333 0H1.46667Z" /></g></svg>}
        {el.value === 'sheet' && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.13333 1.46667C5.13333 0.656649 5.78998 0 6.6 0H15.4C16.21 0 16.8667 0.656649 16.8667 1.46667V20.5333C16.8667 21.3434 16.21 22 15.4 22H6.6C5.78998 22 5.13333 21.3434 5.13333 20.5333V1.46667Z" /></svg>}
        {el.value === 'pipe' && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11 20.5333C16.2651 20.5333 20.5333 16.2651 20.5333 11C20.5333 5.73489 16.2651 1.46667 11 1.46667C5.73489 1.46667 1.46667 5.73489 1.46667 11C1.46667 16.2651 5.73489 20.5333 11 20.5333ZM11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z" /></svg>}
        {el.value === 'circle' && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="11" /></svg>}
        {el.value === 'corner' && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.733333 0C1.13834 0 1.46667 0.328324 1.46667 0.733333V19.8C1.46667 20.205 1.79499 20.5333 2.2 20.5333H21.2667C21.6717 20.5333 22 20.8617 22 21.2667C22 21.6717 21.6717 22 21.2667 22H2.2C0.984973 22 0 21.015 0 19.8V0.733333C0 0.328324 0.328324 0 0.733333 0Z" /></svg>}
        {el.value === 'square' && <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.25" width="22" height="22" rx="2" /></svg>}
        {el.value === 'shwell' && <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.983333 0C1.38834 0 1.71667 0.328324 1.71667 0.733333V19.8C1.71667 20.205 2.04499 20.5333 2.45 20.5333H20.05C20.455 20.5333 20.7833 20.205 20.7833 19.8V0.733333C20.7833 0.328324 21.1117 0 21.5167 0C21.9217 0 22.25 0.328324 22.25 0.733333V19.8C22.25 21.015 21.265 22 20.05 22H2.45C1.23497 22 0.25 21.015 0.25 19.8V0.733333C0.25 0.328324 0.578324 0 0.983333 0Z" /></svg>}
        {el.value === 'ribbon' && <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.25" y="16.8667" width="11.7333" height="22" rx="2" transform="rotate(-90 0.25 16.8667)" /></svg>}
        {el.value === 'rail' && <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.18335 0.733333C3.18335 0.328324 3.51167 0 3.91668 0H18.5834C18.9884 0 19.3167 0.328324 19.3167 0.733333C19.3167 1.13834 18.9884 1.46667 18.5834 1.46667H11.9834V20.5333H18.5834C18.9884 20.5333 19.3167 20.8617 19.3167 21.2667C19.3167 21.6717 18.9884 22 18.5834 22H3.91668C3.51167 22 3.18335 21.6717 3.18335 21.2667C3.18335 20.8617 3.51167 20.5333 3.91668 20.5333H10.5167V1.46667H3.91668C3.51167 1.46667 3.18335 1.13834 3.18335 0.733333Z" /></svg>}
        {el.value === 'corner6' && <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Polygon 1" d="M11.25 0L20.7763 5.5V16.5L11.25 22L1.72372 16.5V5.5L11.25 0Z" /></svg>}
      </Icon>
      {el.title}
    </ShapeBtn>
  )
}

export default Shape
