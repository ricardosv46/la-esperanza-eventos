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
        label='Nombre'
        name='nombre'
        value={nombre}
        onChange={onChange}
      />
      <InputFloat
        type='text'
        label='Apellido'
        name='apellido'
        value={apellido}
        onChange={onChange}
      />
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
        <button className=' bg-primary text-white cursor-pointer w-full  py-3 rounded-lg'>
          Registrarse
        </button>
      </div>
    </div>
  )
}

export default FormRegister
