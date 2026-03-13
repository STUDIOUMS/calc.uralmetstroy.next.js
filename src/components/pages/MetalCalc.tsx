'use client'
import React, { useState } from "react"
import Shape, { ShapeList } from "../Shape"
import { shapesList } from "@/helpers"
import Btn from "../ui/Btn"
import Screen from "../Screen"
import { ShapeType, materialsObjType } from "@/types"
import Materials from "../Materials"
import { useResultStore } from "@/store/resultStore"
import { useForm } from "react-hook-form"
import Footer from "../Footer"
import Results from "../results/Results"
import Header from "../Header"
import MetalResults from "../results/MetalResults"
import AppWrapper from "../AppWrapper"

const MetalCalc: React.FC = () => {
  const [materials, setMaterials] = useState<materialsObjType | null>(null)
  const [shape, setShape] = useState<ShapeType>(shapesList[0])
  const { setResult, results, removeAllResults } = useResultStore()
  const { handleSubmit, register, reset, formState: { errors } } = useForm()

  const chooseShape = (val: ShapeType): void => {
    setShape(val)
    reset()
  }

  const calcHandler = (data: any) => {
    setResult({ materials, shapeName: shape.title, shapeValue: shape.value, sizes: data })
  }

  return (
    <AppWrapper>
      <Header title="Калькулятор веса металла онлайн" />
      <div className="app-calc app-metal">
        <Materials setMaterials={setMaterials} />
        <form onSubmit={handleSubmit(calcHandler)} noValidate className="grid grid-2 grid-tb-1">
          <ShapeList className="appbox">
            {shapesList.map(el => <Shape key={el.id} handler={chooseShape} current={shape.value} el={el} />)}
          </ShapeList>
          <Screen shape={shape} register={register} errors={errors} />
          <Footer>
            <Btn title="Посчитать" type="submit" handler={() => {}} />
          </Footer>
        </form>
      </div>
      <Results
        length={results.length}
        names={['Форма', 'Материал / Марка', 'Размеры', 'Вес, кг', 'Площадь, м²', 'Цена']}
        removeAll={removeAllResults}
      >
        <MetalResults list={results} />
      </Results>
    </AppWrapper>
  )
}

export default MetalCalc
