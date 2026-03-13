'use client'
import styled from "styled-components"
import { SelectItemType } from "@/types"

type SelectSizeType = 'small' | 'default'
interface ISelect<T> { list: SelectItemType[]; handler: (val: string | T) => void; size?: SelectSizeType; defVal?: string; styles?: any }

const Dropdown = styled.select<{ $size: SelectSizeType }>`
  border: ${props => props.$size === 'small' ? '0' : '1px solid var(--color-line)'};
  border-radius: ${props => props.$size === 'small' ? '0' : '50px'};
  color: var(--color-black); cursor: pointer; font-family: var(--ff);
  font-size: ${props => props.$size === 'small' ? '12px' : '15px'};
  font-weight: 500; height: 50px; outline: none;
  padding: ${props => props.$size === 'small' ? '10px 0' : '10px 40px 10px 16px'};
  width: ${props => props.$size === 'small' ? '42px' : '100%'};
  ${props => props.$size === 'small' && `
    background-color: transparent; background-position: center; background-repeat: no-repeat;
    background-size: 10px; color: #000 !important; text-indent: -9999px;
    position: absolute; right: 30px; top: 1px; height: 47px;
  `}
  appearance: none; -webkit-appearance: none;
  &.stick { right: 5px; }
  @media screen and (max-width: 720px) { height: 44px; }
`

const Select: React.FC<ISelect<any>> = ({ list, handler, size = 'default', defVal, styles }) => {
  return (
    <Dropdown className={`selectArrow ${styles}`} onChange={(e) => handler(e.target.value)} $size={size} defaultValue={defVal}>
      {list.map(option => <option key={option.label} value={option.value}>{option.label}</option>)}
    </Dropdown>
  )
}

export default Select
