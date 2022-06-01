import React from 'react'
import useForm from '../../hooks/useForm'
import InputFloat from '../inputs/InputFloat'

const FormLogin = () => {
  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  })

  return (
    <div className='flex flex-col gap-5 '>
      <InputFloat
        type='email'
        className='lg:w-full'
        label='E-mail'
        name='email'
        value={email}
        onChange={onChange}
      />
      <InputFloat
        type='password'
        className='lg:w-full'
        label='Contraseña'
        name='password'
        value={password}
        onChange={onChange}
      />
    </div>
  )
}

export default FormLogin
