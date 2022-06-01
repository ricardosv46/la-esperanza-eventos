import Image from 'next/image'
import React from 'react'
import IconDelete from '../../../../public/icons/IconDelete'
import IconMinus from '../../../../public/icons/IconMinus'
import IconPlus from '../../../../public/icons/IconPlus'

interface CardItemCarritoProps {}
const CardItemCarrito = ({}: CardItemCarritoProps) => {
  const incrementPrice = () => {
    console.log('increment')
  }
  const decrementPrice = () => {}
  return (
    <div className='flex justify-between mt-5'>
      <div className='flex gap-x-3'>
        <div className='border flex'>
          <Image
            src={`/imgs/flyers/flyer1.jpg`}
            alt='imagen'
            width={100}
            height={100}
          />
        </div>
        <div className='flex flex-col justify-between'>
          <div className=''>
            <p className='font-bold text-primary text-xl'>Asiento 1</p>
            <div className='flex gap-x-3 mt-1 font-bold text-primarydark'>
              <p className='text-black text-sm'>S/ 20.00</p>
            </div>
          </div>

          <div className='flex  gap-x-2 '>
            <button
              className='bg-primary px-2 py-1 rounded '
              onClick={decrementPrice}
            >
              <IconMinus width={10} height={10} fill='#fff' />
            </button>
            <p className='text-primary'>1</p>
            <button
              className='bg-primary px-2 py-1 rounded '
              onClick={() => incrementPrice()}
            >
              <IconPlus width={10} height={10} fill='#fff' />
            </button>
          </div>
        </div>
      </div>

      <div className='cursor-pointer h-full mt-2' onClick={() => {}}>
        <IconDelete height={16} width={16} fill='red' />
      </div>
    </div>
  )
}

export default CardItemCarrito
