'use client'
import styled from "styled-components"
import BtnIcon from "./ui/BtnIcon"

type ModalSizeType = 'small' | 'default'
interface IModal { children: React.ReactNode; close: React.Dispatch<React.SetStateAction<boolean>>; open: boolean; title: string; size?: ModalSizeType }

const ModalBox = styled.div<{ $active: boolean }>`
  transition: all 200ms linear;
  opacity: ${props => props.$active ? '1' : '0'};
  visibility: ${props => props.$active ? 'visible' : 'hidden'};
  position: fixed; left: 0; top: 0; bottom: 0; right: 0;
  display: flex; padding: 16px; align-items: center; justify-content: center; z-index: 1000;
`
export const ModalBoxOverlay = styled.div`
  background: rgba(0,0,0,0.75);
  position: absolute; left: 0; top: 0; bottom: 0; right: 0; z-index: 990;
`
const ModalBoxInside = styled.div<{ $size: ModalSizeType }>`
  background: var(--color-white); border-radius: 10px; border: 1px solid var(--color-line);
  box-shadow: 0px 10px 30px 0px rgba(0,0,0,0.45); max-width: var(--container);
  padding: 40px; position: relative; width: 100%; z-index: 999;
  ${props => props.$size === 'small' && `max-width: 380px; text-align: center;`}
  &::before {
    background: var(--color-warning); border-radius: 2px; content: '';
    display: block; width: 2px; height: 47px; position: absolute; left: 0; top: 88px;
  }
  @media screen and (max-width: 720px) { padding: 20px; &::before { top: 20px; } }
`
export const Close = styled.div`position: absolute; right: -10px; top: -10px;`

const Modal: React.FC<IModal> = ({ children, close, open, title, size = 'default' }) => {
  return (
    <ModalBox $active={open}>
      <ModalBoxOverlay onClick={() => close(false)} />
      <ModalBoxInside $size={size}>
        <Close><BtnIcon classname="closeIcon" handler={() => close(false)} color="warning" rounded /></Close>
        <h2>{title}</h2>
        {children}
      </ModalBoxInside>
    </ModalBox>
  )
}

export default Modal
