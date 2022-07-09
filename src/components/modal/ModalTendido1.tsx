import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import Modal from '.'
import IconDate from '../../../public/icons/IconDate'
import Asientos, { IColums } from '../asientos'

interface Props {
  onClose: () => void
  isOpen: boolean
  onClick: () => void
}

const ModalTendido1 = ({ isOpen, onClose, onClick }: Props) => {
  const [seleccionados, setSeleccionados] = useState<IColums[]>([])

  const data = [
    { fila: 'T1-F3-', columnas: 53, precio: 50 },
    { fila: 'T1-CB-', columnas: 48, precio: 100 },
    { fila: 'T1-B-', columnas: 46, precio: 150 }
  ]

  const total = seleccionados.reduce(
    (previousValue, currentValue) => previousValue + currentValue.precio,
    0
  )

  const desabilitados = ['T1-F3-10', 'T1-F3-15', 'T1-F3-20']
  const nombreFilas = ['F03', 'CONTRA BARRERA', 'BARRERA']
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='h-full md:h-auto w-full md:w-auto p-3 overflow-y-scroll no-scrollbar '
    >
      <section className='bg-white  rounded-lg pt-5 relative overflow-hidden'>
        <button
          onClick={onClose}
          className='absolute top-2 right-4 text-primary font-bold cursor-pointer'
        >
          X
        </button>
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
        <p className='text-center text-3xl text-primary font-bold'>
          SELECCIONA TUS ASIENTOS
        </p>
        <div className='flex flex-col justify-center border-b-2 border-t-2 border-primary py-5 mt-5 mx-5'>
          <div className='flex justify-between items-center lg:px-8'>
            <p className=' text-base text-primary font-bold lg:text-xl'>
              Tendido 1 Sombra
            </p>
            <div className='flex gap-3 items-center'>
              <IconDate fill='#4C000C' width={20} height={20} />
              <p className='text-primary font-bold lg:text-base text-xs'>
                Sábado 23 de julio
              </p>
            </div>
          </div>

          <Asientos
            {...{
              data,
              desabilitados,
              seleccionados,
              setSeleccionados,
              nombreFilas
            }}
          />
        </div>
        <div className='p-5 flex gap-3 text-sm lg:text-base'>
          <div className='flex gap-2 items-center'>
            <span className='w-2.5 h-2.5 bg-primary rounded-full'></span>
            <p className='text-tertiary'>Seleccionados</p>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='w-2.5 h-2.5 bg-secondary rounded-full'></span>
            <p className='text-tertiary'>Libres</p>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='w-2.5 h-2.5 bg-text rounded-full'></span>
            <p className='text-tertiary'>No disponibles</p>
          </div>
        </div>
        <div className='py-10 px-5 bg-secondary flex flex-col lg:flex-row justify-between'>
          <div className='flex flex-col lg:flex-row gap-5 items-center'>
            <p className='text-primary font-bold'>Seleccionados:</p>
            <div className='flex flex-wrap lg:grid lg:grid-cols-10 leading-none gap-2'>
              {seleccionados.map((item) => (
                <p key={item.id} className='text-primary text-xs font-bold'>{item.id}</p>
              ))}
            </div>
          </div>
          <div className='flex items-end'>
            <button className='bg-tertiary px-5 py-2 text-white rounded-lg mt-10 lg:mt-0'>
              COMPRAR: S/.{total.toFixed(2)}
            </button>
          </div>
        </div>
      </section>
    </Modal>
  )
}

export default ModalTendido1
