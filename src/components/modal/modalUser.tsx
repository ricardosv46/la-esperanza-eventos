import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
      component = <FormLogin />
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
      width='w-[95%] lg:w-[750px]'
      height='md:h-[500px]'
    >
      <div className='py-2 md:py-0 text-left overflow-hidden shadow-xl rounded-2xl bg-white'>
        <div className='flex w-full '>
          <div className='flex-1 hidden md:flex items-center justify-center '>
            <Image
              src='/imgs/home/torero.jpg'
              alt='Torero'
              width={500}
              height={800}
              objectFit='cover'
            />
          </div>
          <div className='flex-1 p-6'>
            <h2 className='text-blue font-bold text-2xl text-primary'>
              {textoBtnCambiarForm()[2]}
            </h2>

            <hr className='my-8 bg-blue-500 ' />
            {asignarFormulario()}
            <div className='mt-5 flex justify-end'>
              <button className=' bg-primary text-white cursor-pointer px-8 py-3 rounded-full '>
                {textoBtnCambiarForm()[3]}
              </button>
            </div>
            <div className='mt-3'>
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
        </div>
      </div>
    </Modal>
  )
}

export default ModalUser
