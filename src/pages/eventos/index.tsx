import Image from 'next/image'
import React from 'react'

const Eventos = () => {
  return (
    <div className='grid px-5 pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px]  mx-auto text-center text-[#505050] mt-32'>
      <article className='max-w-[300px] mx-auto sm:mx-0 sm:max-w-none'>
        <Image
          src='/imgs/eventos/evento-01.jpg'
          alt='Picture of the author'
          width={500}
          height={350}
          className='object-cover'
        />
        <h6 className='text-[#4c000c] font-bold text-4xl text-center my-5'>Oscar Quiñonez</h6>
        <p className=' text-left'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry’s standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.
        </p>
        <button className='bg-[#a02e2b] text-white pb-2 pt-1 mt-5 rounded-sm px-4 hover:opacity-75 transition-all duration-500'>
          Comprar entrada
        </button>
      </article>
      <article className='max-w-[300px] mx-auto sm:mx-0 sm:max-w-none'>
        <Image
          src='/imgs/eventos/evento-02.jpg'
          alt='Picture of the author'
          width={500}
          height={350}
          className='object-cover'
        />
        <h6 className='text-[#4c000c] font-bold text-4xl text-center my-5'>Miguel Quiñonez</h6>
        <p className=' text-left'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry’s standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.
        </p>
        <button className='bg-[#a02e2b] text-white pb-2 pt-1 mt-5 rounded-sm px-4 hover:opacity-75 transition-all duration-500'>
          Comprar entrada
        </button>
      </article>
      <article className='max-w-[300px] mx-auto sm:mx-0 sm:max-w-none'>
        <Image
          src='/imgs/eventos/evento-01.jpg'
          alt='Picture of the author'
          width={500}
          height={350}
          className='object-cover'
        />
        <h6 className='text-[#4c000c] font-bold text-4xl text-center my-5'>Julian Quiñonez</h6>
        <p className=' text-left'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry’s standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.
        </p>
        <button className='bg-[#a02e2b] text-white pb-2 pt-1 rounded-sm px-4 hover:opacity-75 transition-all duration-500 mt-5'>
          Comprar entrada
        </button>
      </article>
    </div>
  )
}

export default Eventos
