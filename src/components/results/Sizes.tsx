'use client'
import styled from "styled-components"
import { sizesList, valueSizeFunction } from "@/helpers"
import { SizeType } from "@/types"

interface ISizes {
  sizes: SizeType
  type: string
}

// Styles
const Line = styled.div`
  small { color: var(--color-grey); }
`

const Sizes: React.FC<ISizes> = ({ sizes, type }) => {

  // List creation
  const list = Object.entries(sizes).map(el => {
    const found = sizesList.find(i => i.value === el[0])
    return { id: found?.id, title: found?.title, value: el[0], data: el[1] }
  })

  return (
    <div>
      {list.map(el => {
        const mark = valueSizeFunction(el.value, type)
        return <Line key={el.id}>{el.data} <small>{mark} - {el.title}</small></Line>
      })}
    </div>
  )
}

export default Sizes
