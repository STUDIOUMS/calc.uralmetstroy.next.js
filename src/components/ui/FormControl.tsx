'use client'
import styled from "styled-components"

interface IFormControl {
  register: any
  num?: number
  placeholder?: string
  type?: 'text' | 'number' | 'email'
  error: boolean
}

// Styles
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`
const Num = styled.div`
  background: var(--color-white);
  border-radius: 100px;
  border: 2px solid var(--color-warning);
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.10);
  font-size: 10px;
  height: 24px;
  font-weight: 700;
  line-height: 20px;
  position: absolute;
  right: 13px;
  text-align: center;
  top: 13px;
  width: 24px;
  @media screen and (max-width: 720px) {
    height: 17px;
    line-height: 13px;
    width: 17px;
  }
`
const Input = styled.input<{ $error?: boolean }>`
  background: var(--color-bg);
  border: 1px solid var(--color-${props => props.$error ? 'danger' : 'line'});
  border-radius: 50px;
  color: var(--color-black);
  font-family: var(--ff);
  font-size: 15px;
  font-weight: 500;
  height: 50px;
  outline: none;
  padding: 10px 16px;
  width: 100%;
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::placeholder { opacity: 0.7; }
  &[type=number] {
    -moz-appearance: textfield;
  }
  @media screen and (max-width: 720px) {
    height: 44px;
  }
`

const FormControl: React.FC<IFormControl> = ({ register, num, placeholder, type = 'text', error }) => {
  let count = (num !== undefined) ? num + 1 : null

  return (
    <InputWrapper>
      <Input
        placeholder={placeholder}
        type={type}
        {...register}
        $error={!!error}
      />
      {count && <Num>{count}</Num>}
    </InputWrapper>
  )
}

export default FormControl
