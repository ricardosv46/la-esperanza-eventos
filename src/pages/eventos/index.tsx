import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import OpenGraph from '../../components/openGraph'
import { eventos } from '../../data/eventos'

const Eventos = () => {
  const navigate = useRouter()
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
      <div className="flex flex-col md:flex-row justify-between max-w-[1200px] gap-x-5 items-center  mx-auto px-5 mt-10">
        <div className="">
          <h1 className='text-3xl font-bold'>Compra tu abono para toda la temporada</h1>
          <p className='text-base w-full max-w-[530px] mt-5 text-justify'>La compra de abonos está ya <strong>disponible</strong> exclusivamente a través de nuestra plataforma online. Compra ahora tus abonos con un 20%
            de descuento y disfruta de la mejor fiesta taurina de la temporada.</p>
        </div>
        <div className="mt-5">
          <Image
            src='/imgs/eventos/flyers/abonado_descuento.png'
            alt='descuento'
            width={200}
            height={100}
          />
        </div>
      </div>

      <div className="flex justify-center max-w-[1200px]  mx-auto px-5 mt-10">
        <div className="mt-5 relative hidden sm:block">
          <Image
            src='/imgs/eventos/flyers/flyer-web-esperanza.jpg'
            alt='descuento'
            width={1000}
            height={250}
          />
          <div className="absolute w-full  bottom-5 md:bottom-10 ">
            <div className="w-full flex flex-col gap-1 md:gap-y-2 items-center">
              <h2 className='text-xs sm:text-3xl md:text-4xl text-yellow-500 font-semibold'>FERIA DE JULIO EN LA ESPERANZA</h2>
              <p className='text-white'>Separa tu abono y disfruta de la mejor feria del año. </p>
            </div>

          </div>
        </div>

        <div className="mt-5 relative sm:hidden">
          <Image
            src='/imgs/eventos/flyers/flyer-web-esperanza.jpg'
            alt='descuento'
            width={400}
            height={400}
          />
          <div className="absolute w-full px-10 bottom-10 left-1/2 -translate-x-1/2  text-center">
            <h2 className='text-2xl text-yellow-500'>FERIA DE JULIO EN LA ESPERANZA</h2>
            <p className='text-white'>Separa tu abono y disfruta de la mejor feria del año. </p>
          </div>

        </div>

      </div>
      <div className="flex justify-center">
        <button
          onClick={() => navigate.push(`/abonados`)}
          className='bg-[#a02e2b] text-white pb-2 pt-1 mt-5  px-4 hover:opacity-75 transition-all duration-500 rounded-md'
        >
          Comprar tu abono
        </button>
      </div>



      <div className='grid px-5 pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px]  mx-auto text-center text-[#505050] mt-20'>
        {eventos.map(({ name, img }) => (
          <article
            key={img}
            className='max-w-[300px] mx-auto sm:mx-0 sm:max-w-none'
          >
            <div className='hover:-translate-y-3 transition-all duration-500 ease-in-out'>
              <Image
                src={`/imgs/flyers/${img}`}
                alt='Picture of the author'
                width={500}
                height={350}
                className='object-cover'
              />
            </div>

            <h6 className='text-[#4c000c] font-bold text-4xl text-center my-5'>
              {name}
            </h6>
            <p className=' text-left'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <button
              onClick={() => navigate.push(`/eventos/${img}`)}
              className='bg-[#a02e2b] text-white pb-2 pt-1 mt-5  px-4 hover:opacity-75 transition-all duration-500 rounded-md'
            >
              Comprar entrada
            </button>
          </article>
        ))}
      </div>
    </>
  )
}

export default Eventos
