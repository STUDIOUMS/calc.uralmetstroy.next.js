'use client'
import { useResultStore } from "@/store/resultStore"
import { ResultType } from "@/types"
import Line from "./Line"
import ResultItem from "./ResultItem"
import Sizes from "./Sizes"

interface IMetalResults {
  list: ResultType[]
}

const MetalResults: React.FC<IMetalResults> = ({ list }) => {
  const { removeResult } = useResultStore()

  return (
    <>
      {list.map(el => <ResultItem key={el.id} elId={el.id} remove={removeResult}>
        <>
          <Line name="Форма" value={el.shape} bold />
          <Line name="Материал / Марка" value={`${el.material} / ${(el.mark === 'Марка' ? '---' : el.mark)}`} />
          <Line name="Размеры">
            <Sizes sizes={el.sizes} type={el.setType} />
          </Line>
          <Line name="Вес, кг" value={el.weight} />
          <Line name="Площадь, м²" value={el.square} />
          <Line name="Цена" value={el.price} />
        </>
      </ResultItem>)}
    </>
  )
}

export default MetalResults
