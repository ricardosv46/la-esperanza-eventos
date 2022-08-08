import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import IconDate from '../../../public/icons/IconDate'
import Asientos, { IColums } from '../../components/asientos'
import Container from '../../components/container'
import Zoom from '../../components/zoom'
import { usePaymentContext } from '../../context/payment/PaymentState'
import { genNombreFilas } from '../../data/asientos'
import { gentituloButacas } from '../../data/tituloButacas'
import { useAsientosAbonado } from '../../services/useAsientosAbonado'

import { useButacas } from '../../services/useButacas'

const Detalle = () => {
	const navigation = useRouter()
	const { EnviarPago } = usePaymentContext()

	const [seleccionados, setSeleccionados] = useState<IColums[]>([])
	const { id, fecha, hora } = useRouter().query as any
	const { butacas, loading, refetch } = useButacas(id)

	const { asientos, refetch: refetchAsientos } = useAsientosAbonado({ feriaId: 1, tendido: id })

	const dataAsientos = useMemo(() => {
		if (butacas.length && !loading) {
			return butacas.map((item, i) => ({
				tendido: item?.tendido || '',
				butacaId: item?.butacaId || '',
				codigo: item?.codigo || '',
				cantidad: item?.cantidad || 0,
				precio: item?.precio || 0
			}))
		}
	}, [butacas, loading])

	useEffect(() => {
		refetch()
		refetchAsientos()
	}, [id])

	const total = seleccionados.reduce((previousValue, currentValue) => previousValue + currentValue.precio, 0)

	return (
		<div className='flex flex-col items-center justify-center w-full'>
			<section className='bg-white pt-5 w-full'>
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
				<p className='text-center text-3xl text-primary font-bold '>SELECCIONA TUS ASIENTOS</p>
				<div className='flex flex-col justify-center border-b-2 border-t-2 border-primary py-5 mt-5 overflow-hidden'>
					<div className='flex justify-between items-center  px-3 lg:px-8'>
						<p className=' text-base text-primary font-bold lg:text-xl'>{gentituloButacas(id)}</p>
						<div className='flex gap-3 items-center'>
							<IconDate fill='#4C000C' width={20} height={20} />
							<p className='text-primary font-bold lg:text-base text-xs'>{moment(fecha).format('LL')}</p>
						</div>
					</div>
					{dataAsientos?.length && (
						<Asientos
							{...{
								data: dataAsientos,
								desabilitados: asientos,
								seleccionados,
								setSeleccionados,
								nombreFilas: genNombreFilas(id)
							}}
							tipo='abono'
							doble={id === 'T2S' ? 'Tendido2' : id === 'T3' ? 'Tendido3' : 'Ruedo'}
							direccion={id === 'T3A' ? 'end' : id === 'T3B' ? 'start' : 'center'}
							id={id}
						/>
					)}
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
			</section>
			<div className=' bg-secondary  w-full flex justify-center'>
				<div className='py-10 px-5 max-w-[1200px] flex flex-col lg:flex-row justify-between w-full'>
					<div className='flex flex-col lg:flex-row gap-5 items-center'>
						<p className='text-primary font-bold'>Seleccionados:</p>
						<div className='flex flex-wrap lg:grid lg:grid-cols-10 leading-none gap-2'>
							{seleccionados.map((item) => (
								<p key={item.reservado} className='text-primary text-xs font-bold'>
									{item.reservado}
								</p>
							))}
						</div>
					</div>
					<div className='flex items-end'>
						<button
							disabled={seleccionados.length === 0}
							className='bg-tertiary px-5 py-2 text-white rounded-lg mt-10 lg:mt-0'
							onClick={() => {
								navigation.push({
									pathname: '/check-out/',
									query: { name: 'abono', fecha, hora, id }
								})
								EnviarPago(seleccionados)
							}}>
							COMPRAR: S/.{total.toFixed(2)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Detalle
