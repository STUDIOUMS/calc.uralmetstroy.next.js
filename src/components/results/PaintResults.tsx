'use client'
import { usePaintResultStore } from "@/store/resultPaintStore"
import { PaintDataType } from "@/types"
import Line from "./Line"
import ResultItem from "./ResultItem"

interface IPaintResults {
  list: PaintDataType[]
}

const PaintResults: React.FC<IPaintResults> = ({ list }) => {
  const { removePaintResult } = usePaintResultStore()

  return (
    <>
      {list.map(el => {
        return <ResultItem key={el.id} elId={el.id} classname="grid grid-5 grid-mb-1" remove={removePaintResult}>
          <>
            <Line name="Материал" value={el.material} bold />
            <Line name="Стоимость покрытия" value={el.priceCover + '/м²'} />
            <Line name="Расход краски, г/м²" value={el.consume} />
            <Line name="Укрываемость, м²/кг" value={el.cover} />
            <Line name="Сколько потребуется краски, кг" value={el.necessity} />
          </>
        </ResultItem>
      })}
    </>
  )
}

export default PaintResults
