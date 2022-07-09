import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import IconSearchMinus from '../../../public/icons/IconSearchMinus'
import IconSearchPlus from '../../../public/icons/IconSearchPlus'
interface IProps {
  data: Filas[]
  seleccionados: IColums[]
  setSeleccionados: Dispatch<SetStateAction<IColums[]>>
  desabilitados: string[]
}

interface Filas {
  fila: string
  columnas: number
}

export interface IColums {
  id: string
  estado: string
  numero: number
  precio: number
}

const Asientos = ({
  seleccionados,
  setSeleccionados,
  data,
  desabilitados
}: IProps) => {
  const filas = useMemo(() => {
    let tfilas: any = {}
    for (let i = 0; i < data.length; i++) {
      const fila = data[i].fila
      tfilas[data[i].fila] = new Array(data[i].columnas)
        .fill(null)
        .map((_, i) => ({
          id: `${fila}${i + 1}`,
          estado: 'Disponible',
          numero: i + 1,
          precio: 50
        }))
    }
    return tfilas
  }, [])

  const selectId = (item: IColums) => {
    if (seleccionados.includes(item)) {
      const newids = seleccionados.filter((item) => item !== item)
      setSeleccionados(newids)
    } else {
      setSeleccionados([...seleccionados, item])
    }
  }

  return (
    <div className='flex gap-3 justify-start overflow-x-scroll no-scrollbar '>
      <TransformWrapper initialScale={1}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <div className='overflow-x-scroll no-scrollbar flex flex-col items-center  w-full '>
            <div className=' overflow-x-hidden '>
              <TransformComponent
                contentStyle={{
                  padding: '40px 20px'
                }}
              >
                <div className='flex flex-col gap-3 justify-center items-center '>
                  {Object.keys(filas).map((fila) => (
                    <div
                      key={fila}
                      className='flex justify-center items-center gap-1'
                    >
                      {filas[`${fila.toString()}`].map(
                        (
                          { id, estado, precio, numero }: IColums,
                          index: any
                        ) => {
                          if (index < numero) {
                            const isActive = seleccionados.some(
                              (seleccionado) => seleccionado.id === id
                            )
                            const disabled = desabilitados.some(
                              (_id) => _id === id
                            )
                            return (
                              <button
                                id={id}
                                key={id}
                                onClick={() =>
                                  selectId({ id, estado, precio, numero })
                                }
                                disabled={disabled}
                                className={`${
                                  isActive && 'bg-primary text-white'
                                } ${
                                  disabled && 'bg-text text-white'
                                } rounded-full h-2.5 w-2.5 bg-yellow-500 flex justify-center items-center`}
                              >
                                <div className='text-[3px] leading-5'>{id}</div>
                              </button>
                            )
                          } else return null
                        }
                      )}
                    </div>
                  ))}
                </div>
              </TransformComponent>
            </div>
            <div className='flex w-full justify-end gap-3 '>
              <button onClick={() => zoomIn()}>
                <IconSearchPlus
                  fill='#4C000C'
                  width={20}
                  height={20}
                ></IconSearchPlus>
              </button>
              <button onClick={() => zoomOut()}>
                <IconSearchMinus
                  fill='#4C000C'
                  width={20}
                  height={20}
                ></IconSearchMinus>
              </button>
            </div>
          </div>
        )}
      </TransformWrapper>
    </div>
  )
}

export default Asientos
