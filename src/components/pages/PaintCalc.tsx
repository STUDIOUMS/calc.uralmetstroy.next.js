'use client'
import { useState } from "react"
import Header from "../Header"
import { currencySelect, selectShapes } from "@/selects"
import Btn from "../ui/Btn"
import Field from "../ui/Field"
import FormControl from "../ui/FormControl"
import Select from "../ui/Select"
import Range from "../ui/Range"
import Check from "../ui/Check"
import { useForm } from "react-hook-form"
import { CurrencyType, PaintType } from "@/types"
import { usePaintResultStore } from "@/store/resultPaintStore"
import Results from "../results/Results"
import PaintResults from "../results/PaintResults"
import AppWrapper from "../AppWrapper"

type FormValues = { price: string; square: string; number: string; layers: string }

const PaintCalc: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyType>('руб')
  const [material, setMaterial] = useState<string>('pipe-square')
  const [weight, setWeight] = useState<number>(1.5)
  const [thick, setThick] = useState<number>(80)
  const [efficiency, setEfficiency] = useState<number>(90)
  const [bothsides, setBothsides] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const { removeAllPaintResults, resultsPaint, setResultPaint } = usePaintResultStore()

  const submitForm = (data: FormValues) => {
    const object: PaintType = {
      layers: Number(data.layers), material, number: Number(data.number), price: Number(data.price),
      efficiency, square: Number(data.square), thick, weight, bothsides, currency
    }
    setResultPaint(object)
  }

  return (
    <AppWrapper>
      <Header title="Калькулятор краски" />
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <div className="app-calc app-paint grid grid-2 grid-mb-1">
          <div className="appbox">
            <h2>Исходные данные</h2>
            <Field title={`Цена краски, ${currency}/кг`}>
              <FormControl type="number" register={register('price', { required: true, min: 1 })} placeholder="500" error={errors.hasOwnProperty('price')} />
              <Select handler={(val) => setCurrency(val)} list={currencySelect} size="small" styles="stick" />
            </Field>
            <Field title="Удельный вес, г/см³">
              <Range min={1.2} max={2.0} step={0.1} defaultVal={1.5} handler={(val) => setWeight(val)} />
            </Field>
            <Field title="Толщина покрытия, мкм">
              <Range min={50} max={150} step={5} defaultVal={80} handler={(val) => setThick(val)} />
            </Field>
            <Field title="Эффективность, %">
              <Range min={0} max={100} step={10} defaultVal={90} handler={(val) => setEfficiency(val)} />
            </Field>
          </div>
          <div className="appbox">
            <h2>Расход краски</h2>
            <Field title="Материал окраски">
              <Select handler={(val) => setMaterial(val)} list={selectShapes} />
            </Field>
            <Field title="Площадь детали, м²">
              <FormControl type="number" register={register('square', { required: true, min: 1 })} placeholder="10" error={errors.hasOwnProperty('square')} />
            </Field>
            {material === 'sheet' && <Field title="Количество, шт">
              <FormControl type="number" register={register('number', { required: false, min: 1 })} placeholder="1" error={errors.hasOwnProperty('number')} />
            </Field>}
            <Field title="Количество слоев">
              <FormControl type="number" register={register('layers', { required: false, min: 1 })} placeholder="1" error={errors.hasOwnProperty('layers')} />
            </Field>
            {(material === 'sheet' || material === 'ribbon') && <Check label="Окраска с двух сторон" handler={(check) => setBothsides(check)} />}
          </div>
          <div className="appbox text-right">
            <Btn title="Посчитать" type="submit" handler={() => {}} />
          </div>
        </div>
      </form>
      <Results
        length={resultsPaint.length}
        names={['Материал', 'Стоимость покрытия', 'Расход краски, г/м²', 'Укрываемость, м²/кг', 'Сколько потребуется краски, кг']}
        removeAll={removeAllPaintResults}
      >
        <PaintResults list={resultsPaint} />
      </Results>
    </AppWrapper>
  )
}

export default PaintCalc
