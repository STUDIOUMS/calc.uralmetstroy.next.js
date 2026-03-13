import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { LengthSizeType, ResultType, SetDataType, WeightSizeType } from '@/types'
import { calcMetalFuction } from '@/helpers'
import { nanoid } from 'nanoid'


interface ResultState {
  results: ResultType[]
  sizetype: LengthSizeType | string
  weightype: WeightSizeType | string
  setResult: (data: SetDataType) => void
  removeResult: (id: string) => void
  removeAllResults: () => void
  changeSizeType: (val: LengthSizeType | string) => void
  changeWeightType: (val: WeightSizeType | string) => void
}

export const useResultStore = create<ResultState>()(
  devtools(
    persist(
      (set) => ({
        results: [],
        sizetype: 'мм.',
        weightype: 'кг.',

        // setResult
        setResult: (data) => set((state) => {
          let sizes: any = data.sizes
          const getPrice: number = Number(sizes.price)

          // Remove price
          delete sizes.price

          // calcSizes
          const calcSizes: number[] = Object.values(sizes).map(el => Number(el))

          // Names
          const { shapeName, shapeValue, materials } = data

          // Calculate
          const { price, weight, square } = calcMetalFuction(shapeValue, materials!.mark, calcSizes, getPrice, state.sizetype, state.weightype)

          // Output
          const output: ResultType = {
            id: nanoid(),
            mark: materials!.markName,
            material: materials!.materialName,
            price,
            shape: shapeName,
            sizes,
            weight,
            setType: state.sizetype,
            square
          }

          return { results: [output, ...state.results] }
        }),

        // removeResult / removeAllResults
        removeResult: (id) => set((state) => ({ results: state.results.filter(el => el.id !== id) })),
        removeAllResults: () => set(() => ({ results: [] })),

        // changeSizeType
        changeSizeType: (val) => set(() => ({ sizetype: val })),

        // changeWeightType
        changeWeightType: (val) => set(() => ({ weightype: val })),

      }),
      {
        name: 'results',
        partialize: (state) => ({
          results: state.results,
          sizetype: state.sizetype,
          weightype: state.weightype
        })
      }
    )
  )
)
