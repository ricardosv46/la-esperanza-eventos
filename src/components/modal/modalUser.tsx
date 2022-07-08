import Image from 'next/image'
import React, { useState } from 'react'
import FormLogin from '../forms/formLogin'
import FormRegister from '../forms/formRegister'
import Modal from '.'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ModalUser = ({ isOpen, onClose }: Props) => {
  const [tipoForm, setTipoForm] = useState('registrate')

  const asignarFormulario = () => {
    let component = null

    if (tipoForm === 'ingresar') {
      component = <FormLogin onClose={onClose} />
    } else if (tipoForm === 'registrate') {
      component = <FormRegister />
    }

    return component
  }

  const cambiarFormulario = () => {
    if (tipoForm === 'ingresar') {
      setTipoForm('registrate')
    } else if (tipoForm === 'registrate') {
      setTipoForm('ingresar')
    }
  }

  const textoBtnCambiarForm = () => {
    const textos = []

    if (tipoForm === 'ingresar') {
      textos[0] = 'Si no tienes una cuenta '
      textos[1] = 'regístrate aquí'
      textos[2] = 'Iniciar sesión'
      textos[3] = 'Ingresar'
    } else if (tipoForm === 'registrate') {
      textos[0] = 'Si ya tienes una cuenta '
      textos[1] = 'ingrese por aquí'
      textos[2] = 'Regístrate'
      textos[3] = 'Regístrate'
    }

    return textos
  }

  const variants = {
    open: {
      scale: 1,
      opacity: 1,
      transition: { ease: 'easeInOut' }
    },
    closed: {
      scale: 0.9,
      opacity: 0,
      transition: { ease: 'easeOut' }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='w-[95%] md:w-[800px] md:h-[540px] flex rounded-xl shadow-lg overflow-hidden'
    >
      <div className='w-full hidden md:block lg:w-1/2'>
        <Image
          src='/imgs/home/torero.jpg'
          alt='Torero'
          width={500}
          height={800}
          objectPosition='center'
          objectFit='cover'
        />
      </div>
      <div className=' w-full lg:w-1/2 p-6 bg-white'>
        <div className='flex justify-center mb-5'>
          <Image
            objectFit='scale-down'
            className='cursor-pointer filter-logo'
            src='/imgs/logos/logo.png'
            width={200}
            height={80}
            alt='logo'
          />
        </div>

        {asignarFormulario()}

        <div className='mt-7'>
          <p className='text-base text-gray-400'>
            {textoBtnCambiarForm()[0]}
            <span
              className='text-primary cursor-pointer'
              onClick={cambiarFormulario}
            >
              {textoBtnCambiarForm()[1]}
            </span>{' '}
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default ModalUser
