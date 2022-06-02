import Image from 'next/image'
import React from 'react'
import Modal from '.'
interface Props {
  onClose: () => void
  isOpen: boolean
  onClick: () => void
}

const ModalCompra = ({ isOpen, onClose, onClick }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width='w-full md:w-[920px] overflow-y-scroll no-scrollbar '
      height='h-full md:h-auto'
    >
      <section className='bg-white  rounded-lg py-10 relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-4 text-primary font-bold cursor-pointer'
        >
          X
        </button>
        <p className='text-4xl text-primary font-bold text-center'>
          SELECCIONA TUS ASIENTOS
        </p>
        <article className='flex flex-col md:flex-row border-t mt-5'>
          <div className='w-full flex flex-col items-center md:w-8/12 p-3'>
            <p className='text-2xl text-tertiary font-bold '>
              Oscar Quinteros 1 Mayo
            </p>
            <section className='flex flex-col  md:flex-row mt-10'>
              <article className='w-full lg:w-8/12 flex flex-col items-center'>
                <div className='-mb-12'>
                  <Image
                    src={`/imgs/compra/coliseo1.png`}
                    alt='Picture of the author'
                    width={342}
                    height={120}
                    objectFit='scale-down'
                  />
                </div>
                <div className='-mb-8'>
                  <Image
                    src={`/imgs/compra/coliseo2.png`}
                    alt='Picture of the author'
                    width={342}
                    height={93}
                    objectFit='scale-down'
                  />
                </div>
                <div className='-mb-2'>
                  <Image
                    src={`/imgs/compra/coliseo3.png`}
                    alt='Picture of the author'
                    width={342}
                    height={72}
                    objectFit='scale-down'
                  />
                </div>
                <div className='-mb-5'>
                  <Image
                    src={`/imgs/compra/coliseo4.png`}
                    alt='Picture of the author'
                    width={342}
                    height={55}
                    objectFit='scale-down'
                  />
                </div>
              </article>
              <article className='w-full md:w-4/12 py-3 flex-col flex justify-between '>
                <p className='text-xs text-text p-5 lg:p-0'>
                  Lorem fistrum por la gloria de mi madre esse jarl aliqua
                  llevame al sircoo. De la pradera ullamco qué dise usteer está
                  la cosa muy malar.
                </p>
                <div className='flex justify-center items-center '>
                  <Image
                    src={`/imgs/compra/coliseo.jpg`}
                    alt='Picture of the author'
                    width={130}
                    height={130}
                    objectFit='scale-down'
                  />
                </div>
              </article>
            </section>
          </div>
          <div className='w-full md:w-4/12 p-3 flex flex-col justify-between border-l'>
            <div>
              <p className='text-3xl text-primary font-bold mb-5'>
                Asientos Tendido{' '}
              </p>
              <p className='text-md text-primary font-semibold'>
                Barrera: 46 asientos
              </p>
              <p className='text-md text-primary font-semibold'>
                Contra brarrea: 48 aientos
              </p>
              <p className='text-md text-primary font-semibold'>
                Fila 3: 53 asientos
              </p>
            </div>
            <button
              onClick={onClick}
              className='bg-tertiary px-5 py-2 text-white rounded-lg mt-10 lg:mt-0'
            >
              PAGAR AHORA: S/.288.00
            </button>
          </div>
        </article>
      </section>
    </Modal>
  )
}

export default ModalCompra
