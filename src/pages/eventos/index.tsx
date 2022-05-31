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
