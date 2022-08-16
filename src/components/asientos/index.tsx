import { Console } from 'console'
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import IconRuedo from '../../../public/icons/IconRuedo'

import IconSearchMinus from '../../../public/icons/IconSearchMinus'
import IconSearchPlus from '../../../public/icons/IconSearchPlus'
import { gentamañosbutacas } from '../../data/gentamañosbutacas'
import Zoom from '../zoom'
interface IProps {
	data: Filas[]
	seleccionados: IColums[]
	setSeleccionados: Dispatch<SetStateAction<IColums[]>>
	desabilitados: any[]
	nombreFilas: string[]
	doble?: 'Ruedo' | 'Tendido2' | 'Tendido3'
	direccion?: 'start' | 'center' | 'end'
	tipo: 'abono' | 'evento'
	evento?: number
	id: string
}

interface Filas {
	tendido: string
	butacaId: string
	codigo: string
	cantidad: number
	precio: number
}

export interface IColums {
	reservado: string
	asiento: string
	precio: number
	codigo: string
	tendido: string
	feriaId: number
	eventoId?: number
}

const Asientos = ({
	seleccionados,
	setSeleccionados,
	data,
	desabilitados,
	nombreFilas,
	direccion = 'center',
	doble = 'Ruedo',
	tipo,
	evento,
	id
}: IProps) => {
	const filas = useMemo(() => {
		let tfilas: any = {}
		for (let i = 0; i < data.length; i++) {
			const fila = data[i].codigo
			const precio = data[i].precio
			const tendido = data[i].tendido

			tfilas[data[i].codigo] = new Array(data[i].cantidad).fill(null).map((_, i) => ({
				reservado: `${fila}-${i + 1}`,
				asientoId: (i + 1).toString(),
				tendido: tendido,
				codigo: fila,
				asiento: i + 1,
				precio: precio,
				feriaId: 1,
				eventoId: evento ? evento : 0
			}))
		}
		return tfilas
	}, [])

	const selectId = (itemselected: IColums) => {
		const validar = seleccionados.some((item) => item.reservado === itemselected.reservado)
		if (validar) {
			const newids = seleccionados.filter((item) => item.reservado !== itemselected.reservado)
			setSeleccionados(newids)
		} else {
			setSeleccionados([...seleccionados, itemselected])
		}
	}

	useEffect(() => {
		const newids = seleccionados.filter((seleccionado) => {
			const desabilitado = desabilitados.some(
				(desabilitado) => desabilitado?.reservado === seleccionado?.reservado
			)
			return !desabilitado
		})
		setSeleccionados(newids)
	}, [desabilitados])

	return (
		<Zoom id={id}>
			<div className='flex flex-col  justify-center items-center  px-5 w-full py-16 gap-1'>
				{Object.keys(filas).map((fila, index) => (
					<div key={fila} className='flex justify-center  items-center gap-5 w-full'>
						<div className='w-36  text-right'>
							<p className='text-[12px] text-primary font-semibold'>{nombreFilas[index]}</p>
						</div>
						<div
							className={`flex flex-row-reverse justify-${direccion} items-center gap-x-1.5  ${
								id === 'T1'
									? 'w-[1200px]'
									: id === 'T2S'
									? 'w-[2740px]'
									: id === 'T2B'
									? 'w-[1500px]'
									: id === 'T3'
									? 'w-[2100px]'
									: 'w-[700px]'
							} px-5 `}>
							{filas[`${fila.toString()}`].map(
								(
									{ reservado, precio, asiento, codigo, feriaId, tendido, eventoId }: IColums,
									index: any
								) => {
									if (index < asiento) {
										const isActive = seleccionados.some(
											(seleccionado) => seleccionado.reservado === reservado
										)

										const disabled = desabilitados.some((_item) => _item?.reservado === reservado)
										return (
											<button
												id={reservado}
												key={reservado}
												onClick={() => {
													if (tipo === 'abono') {
														selectId({
															reservado,
															precio,
															asiento: asiento.toString(),
															codigo,
															feriaId,
															tendido
														})
													}
													if (tipo === 'evento') {
														selectId({
															reservado,
															precio,
															asiento: asiento.toString(),
															codigo,
															feriaId,
															tendido,
															eventoId
														})
													}
												}}
												disabled={disabled}
												className={`
                                  ${
										disabled
											? 'bg-text text-white'
											: isActive
											? 'bg-butacas text-white'
											: 'bg-yellow-500  text-primary'
									}
                                   rounded-full  h-4 w-4  font-semibold  flex justify-center items-center `}>
												<p className='text-[7px] leading-0'>{asiento}</p>
											</button>
										)
									} else return null
								}
							)}
						</div>
						<div className='w-36'>
							<p className='text-[12px] text-primary font-semibold'>{nombreFilas[index]}</p>
						</div>
					</div>
				))}
				<div
					className={`${
						id === 'T1'
							? 'w-[1160px]'
							: id === 'T2S'
							? 'w-[2670px]'
							: id === 'T2B'
							? 'w-[1450px]'
							: id === 'T3'
							? 'w-[2000px]'
							: 'w-[650px]'
					} h-14 overflow-hidden relative mt-5 mx-auto`}>
					{doble === 'Tendido3' && (
						<div className='flex justify-between gap-5'>
							<div className='bg-text w-full  h-9'>
								<p className=' text-white flex justify-center items-center  w-full h-full'>
									TENDIDO 3B
								</p>
							</div>
							<div className='bg-text w-full  h-9'>
								<p className=' text-white flex justify-center items-center  w-full h-full'>
									TENDIDO 3A
								</p>
							</div>
						</div>
					)}
					{doble === 'Tendido2' && (
						<div className='flex'>
							<div className='bg-text w-full  h-9'>
								<p className=' text-white flex justify-center items-center  w-full h-full'>
									TENDIDO 2 BAJO
								</p>
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
							<div className='absolute top-0  text-white flex justify-center items-center  w-full h-full '>
								RUEDO
							</div>
						</>
					)}
				</div>
			</div>
		</Zoom>
	)
}

export default Asientos

{
	/* <div className='flex w-full justify-end gap-3 pt-2'>
					<button onClick={() => {}}>
						<IconSearchPlus fill='#4C000C' width={20} height={20}></IconSearchPlus>
					</button>
					<button onClick={() => {}}>
						<IconSearchMinus fill='#4C000C' width={20} height={20}></IconSearchMinus>
					</button>
				</div> */
}
