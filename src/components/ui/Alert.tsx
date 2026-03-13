'use client'
import styled from "styled-components"

interface IAlert {
  children: React.ReactNode
}

// Styles
const AlertBox = styled.div`
  background: var(--color-danger);
  border-radius: 10px;
  color: var(--color-white);
  font-size: 14px;
  padding: 10px 16px;
`

const Alert: React.FC<IAlert> = ({ children }) => {
  return (
    <AlertBox>
      {children}
    </AlertBox>
  )
}

export default Alert
