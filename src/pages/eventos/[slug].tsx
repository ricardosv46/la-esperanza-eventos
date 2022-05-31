import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Container from '../../components/container'
import Modal from '../../components/modal'

const asientos = [
  { text1: 'Tendido 1 ', text2: 'desde S/ 429', color: 'bg-[#EDA366]' },
  { text1: 'Tendido 2 ', text2: 'desde S/ 350', color: 'bg-[#F4BA31]' },
  { text1: 'Tendido 3 ', text2: 'desde S/ 229', color: 'bg-[#C14744]' },
  { text1: 'Tendido 4 ', text2: 'desde S/ 90', color: 'bg-[#4C000C]' }
]

const Compra = () => {
  const [showModal, setShowModal] = useState(true)
  return (
    <>
      <div className='w-full  relative '>
        <Image
          src='/imgs/flyers/flyer1.jpg'
          width={'100%'}
          height={'100%'}
          layout='fill'
          objectFit='cover'
          className='-z-10 '
        />
        <Container bgColor='backdrop-blur-lg' className=' pt-36 pb-5'>
          <main className='lg:px-5 flex flex-col lg:flex-row gap-5'>
            <section className='lg:relative w-full lg:w-[760px] mt-10 lg:h-[506px] gap-5  flex flex-col lg:flex-row'>
              <Image
                src={`/imgs/flyers/flyer1.jpg`}
                alt='Picture of the author'
                width={760}
                height={506}
                objectFit='scale-down'
                className='rounded-lg lg:rounded-none'
              />
              <article className='w-full bg-white rounded-lg lg:absolute -bottom-32 p-5 lg:p-9 flex flex-col gap-5 border shadow-lg'>
                <h1 className='text-2xl lg:text-5xl text-primary font-bold '>
                  Vive la emoción de cerca!
                </h1>
                <p className='text-md text-primary font-semibold'>
                  Este domingo 1 de Mayo se presentará Oscar Quiñonez en nuestra
                  casa. ¡¡Llenemos las tribunas, hagamos sentir la Tauromaquia!!
                </p>
                <p className='text-md text-primary font-bold'>
                  Información adicional
                </p>
              </article>
            </section>

            <section className='bg-white flex-1 rounded-lg p-5 lg:px-8 py-5 shadow-lg border'>
              <article className='flex flex-col gap-2'>
                <h2 className='text-2xl text-primary font-bold '>
                  Oscar Quiñonez
                </h2>
                <p className='text-md text-text font-semibold'>
                  1ro de Mayo – 3pm
                </p>
                <p className='text-md text-text font-semibold'>
                  ¡Disfruta una emocionante tarde de toros en la comodidad de
                  nuestras butacas!
                </p>
              </article>
              <article className='my-5'>
                <h2 className='text-2xl text-primary font-bold '>Entradas</h2>
                <section className='flex flex-col gap-2'>
                  {asientos.map(({ text1, text2, color }, index) => (
                    <article
                      key={index}
                      className='shadow-md rounded-lg bg-[#f9f9f9] border flex justify-between p-3 items-center '
                    >
                      <div>
                        <p className='text-md text-primary font-semibold leading-5'>
                          {text1}
                        </p>
                        <p className='text-md text-primary font-semibold leading-5'>
                          {text2}
                        </p>
                      </div>

                      <button
                        onClick={() => setShowModal(true)}
                        className={`py-3 px-8 rounded-md text-white font-semibold ${color}`}
                      >
                        Asientos
                      </button>
                    </article>
                  ))}
                </section>
              </article>
              <div className='flex justify-center'>
                <Image
                  src={`/imgs/compra/coliseo.jpg`}
                  alt='Picture of the author'
                  width={224}
                  height={224}
                  objectFit='scale-down'
                />
              </div>
            </section>
          </main>
        </Container>
      </div>
      <Container>
        <section className='py-5 flex justify-center'>
          <article className='border  p-3 rounded-md flex flex-col gap-1'>
            <h2 className='text-2xl text-primary font-bold'>Lurín, Lima</h2>
            <p className='text-md text-text font-semibold'>
              Fundo La Esperanza
            </p>
            <div className=''>
              {' '}
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d124765.90864455116!2d-76.87008!3d-12.252702!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6836d2dfddd46029!2sFundo%20La%20Esperanza%20-%20Lur%C3%ADn!5e0!3m2!1sen!2sus!4v1653950659611!5m2!1sen!2sus'
                width='350'
                height='350'
                loading='lazy'
              />
            </div>
          </article>
        </section>
      </Container>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <section className='bg-white   w-[90%] lg:w-[920px]   rounded-lg relative'>
          <p className='text-5xl text-primary font-bold text-center'>
            SELECCIONA TUS ASIENTOS
          </p>
          <article className='flex '>
            <div className='w-7/12'>
              <p className='text-4xl text-tertiary font-bold '>
                {' '}
                Oscar Quinteros 1 Mayo
              </p>
              <section className='flex'>
                <article className='w-7/12'>
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
                <article className='w-5/12'>
                  <p>
                    Lorem fistrum por la gloria de mi madre esse jarl aliqua
                    llevame al sircoo. De la pradera ullamco qué dise usteer
                    está la cosa muy malar.
                  </p>
                  <Image
                    src={`/imgs/compra/coliseo.jpg`}
                    alt='Picture of the author'
                    width={130}
                    height={130}
                    objectFit='scale-down'
                  />
                </article>
              </section>
            </div>
            <div className='w-5/12'>
              <p className='text-4xl text-primary font-bold '>
                Asientos Tendido{' '}
              </p>
            </div>
          </article>
        </section>
      </Modal>
    </>
  )
}

export default Compra
