import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import IconCalendar from '../../../public/icons/IconCalendar'
import IconHour from '../../../public/icons/IconHour'
import Container from '../../components/container'
import Spinner from '../../components/spinner'
import { useAbonado } from '../../services/useAbonado'
import { usePreciosRefs } from '../../services/usePreciosRefs'

const colors = ['bg-[#F89F59]', ' bg-[#FFD066]', 'bg-[#FFDA99]', 'bg-[#D03B3E]', 'bg-[#E7565C]', 'bg-[#E7565C]']

const Abonados = () => {
	const { abono, loading } = useAbonado()
	console.log(abono)
	const router = useRouter()
	const handleModal = (id: string) => {
		router.push({
			pathname: `/abonados/${id}`,
			query: { fecha: abono?.fecha, hora: abono?.hora }
		})
	}
	const { precios } = usePreciosRefs()

	return (
		<>
			<div className='w-full  relative '>
				{loading ? (
					<Spinner />
				) : (
					<Image
						src={abono?.imagenPrincipal?.url!}
						width={'100%'}
						height={'100%'}
						layout='fill'
						objectFit='cover'
						className='-z-10 '
						alt='flyer'
					/>
				)}
				<Container bgColor='backdrop-blur-lg' className=' pt-36 pb-5 text-primary'>
					<main className='lg:px-5 flex flex-col lg:flex-row gap-5'>
						<section className=' w-full lg:w-[760px]  lg:h-[780px] gap-5  flex flex-col lg:flex-row'>
							<div className='bg-white w-full h-full rounded-lg'>
								<div className='flex flex-col  py-5 px-8'>
									<div className=''>
										<h1 className='text-3xl font-extrabold'>{abono?.titulo}</h1>
										<h2 className='text-3xl font-extrabold'>Compra tu Abono</h2>
									</div>
									<div className='flex gap-x-5 items-center mt-4'>
										<div className='flex gap-x-3'>
											<div className='mt-0.5'>
												<IconCalendar width={16} height={16} fill='#4C000C' />
											</div>

											<div className=''>{moment(abono?.fecha).format('LL')}</div>
										</div>
										<div className='flex gap-x-3'>
											<div className='mt-0.5'>
												<IconHour width={16} height={16} fill='#4C000C' />
											</div>
											<div className=''>{moment(abono?.fecha + ' ' + abono?.hora).format('hh:mm A')}</div>
										</div>
									</div>
									<div className='flex justify-center mt-5 '>
										<Image
											src={`/imgs/compra/coliseo.jpg`}
											alt='Picture of the author'
											objectFit='cover'
											width={600}
											height={600}
										/>
									</div>
								</div>
							</div>
						</section>

						<section className='bg-white flex-1 rounded-lg p-5 lg:px-8 py-5 shadow-lg border'>
							{loading ? (
								<Spinner />
							) : (
								<article className='flex flex-col gap-2'>
									<Image
										src={abono?.imagenSecundaria?.url!}
										alt='Picture of the author'
										width={500}
										height={350}
										loading='lazy'
										className='object-cover'
									/>
									<h2 className='text-2xl text-center mt-2 text-primary font-bold '>{abono?.titulo}</h2>
									<div className='flex gap-x-5 justify-center items-center'>
										<div className='flex gap-x-3'>
											<div className='mt-0.5'>
												<IconCalendar width={16} height={16} fill='#4C000C' />
											</div>

											<div className=''>{moment(abono?.fecha).format('LL')}</div>
										</div>
										<div className='flex gap-x-3'>
											<div className='mt-0.5'>
												<IconHour width={16} height={16} fill='#4C000C' />
											</div>
											<div className=''>{moment(abono?.fecha + ' ' + abono?.hora).format('hh:mm A')}</div>
										</div>
									</div>
									<p className='text-md text-text text-center'>
										¡Disfruta una emocionante tarde de toros en la comodidad de nuestras butacas!
									</p>
								</article>
							)}
							<article className='my-5'>
								<h2 className='text-2xl text-primary font-bold '>Entradas</h2>
								<section className='flex flex-col gap-2'>
									{precios?.map((item, index) => (
										<article
											key={item?.tendido}
											className='shadow-md rounded-lg bg-[#f9f9f9] border flex justify-between p-3 items-center '>
											<div>
												<p className='text-sm text-primary font-semibold leading-5'>{item?.titulo}</p>
												<p className='text-sm text-primary font-semibold leading-5'>desde S/ {item?.precio}</p>
											</div>

											<button
												onClick={() => handleModal(item?.tendido!)}
												className={`py-2 px-8 rounded-md text-white font-semibold ${colors[index]} `}>
												Asientos
											</button>
										</article>
									))}
								</section>
							</article>
						</section>
					</main>
				</Container>
				<Container bgColor='bg-white' className='flex justify-between gap-10 p-5 '>
					<article className='w-full bg-white rounded-lg  top-[30.5rem] p-5 lg:p-9 flex flex-col gap-5 border shadow-lg z-0'>
						<h1 className='text-2xl lg:text-5xl text-primary font-bold '>Vive la emoción de cerca!</h1>
						<p className='text-md text-primary font-semibold'>{abono.descripcionLarga}</p>
						<p className='text-md text-primary font-bold'>Información adicional</p>
						<h3>Términos y condiciones:</h3>
						<h3 className='-mt-5'>ANTES DE COMPRAR:</h3>
						{abono?.terminosCondiciones}
					</article>

					<section className='py-5 flex justify-center items-start z-0'>
						<article className='border w-full  lg:w-[280px] xl:w-[380px] p-3 rounded-md flex flex-col gap-1 shadow-xl'>
							<h2 className='text-2xl text-primary font-bold'>Lurín, Lima</h2>
							<p className='text-md text-text font-semibold'>Fundo La Esperanza</p>
							<div className='w-full'>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d124765.90864455116!2d-76.87008!3d-12.252702!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6836d2dfddd46029!2sFundo%20La%20Esperanza%20-%20Lur%C3%ADn!5e0!3m2!1sen!2sus!4v1653950659611!5m2!1sen!2sus'
									width='100%'
									height='350'
									loading='lazy'
								/>
							</div>
						</article>
					</section>
				</Container>
			</div>
		</>
	)
}

export default Abonados
