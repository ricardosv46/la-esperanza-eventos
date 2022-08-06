import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import IconCalendar from '../../../../public/icons/IconCalendar'
import IconHour from '../../../../public/icons/IconHour'
import Container from '../../../components/container'
import Spinner from '../../../components/spinner'

import { eventos } from '../../../data/eventos'
import { useEventoSlug } from '../../../services/useEventoSlug'
import { usePreciosRefs } from '../../../services/usePreciosRefs'

const colors = ['bg-[#F89F59]', 'bg-[#FFD066]', 'bg-[#FFDA99]', 'bg-[#D03B3E]', 'bg-[#E7565C]', 'bg-[#E7565C]']

const Compra = () => {
	const { slug } = useRouter().query as { slug: string }
	const router = useRouter()

	const { eventoSlug, loading, refetch } = useEventoSlug(slug)
	const handleClick = (id: string) => {
		router.push({
			pathname: `/eventos/${slug}/${id}`,
			query: { fecha: eventoSlug?.fecha, hora: eventoSlug?.hora }
		})
	}

	useEffect(() => {
		if (!loading) {
			if (eventoSlug?.eventoId) {
			} else {
				router.push('/eventos')
			}
		}
	}, [loading])

	const { precios } = usePreciosRefs()

	useEffect(() => {
		refetch()
	}, [slug])

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div className='w-full  relative '>
					{eventoSlug?.imagenPrincipal?.url && (
						<Image
							src={eventoSlug?.imagenPrincipal?.url}
							width={'100%'}
							height={'100%'}
							layout='fill'
							objectFit='cover'
							className='-z-10'
							alt='flyer'
						/>
					)}
					<Container bgColor='backdrop-blur-lg' className=' pt-36 pb-5 text-primary '>
						<main className='lg:px-5 flex flex-col lg:flex-row gap-5'>
							<section className='lg:relative w-full lg:w-[760px]  lg:h-[780px] gap-5  flex flex-col lg:flex-row'>
								<div className='bg-white w-full h-full rounded-lg'>
									<div className='flex flex-col  py-5 px-8'>
										<div className=''>
											<h1 className='text-3xl font-extrabold'>{eventoSlug?.titulo}</h1>
											<p className='text-2xl '>Compra tu Abono</p>
										</div>
										<div className='flex gap-x-5 items-center mt-4'>
											<div className='flex gap-x-3'>
												<div className='mt-0.5'>
													<IconCalendar width={16} height={16} fill='#4C000C' />
												</div>

												<div className=''>{moment(eventoSlug?.fecha).format('LL')}</div>
											</div>
											<div className='flex gap-x-3'>
												<div className='mt-0.5'>
													<IconHour width={16} height={16} fill='#4C000C' />
												</div>
												<div className=''>{moment(eventoSlug?.fecha + ' ' + eventoSlug?.hora).format('hh:mm A')}</div>
											</div>
										</div>
										<div className='flex justify-center mt-5'>
											<Image src={`/imgs/compra/coliseo.jpg`} alt='Picture of the author' width={600} height={600} />
										</div>
									</div>
								</div>
							</section>

							<section className='bg-white flex-1 rounded-lg   shadow-lg border'>
								<article className='flex flex-col gap-2 p-3 lg:px-3 '>
									{eventoSlug?.imagenPrincipal?.url && (
										<Image
											src={eventoSlug?.imagenPrincipal?.url}
											alt='Picture of the author'
											loading='lazy'
											width={500}
											height={350}
											className='object-cover'
										/>
									)}

									<h2 className='text-[27px] text-center mt-2 text-primary font-bold '>{eventoSlug?.titulo}</h2>
									<div className='flex gap-x-5 justify-center items-center'>
										<div className='flex gap-x-3'>
											<div className='mt-0.5'>
												<IconCalendar width={16} height={16} fill='#4C000C' />
											</div>

											<div className=''>{moment(eventoSlug?.fecha).format('LL')}</div>
										</div>
										<div className='flex gap-x-3'>
											<div className='mt-0.5'>
												<IconHour width={16} height={16} fill='#4C000C' />
											</div>
											<div className=''>{moment(eventoSlug?.fecha + ' ' + eventoSlug?.hora).format('hh:mm A')}</div>
										</div>
									</div>
									<p className='text-md text-text text-center border-b border-black pb-5'>
										¡Disfruta una emocionante tarde de toros en la comodidad de nuestras butacas!
									</p>
								</article>
								<article className='mb-5'>
									<p className='text-2xl text-primary font-bold px-3 pb-3'>Entradas</p>
									<section className='flex flex-col'>
										{precios.map((item, index) => (
											<article
												key={item?.tendido}
												className={`${
													index % 2 === 0 ? 'bg-[#F3F3F3]' : 'bg-white'
												}    flex justify-between p-3 items-center`}>
												<div className='flex-1 text-[10px]'>
													<div>
														<p className='text-sm text-primary font-semibold leading-5'>{item?.titulo}</p>
														<p className='text-sm text-primary font-semibold leading-5'>desde </p>
													</div>
												</div>
												<p className='flex-1 text-center text-[20px] font-semibold'>S/ {item?.precio}</p>
												<div className='flex-1'>
													<button
														onClick={() => handleClick(item?.tendido!)}
														className={` px-6 py-2 mt-2 text-sm rounded-sm text-white font-semibold cursor-pointer ${colors[index]} `}>
														<p>Comprar</p>
													</button>
												</div>
											</article>
										))}
									</section>
								</article>
							</section>
						</main>
					</Container>
					<Container bgColor='bg-white' className='flex flex-col lg:flex-row justify-between gap-10 p-5'>
						<article className='w-full bg-white rounded-lg p-5  flex flex-col gap-5 border shadow-lg z-0'>
							<h1 className='text-2xl lg:text-5xl text-primary font-bold '>Vive la emoción de cerca!</h1>
							<p className='text-md text-primary '>{eventoSlug?.descripcionLarga}</p>
							<p className='text-md text-primary font-bold'>Información adicional</p>
							<p>Términos y condiciones:</p>
							<p className='-mt-5'>ANTES DE COMPRAR:</p>

							<p>{eventoSlug?.terminosCondiciones}</p>
						</article>

						<section className='py-5 flex justify-center items-start lg:justify-end z-0'>
							<article className='border w-full  lg:w-[280px] xl:w-[380px] p-3 rounded-md flex flex-col gap-1  shadow-xl'>
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
			)}
		</>
	)
}

export default Compra
