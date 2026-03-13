export type ShapeValueType = 'corner' | 'sheet' | 'pipe' | 'circle' | 'pipe-square' | 'square' | 'shwell' | 'ribbon' | 'rail' | 'corner6'

export type SizeType = {
  id: number
  title: string
  value: string
}

export type LengthSizeType = 'мм.' | 'см.' | 'м.'
export type WeightSizeType = 'кг.' | 'тн.'
export type CurrencyType = 'руб' | 'USD' | 'EUR'

export type ShapeType = {
  id: number
  title: string
  value: ShapeValueType
  list: number[]
}

export type SelectItemType = {
  label: string
  value: string
  dataValue?: string
  list?: SelectItemType[]
}

export type ResultType = {
  id: string
  material: string
  mark: string
  shape: string
  sizes: SizeType
  weight: string
  price: string
  setType: string
  square: string
}

export type CalcOutputType = {
  price: string
  weight: string
  square: string
}

export type materialsObjType = {
  materialName: string
  markName: string
  mark: number
}

export type SetDataType = {
  shapeName: string
  shapeValue: ShapeValueType
  materials: materialsObjType | null
  sizes: number[]
}

export type PaintType = {
  price: number
  weight: number
  thick: number
  efficiency: number
  material: string
  square: number
  number?: number
  layers: number
  bothsides?: boolean
  currency: CurrencyType
}

export type PaintDataType = {
  id: string
  consume: string
  cover: string
  priceCover: string
  necessity: string
  material: string
}
