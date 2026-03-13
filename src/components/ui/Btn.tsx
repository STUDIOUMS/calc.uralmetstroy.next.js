'use client'
import styled, { css } from "styled-components"

type ColorBtnType = 'blue' | 'warning' | 'white'
type SizeBtnType = 'large' | 'medium' | 'small'

interface IBtn<T> {
  color?: ColorBtnType; handler: React.Dispatch<React.SetStateAction<T>> | (() => void)
  title: string; href?: string; size?: SizeBtnType; type?: 'button' | 'submit'
}

export const btnStyles = css<{ $color: ColorBtnType, $size: SizeBtnType }>`
  background: var(--color-${props => props.$color}); border: 0; border-radius: 100px;
  color: var(--color-${props => props.$color === 'white' ? 'btnTextDark' : 'btnTextWhite'});
  cursor: pointer; display: inline-block; font-family: var(--ff);
  font-size: ${({ $size }) => $size === 'medium' ? '14px' : $size === 'small' ? '11px' : '16px'};
  font-weight: 500; line-height: 20px;
  padding: ${({ $size }) => $size === 'medium' ? '10px 16px' : $size === 'small' ? '6px 10px' : '15px 25px'};
  text-align: center; text-decoration: none; transition: all 200ms ease-in-out;
  &:hover { box-shadow: 0 0 0 4px var(--color-${props => props.$color === 'warning' ? 'warning-hover' : 'line'}); }
  @media screen and (max-width: 720px) { font-size: 14px; line-height: 17px; padding: 14px 25px; }
`
const BtnBox = styled.button<{ $color: ColorBtnType, $size: SizeBtnType }>`${btnStyles}`
const BtnLink = styled.a<{ $color: ColorBtnType, $size: SizeBtnType }>`${btnStyles}`

const Btn: React.FC<IBtn<any>> = ({ color = 'blue', handler, href, title, size = 'large', type = 'button' }) => {
  return (
    <>
      {!href ?
        <BtnBox type={type} onClick={handler as any} $color={color} $size={size}>{title}</BtnBox> :
        <BtnLink href={href} target="_blank" $color={color} $size={size}>{title}</BtnLink>
      }
    </>
  )
}

export default Btn
