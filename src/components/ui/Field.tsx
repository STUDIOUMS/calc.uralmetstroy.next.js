'use client'
import styled from "styled-components"
import { useResultStore } from "@/store/resultStore"

interface IField {
  children: React.ReactNode
  title: string
}

// Styles
const FieldBox = styled.div`
  display: flex;
  margin: 0 0 20px;
  position: relative;
  &:last-child { margin: 0; }
  @media screen and (max-width: 720px) {
    margin: 0 0 15px;
  }
`
const Label = styled.label`
  background: var(--color-white);
  border-radius: 20px;
  color: var(--color-grey);
  font-size: 12px;
  line-height: 15px;
  padding: 2px 4px;
  position: absolute;
  top: -12px;
  left: 12px;
  z-index: 100;
`

const Field: React.FC<IField> = ({ children, title }) => {
  const { sizetype } = useResultStore()
  const addtitle = (title.includes('Длина')) && ', ' + sizetype

  return (
    <FieldBox>
      <Label>{title}{addtitle}</Label>
      {children}
    </FieldBox>
  )
}

export default Field
