import React from 'react'
import useForm from '../../hooks/useForm'
import InputFloat from '../inputs/InputFloat'

const FormRegister = () => {
  const { nombre, apellido, email, password, onChange } = useForm({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  })
  return (
    <div className='flex flex-col gap-5 '>
      <InputFloat
        type='text'
        className='lg:w-full'
        label='Nombre'
        name='nombre'
        value={nombre}
        onChange={onChange}
      />
      <InputFloat
        type='text'
        className='lg:w-full'
        label='Apellido'
        name='apellido'
        value={apellido}
        onChange={onChange}
      />
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

export default FormRegister
