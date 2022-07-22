import { Console } from 'console'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import IconRuedo from '../../../public/icons/IconRuedo'

import IconSearchMinus from '../../../public/icons/IconSearchMinus'
import IconSearchPlus from '../../../public/icons/IconSearchPlus'
interface IProps {
  data: Filas[]
  seleccionados: IColums[]
  setSeleccionados: Dispatch<SetStateAction<IColums[]>>
  desabilitados: any[]
  nombreFilas: string[]
  doble?: 'Ruedo' | 'Tendido2' | 'Tendido3'
  direccion?: 'start' | 'center' | 'end' // default: "center"  start: es al final por el reverse y end: es al inicio
}

interface Filas {
  tendido: string
  butacaId: string
  codigo: string
  cantidad: number
  precio: number
}

export interface IColums {
  id: string
  asiento: number
  precio: number
}

const Asientos = ({
  seleccionados,
  setSeleccionados,
  data,
  desabilitados,
  nombreFilas,
  direccion = 'center',
  doble = 'Ruedo'
}: IProps) => {
  const filas = useMemo(() => {
    let tfilas: any = {}
    for (let i = 0; i < data.length; i++) {
      const fila = data[i].codigo
      const precio = data[i].precio
      const tendido = data[i].tendido

      tfilas[data[i].codigo] = new Array(data[i].cantidad).fill(null).map((_, i) => ({
        id: `${fila}-${i + 1}`,
        asientoId: (i + 1).toString(),
        tendido: tendido,
        codigo: fila,
        asiento: i + 1,
        precio: precio,
        feriaId: 1
      }))
    }
    return tfilas
  }, [])

  console.log(filas)

  console.log('desabili', desabilitados)

  const selectId = (itemselected: IColums) => {
    const validar = seleccionados.some((item) => item.id === itemselected.id)
    if (validar) {
      const newids = seleccionados.filter((item) => item.id !== itemselected.id)
      setSeleccionados(newids)
    } else {
      setSeleccionados([...seleccionados, itemselected])
    }
  }
  console.log('dedabiolitado', desabilitados)
  console.log('elmofafsaf', desabilitados[0]?.codigo + '-' + desabilitados[0]?.asiento)

  return (
    <div className='flex gap-3 justify-start pt-3 '>
      <TransformWrapper initialScale={1}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <div className='flex flex-col items-center  w-full'>
            <div className=' w-full snap-section overflow-x-auto custom-scroll max-w-[95vw]'>
              <TransformComponent>
                <div className='py-10'>
                  <div className='flex flex-col  justify-center items-center  px-5 w-full '>
                    {Object.keys(filas).map((fila, index) => (
                      <div key={fila} className='flex justify-between items-center gap-5 w-full '>
                        <div className='w-36 lg:w-24  text-right'>
                          <p className=' text-base lg:text-[10px] text-primary font-semibold'>{nombreFilas[index]}</p>
                        </div>
                        <div className={`flex flex-row-reverse justify-${direccion} items-center gap-1 flex-1`}>
                          {filas[`${fila.toString()}`].map(({ id, precio, asiento }: IColums, index: any) => {
                            if (index < asiento) {
                              const isActive = seleccionados.some((seleccionado) => seleccionado.id === id)
                              console.log(id)
                              const disabled = desabilitados.some(
                                (_item) => _item?.codigo + '-' + _item?.asiento === id
                              )
                              return (
                                <button
                                  id={id}
                                  key={id}
                                  onClick={() => selectId({ id, precio, asiento })}
                                  disabled={disabled}
                                  className={`
                                  ${
                                    disabled
                                      ? 'bg-text text-white'
                                      : isActive
                                      ? 'bg-primary text-white'
                                      : 'bg-yellow-500  text-primary'
                                  }
                                   rounded-full h-5 w-5 lg:h-3 lg:w-3  font-semibold  flex justify-center items-center lg:text-[5px] text-[10px] `}>
                                  {asiento}
                                </button>
                              )
                            } else return null
                          })}
                        </div>
                        <div className='w-36 lg:w-24 '>
                          <p className='text-base lg:text-[10px] text-primary font-semibold'>{nombreFilas[index]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='h-14 overflow-hidden relative mt-5 mx-48 lg:mx-36'>
                    {doble === 'Tendido3' && (
                      <div className='flex justify-between gap-5'>
                        <div className='bg-text w-full  h-9'>
                          <p className=' text-white flex justify-center items-center  w-full h-full'>TENDIDO 3B</p>
                        </div>
                        <div className='bg-text w-full  h-9'>
                          <p className=' text-white flex justify-center items-center  w-full h-full'>TENDIDO 3A</p>
                        </div>
                      </div>
                    )}
                    {doble === 'Tendido2' && (
                      <div className='flex'>
                        <div className='bg-text w-full  h-9'>
                          <p className=' text-white flex justify-center items-center  w-full h-full'>TENDIDO 2 BAJO</p>
                        </div>
                      </div>
                    )}
                    {doble === 'Ruedo' && (
                      <>
                        <svg viewBox='0 0 500 150' preserveAspectRatio='none' className='w-full h-full'>
                          <path
                            d='M0.00,49.98 C-71.95,55.77 250.27,-17.25 500.00,49.98 L500.00,120.00 L-0.27,117.94 Z'
                            className='fill-text '></path>
                        </svg>
                        <div className='absolute top-0 z-10 text-white flex justify-center items-center  w-full h-full '>
                          RUEDO
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </TransformComponent>
            </div>
            <div className='flex w-full justify-end gap-3 pt-2'>
              <button onClick={() => zoomIn()}>
                <IconSearchPlus fill='#4C000C' width={20} height={20}></IconSearchPlus>
              </button>
              <button onClick={() => zoomOut()}>
                <IconSearchMinus fill='#4C000C' width={20} height={20}></IconSearchMinus>
              </button>
            </div>
          </div>
        )}
      </TransformWrapper>
    </div>
  )
}

export default Asientos
