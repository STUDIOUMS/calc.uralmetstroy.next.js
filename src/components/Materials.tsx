'use client'
import { useEffect, useState } from "react"
import Field from "./ui/Field"
import { SelectItemType, materialsObjType } from "@/types"
import Select from "./ui/Select"
import { selectList } from "@/selects"

interface IMaterials { setMaterials: React.Dispatch<React.SetStateAction<materialsObjType | null>> }

const Materials: React.FC<IMaterials> = ({ setMaterials }) => {
  const [material, setMaterial] = useState<string>(selectList[0].value)
  const [marks, setMarks] = useState<SelectItemType[]>(selectList[0].list!)
  const [mark, setMark] = useState<string>(marks[0].value)

  const handlerMaterial = (val: string) => {
    setMaterial(val)
    setMarks(selectList.find(el => el.value === val)?.list!)
    setMark(selectList.find(el => el.value === val)?.list![0].value!)
  }

  const handlerMark = (val: string) => { setMark(val) }

  useEffect(() => {
    const materialCurrent = selectList.find(el => el.value === material)
    const markName = marks.find(el => el.value === mark)?.label
    const markVal = marks.find(el => el.value === mark)?.dataValue
    const materialsObj = { materialName: materialCurrent?.label, markName, mark: Number(markVal) } as materialsObjType
    setMaterials(materialsObj)
  }, [material, mark])

  return (
    <div className="appbox grid grid-2 mb">
      <div>
        <Field title="Материал"><Select list={selectList} handler={handlerMaterial} /></Field>
      </div>
      <div>
        <Field title="Марка"><Select list={marks} handler={handlerMark} /></Field>
      </div>
    </div>
  )
}

export default Materials
