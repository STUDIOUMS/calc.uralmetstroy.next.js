'use client'
import styled from "styled-components"
import Btn from "../ui/Btn"
import { useState } from "react"
import Modal from "../Modal"
import BtnIcon from "../ui/BtnIcon"

interface IResults {
  children: React.ReactNode
  length: number
  names: string[]
  removeAll: () => void
  title?: string
}

// Styles
const Head = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 26px;
  h2 { margin: 0 10px 0 0; }
`
const ResultsTable = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-line);
  border-radius: 10px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.03);
  margin: 0 0 20px;
  @media screen and (max-width: 720px) {
    border: 0;
    border-radius: 0;
  }
`
export const ResultsTableTd = styled.div`
  border-top: 1px solid var(--color-line);
  padding: 29px 30px;
  position: relative;
  &.total {
    font-size: 18px;
    text-align: right;
  }
  @media screen and (max-width: 720px) {
    border-top: 0;
    border-bottom: 1px solid var(--color-line);
    padding: 0;
    grid-row-gap: 0;
    &:last-child { border: 0; }
    &.total {
      font-size: 16px;
      text-align: left;
    }
    background: var(--color-bg);
    border: 1px solid var(--color-line);
    border-radius: 10px;
    margin-bottom: 16px;
  }
`
const ResultsTableHead = styled.div`
  color: var(--color-grey);
  font-size: 12px;
  font-weight: 500;
  padding: 20px 30px;
  @media screen and (max-width: 720px) {
    display: none;
  }
`
const FooterBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  div:nth-child(1) { margin-right: 10px; }
  @media screen and (max-width: 720px) {
    flex-direction: column;
    div, div>* { width: 100%; }
    div:nth-child(1) { margin: 0; order: 2; }
    div:nth-child(2) { margin: 0 0 10px; order: 1; }
  }
`

const Results: React.FC<IResults> = ({ children, length, names, removeAll, title = 'Результаты подсчёта' }) => {
  const [modal, setModal] = useState<boolean>(false)

  // removeAllHandler
  const removeAllHandler = () => {
    setModal(false)
    removeAll()
  }

  if (length === 0) return null

  return (
    <div>
      <Head>
        <h2>{title}</h2>
        <BtnIcon classname="downloadIcon" handler={() => {}} areaLabel="Скачать результаты" color="transparent" />
      </Head>

      <ResultsTable>
        <ResultsTableHead className={`grid grid-${names.length}`}>
          {names.map((name, index) => <div key={index}>{name}</div>)}
        </ResultsTableHead>
        {children}
      </ResultsTable>

      <FooterBox>
        <div>
          <Btn title="Удалить все" color="warning" handler={() => setModal(true)} />
        </div>
      </FooterBox>

      <Modal close={setModal} open={modal} title="Удалить все результаты" size="small">
        <div className="grid grid-2">
          <Btn handler={() => setModal(false)} title="Отмена" color="white" />
          <Btn handler={removeAllHandler} title="Удалить" color="warning" />
        </div>
      </Modal>
    </div>
  )
}

export default Results
