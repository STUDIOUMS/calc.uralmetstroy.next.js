'use client'
import ReactSlider from "react-slider"
import styled from "styled-components"

interface IRange { defaultVal?: number; handler: (val: number) => void; min?: number; max: number; step?: number }

const RangeDiv = styled.div`height: 30px; width: 100%; margin: 0 0 10px; padding: 26px 16px 30px; position: relative;`
const RangeNum = styled.div`bottom: 0; font-size: 12px; line-height: 16px; position: absolute; &.left { left: 16px; } &.right { right: 16px; }`
const StyledTrack = styled.div<{ $index: number }>`
  background: var(--color-${props => props.$index === 1 ? 'line' : 'btn'}); border-radius: 8px; bottom: 0; height: 8px; top: 0;
`
const StyledThumb = styled.div`
  align-items: center; background: var(--color-bg); border: 2px solid var(--color-line); border-radius: 6px;
  color: var(--color-text); cursor: grab; display: flex; font-size: 12px; height: 30px;
  justify-content: center; line-height: 12px; outline: none; top: -11px; width: 30px;
`

const Range: React.FC<IRange> = ({ defaultVal = 10, handler, max, min = 0, step = 1 }) => {
  return (
    <RangeDiv>
      <ReactSlider
        min={min} max={max} step={step} defaultValue={defaultVal}
        renderThumb={(props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>}
        renderTrack={(props, state) => <StyledTrack {...props} $index={state.index} />}
        onChange={(val) => handler(val)}
      />
      <RangeNum className="left">{min}</RangeNum>
      <RangeNum className="right">{max}</RangeNum>
    </RangeDiv>
  )
}

export default Range
