import { text } from 'node:stream/consumers'
import React, { ChangeEvent } from 'react'
interface IProps {
  label: string
  value: string
  name: string
  className?: string
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const InputFloat = ({
  label,
  value,
  name,
  onChange,
  className,
  type = 'text'
}: IProps) => {
  return (
    <div
      className={`rounded border-2 border-slate-200  focus-within:border-primary-300 h-12 flex px-3 focus-within:pt-3  items-center  ${
        value.length > 0 ? 'pt-3' : ''
      } ${className}`}
    >
      <div className='relative w-full'>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=' '
          className='block w-full appearance-none focus:outline-none bg-transparent text-primary-300 font-semibold'
        />
        <label
          htmlFor={name}
          className='absolute left-0 top-0 -z-1 text-slate-400 text-lg font-semibold label '
        >
          {label}
        </label>
      </div>
    </div>
  )
}

export default InputFloat
