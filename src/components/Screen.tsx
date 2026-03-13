'use client'
import { useResultStore } from "@/store/resultStore"
import styled from "styled-components"
import { ShapeType } from "@/types"
import Field from "./ui/Field"
import FormControl from "./ui/FormControl"
import Select from "./ui/Select"
import { lengthSizeSelect, weightSizeSelect } from "@/selects"
import { createLabelFunction, sizesList } from "@/helpers"

interface IScreen { errors: any; register: any; shape: ShapeType }

const View = styled.div`
  background-color: var(--color-bg);
  border-radius: 3px 10px 10px 3px;
  padding: 10px;
  @media screen and (max-width: 1020px) { background-size: 200px; }
  @media screen and (max-width: 720px) {
    background-size: 120px;
    border-radius: 3px 3px 10px 10px;
    height: 150px;
  }
`

const Screen: React.FC<IScreen> = ({ errors, register, shape }) => {
  const { sizetype, weightype, changeSizeType, changeWeightType } = useResultStore()
  const shapeSizesList = shape.list.map(el => sizesList.find(i => i.id === el))

  return (
    <div className="appbox appbox-sizes grid grid-2 grid-mb-1">
      <View className={`viewscreen viewscreen-${shape.value}`}></View>
      <div className="appbox-fields">
        {shapeSizesList.map((el, index) => {
          const nameField: string = el!.value
          const label = createLabelFunction(nameField, el!.title)
          return (
            <Field key={index} title={label}>
              <FormControl type="number" num={index} register={register(nameField, { required: true, min: 1 })} error={errors && errors[nameField]} />
              {el!.value.includes('length') && <Select handler={(val) => changeSizeType(val)} list={lengthSizeSelect} size="small" defVal={sizetype} />}
            </Field>
          )
        })}
        <Field title={`Цена, за 1 ${weightype}`}>
          <FormControl type="number" register={register('price', { min: 1 })} error={errors && errors.price} />
          <Select handler={(val) => changeWeightType(val)} list={weightSizeSelect} size="small" defVal={weightype} styles="stick" />
        </Field>
      </div>
    </div>
  )
}

export default Screen
