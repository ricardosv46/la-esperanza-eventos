import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import IconCalendar from '../../../public/icons/IconCalendar'
import IconHour from '../../../public/icons/IconHour'
import OpenGraph from '../../components/openGraph'
import Spinner from '../../components/spinner'
import { useAbonado } from '../../services/useAbonado'
import { useEventos } from '../../services/useEventos'
import { useEventoSlug } from '../../services/useEventoSlug'

const Eventos = () => {
  const navigate = useRouter()

  const { abono, loading } = useAbonado()

  const { eventos } = useEventos({ estado: 'Activado', feriaId: 1 })

  console.log(eventos)

  return (
    <>
      <OpenGraph
        title='La Esperanza - Eventos'
        link='La Esperanza'
        description='Compra tus entradas del mejor evento de la ciudad.'
        domain='la-esperanza-eventos.vercel.app'
        img='https://la-esperanza-eventos.vercel.app/imgs/flyers/flyer1.jpg'
        keywords='Entradas,Eventos,PLazas'
        url='https://la-esperanza-eventos.vercel.app/eventos'
      />

      <div className='bg-fondo pb-10'>
        <div className=' flex flex-col md:flex-row justify-between max-w-[1200px] gap-x-5 items-center  mx-auto px-5 pt-10'>
          <div className=''>
            <h1 className='text-3xl font-bold'>Compra tu abono para toda la temporada</h1>
            <p className='text-base w-full max-w-[530px] mt-5 text-justify'>
              La compra de abonos está ya <strong>disponible</strong> exclusivamente a través de nuestra plataforma
              online. Compra ahora tus abonos con un {abono.descuento}% de descuento y disfruta de la mejor fiesta
              taurina de la temporada.
            </p>
          </div>
          <div className='mt-5'>
            <div className='bg-primary w-40  text-white font-bold leading-4 text-xs px-5 py-1'>
              <p className=''>hasta</p>
              <p className='text-6xl font-black'>{abono.descuento}%</p>
              <p className='text-right'>De descuento</p>
            </div>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col  max-w-[1200px]  mx-auto px-5 mt-10'>
            <div className='mx-auto'>
              <div>
                <div className='mt-5 relative hidden sm:block'>
                  <Image src={abono?.imagenPrincipal?.url!} loading='lazy' alt='descuento' width={1000} height={250} />
                  <div className='absolute w-full  bottom-5 md:bottom-10 '>
                    <div className='w-full flex flex-col gap-1 md:gap-y-2 items-center'>
                      <h2 className='text-xs sm:text-3xl md:text-4xl text-yellow-500 font-semibold'>{abono?.titulo}</h2>
                      <p className='text-white'>{abono?.descripcion}</p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 relative sm:hidden'>
                  <Image
                    src={abono?.imagenPrincipal?.url!}
                    objectFit='cover'
                    loading='lazy'
                    alt='descuento'
                    width={400}
                    height={400}
                  />
                  <div className='absolute w-full px-10 bottom-10 left-1/2 -translate-x-1/2  text-center'>
                    <h2 className='text-2xl text-yellow-500'> {abono?.titulo}</h2>
                    <p className='text-white'>{abono?.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-center border-b border-black pb-14'>
              <button
                onClick={() => navigate.push(`/abonados`)}
                style={{ boxShadow: '-8px 6px 13px 0px rgba(0,0,0,0.42)' }}
                className='bg-tertiary px-6 py-2 mt-5 text-md rounded-sm text-white font-semibold cursor-pointer  shadow-primary'>
                Comprar tu abono
              </button>
            </div>
          </div>
        )}

        <div className='flex flex-col  max-w-[1200px]  mx-auto px-5  mt-10'>
          <div className='my-10'>
            <h1 className='text-3xl font-bold'>Elige el evento</h1>
            <p className='text-base w-full max-w-[530px] mt-5 text-justify'>
              La compra de abonos está ya <strong>disponible</strong> exclusivamente a través de nuestra plataforma
              online. Compra ahora tus abonos con un 20% de descuento y disfruta de la mejor fiesta taurina de la
              temporada.
            </p>
          </div>

          <div className='grid pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center text-[#505050] '>
            {eventos.map((item) => (
              <article
                key={item?.eventoId}
                style={{ boxShadow: '-14px 14px 14px -5px rgba(0,0,0,0.42)' }}
                className='max-w-[300px] mx-auto sm:mx-0 sm:max-w-none bg-white px-7 py-7 rounded-md shadow-md'>
                <div className='flex gap-x-5 text-[13px]'>
                  <div className='flex items-center gap-x-1'>
                    <div className=''>
                      <IconCalendar width={14} height={14} />
                    </div>

                    <div className='mt-0.5'>{item?.fecha}</div>
                  </div>
                  <div className='flex  items-center gap-x-1'>
                    <div className=''>
                      <IconHour width={14} height={14} />
                    </div>
                    <div className='mt-0.5'>{item?.hora} am</div>
                  </div>
                </div>
                <h6 className='text-[#4c000c] font-bold text-3xl text-left my-3'>{item?.titulo}</h6>
                <div className='hover:-translate-y-3 transition-all duration-500 ease-in-out'>
                  <Image
                    loading='lazy'
                    src={item?.imagenPrincipal?.url!}
                    alt='Picture of the author'
                    width={500}
                    height={350}
                    className='object-cover'
                  />
                </div>

                <p className=' text-justify  text-sm my-3'>{item?.descripcionCorta}</p>
                <button
                  onClick={() => navigate.push(`/eventos/${item?.slug}`)}
                  style={{ boxShadow: '-8px 6px 13px 0px rgba(0,0,0,0.42)' }}
                  className='bg-tertiary px-6 py-2 mt-2 text-md rounded-sm text-white font-semibold cursor-pointer  shadow-primary'>
                  Comprar entrada
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Eventos
