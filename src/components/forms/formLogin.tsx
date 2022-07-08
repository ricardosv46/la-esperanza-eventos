import { useRouter } from 'next/router'
import React from 'react'
import useForm from '../../hooks/useForm'
import InputFloat from '../inputs/InputFloat'

interface IProps {
  onClose: () => void
}
const FormLogin = ({ onClose }: IProps) => {
  const navigate = useRouter()
  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  })

  return (
    <div className='flex flex-col gap-5 '>
      <InputFloat
        type='email'
        label='E-mail'
        name='email'
        value={email}
        onChange={onChange}
      />
      <InputFloat
        type='password'
        label='Contraseña'
        name='password'
        value={password}
        onChange={onChange}
      />
      <div className='mt-7 flex justify-end'>
        <button className=' bg-primary text-white cursor-pointer w-full  py-3 rounded-lg'
          onClick={() => { navigate.push(`/mi-cuenta`); onClose() }}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  )
}

export default FormLogin
