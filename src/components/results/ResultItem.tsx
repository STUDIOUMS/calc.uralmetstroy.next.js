'use client'
import styled from "styled-components"
import Modal from "../Modal"
import { useState } from "react"
import Btn from "../ui/Btn"
import { ResultsTableTd } from "./Results"

interface IResultItem {
  children: React.ReactNode
  classname?: string
  elId: string
  remove: (id: string) => void
}

// Styles
export const Delete = styled.button`
  background-color: var(--color-white);
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 100px;
  border: 0;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.10);
  cursor: pointer;
  display: block;
  height: 32px;
  outline: none;
  padding: 0;
  position: absolute;
  right: 20px;
  top: 22px;
  width: 32px;
  @media screen and (max-width: 720px) {
    right: -6px;
    top: -6px;
  }
`

const ResultItem: React.FC<IResultItem> = ({ children, classname = 'grid grid-6 grid-mb-1', elId, remove }) => {
  const [modal, setModal] = useState<boolean>(false)

  // removeItem
  const removeItem = () => {
    setModal(false)
    remove(elId)
  }

  return (
    <>
      <ResultsTableTd className={classname}>
        {children}
        <Delete className="deleteIcon" onClick={() => setModal(true)} />
      </ResultsTableTd>
      <Modal close={setModal} open={modal} title="Удалить результат" size="small">
        <div className="grid grid-2">
          <Btn handler={() => setModal(false)} title="Отмена" color="white" />
          <Btn handler={removeItem} title="Удалить" color="warning" />
        </div>
      </Modal>
    </>
  )
}

export default ResultItem
