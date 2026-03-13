import { CalcOutputType, LengthSizeType, ShapeType, ShapeValueType, SizeType, WeightSizeType } from "./types";

export const sizesList: SizeType[] = [
  { id: 1, title: "Высота", value: "height" },
  { id: 2, title: "Ширина", value: "width" },
  { id: 3, title: "Длина", value: "length" },
  { id: 4, title: "Стенка", value: "wall" },
  { id: 5, title: "Толщина", value: "thick" },
  { id: 6, title: "Кол-во", value: "number" },
  { id: 7, title: "Внеш. диаметр", value: "outDiameter" },
  { id: 8, title: "Диаметр", value: "diameter" },
  { id: 9, title: "Перемычка", value: "jumper" },
  { id: 10, title: "Полка", value: "shelf" },
]

export const shapesList: ShapeType[] = [
  { id: 1, title: "Труба", value: "pipe-square", list: [ 1, 2, 3, 4 ] },
  { id: 2, title: "Лист", value: "sheet", list: [ 5, 2, 3, 6 ] },
  { id: 3, title: "Труба", value: "pipe", list: [ 7, 5, 3 ] },
  { id: 4, title: "Круг", value: "circle", list: [ 8, 3 ] },
  { id: 5, title: "Уголок", value: "corner", list: [ 1, 2, 3, 4 ] },
  { id: 6, title: "Квадрат", value: "square", list: [ 2, 3 ] },
  { id: 7, title: "Швеллер", value: "shwell", list: [ 1, 2, 3, 4 ] },
  { id: 8, title: "Полоса", value: "ribbon", list: [ 5, 2, 3 ] },
  { id: 9, title: "Балка", value: "rail", list: [ 1, 2, 9, 10, 3 ] },
  { id: 10, title: "Шести-гранник", value: "corner6", list: [ 8, 3 ] }
]

export const createEmptySizes = (num: number): string[] => {
  const output: string[] = []
  for (let i = 0; i < num; i++) { output.push('') }
  return output
}

export const valueSizeFunction = (val: string, type: string): string => {
  return (val === 'length') ? type : (val === 'number') ? 'шт.' : 'мм.'
}

export const createLabelFunction = (val: string, title: string): string => {
  return (val === 'number') ? `${title}, шт.` :
        (val === 'length') ? title :
        `${title}, мм.`
}

export const calcMetalFuction = (shape: ShapeValueType, mark: number, sizes: number[], cost: number, lengthtype: LengthSizeType | string, weightype: WeightSizeType | string): CalcOutputType => {
  const Ro: number = mark
  let result: number = 0
  let area: number = 0

  if (shape === 'corner') {
    const W = sizes[0]; const H = sizes[1]; const L = sizes[2]; const T = sizes[3]
    result = mark * T * (W + H - T) * L
    area = ( ( W + (W - T) ) + ( H + (H - T) ) + ( T * 2 ) ) * L
  }
  if ( shape === 'sheet' ) {
    result = sizes.reduce((acum, el) => acum *= el, 1) * mark
    area = sizes[1] * sizes[2] * sizes[3]
  }
  if (shape === 'pipe') {
    result = Math.PI * Ro * sizes[1] * ( sizes[0] - sizes[1] ) * sizes[2]
    area = Math.PI * sizes[0] * sizes[2]
  }
  if (shape === 'pipe-square') {
    const size1 = sizes[0]; const size2 = sizes[1]; const length = sizes[2]; const S = sizes[3]
    result = ( (size1 + size2) * 2 ) * length * S * mark
    area = length * (size1 + size2) * 2
  }
  if (shape === 'square') {
    result = Math.pow(sizes[0], 2) * sizes[1] * mark
    area = sizes[1] * (sizes[0] * 2) * 2
  }
  if (shape === 'circle') {
    const radius = sizes[0] / 2
    result = Math.PI * Math.pow(radius, 2) * sizes[1] * mark
    area = Math.PI * sizes[0] * sizes[1]
  }
  if (shape === 'ribbon' ) {
    result = sizes[0] * sizes[1] * sizes[2] * mark
    area = sizes[1] * sizes[2]
  }
  if (shape === 'corner6') {
    const cbrt = 0.87
    result = cbrt * Math.pow(sizes[0], 2) * sizes[1] * mark
    area = Math.PI * sizes[0] * sizes[1]
  }
  if (shape === 'shwell') {
    const H = sizes[0]; const W = sizes[1]; const L = sizes[2]; const S = sizes[3]
    result = ( 2 * H + W - 4 * S ) * L * S * mark
    area = ( ( H + ( H - S ) ) * 2 + ( W + ( W - S ) ) + S * 3 ) * L
  }
  if (shape === 'rail') {
    const h = sizes[0]; const b = sizes[1]; const t = sizes[2]; const s = sizes[3]; const L = sizes[4]
    result = mark * (2 * b * t + (h - 2 * t) * s) * L
    area = (((b + (b - t)) * 2 ) + ((h - s) * 2) + (s * 2) + t ) * L
  }

  if (lengthtype === 'мм.') { result = result / 1000000000; area = area / 1000000 }
  if (lengthtype === 'см.') { result = result / 100000000; area = area / 100000 }
  if (lengthtype === 'м.') { result = result / 1000000; area = area / 1000 }

  const totalArea: string = (area % 1) === 0 ? area.toFixed(0) : area.toFixed(2)
  const totalPrice: number = (weightype === 'тн.') ? result * cost / 1000 : result * cost

  return {
    weight: result.toFixed(2),
    price: (cost > 0) ? totalPrice.toFixed(2).toString() + ' руб.' : '---',
    square: totalArea,
  }
}

export function transformNumber(num: number) {
  return (num % 1) === 0 ? num.toFixed(0) : num.toFixed(3)
}
