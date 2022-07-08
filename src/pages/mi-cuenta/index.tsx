import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import IconEdit from '../../../public/icons/IconEdit'
import Container from '../../components/container'
import ModalMiCuenta from '../../components/modal/modalMiCuenta'

const MiCuenta = () => {
  const navigate = useRouter()
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Container bgColor='bg-[#fff2e6]' className='px-5'>
        <div className="max-w-[1200px]  mx-auto ">
          <div className="pt-10 pb-5 border-b border-black">
            <h1 className='text-4xl font-bold'>Mi Perfil</h1>
            <div className="w-full flex flex-col md:flex-row gap-y-5 justify-between mt-6 text-base ">
              <div className="w-full flex flex-col gap-y-5">
                <div className="flex gap-x-3 sm:gap-x-14">
                  <div className="w-24">Nombres:</div>
                  <div className="font-bold w-48">Luis Carlos</div>
                </div>
                <div className="flex gap-x-3 sm:gap-x-14">
                  <div className="w-24">Nro de Doc:</div>
                  <div className="font-bold w-48">DNI 42982984</div>
                </div>
                <div className="flex gap-x-3 sm:gap-x-14">
                  <div className="w-24">Teléfono:</div>
                  <div className="font-bold w-48">987 654 321</div>
                </div>
              </div>

              <div className="w-5/6 flex flex-col  gap-y-5">
                <div className="flex gap-x-3 sm:gap-x-14">
                  <div className="w-24">Apellidos:</div>
                  <div className="font-bold w-48">Luis Carlos</div>
                </div>
                <div className="flex gap-x-3 sm:gap-x-14">
                  <div className="w-24">Email:</div>
                  <div className="font-bold w-48">carlosrodriguez@gmail.com</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end" onClick={() => setShowModal(true)}>
              <IconEdit width={20} height={20} />
            </div>
          </div>

          <div className="pt-10">
            <h2 className='text-4xl font-bold'>Mi Entradas</h2>
            <p className='text-xl'>Tienes 02 entradas por registrar</p>

            <div className="grid px-5 pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px]  mx-auto text-center text-[#505050] mt-20">
              <article
                className='max-w-[300px] mx-auto sm:mx-0 sm:max-w-none'
              >
                <div className='' onClick={() => navigate.push('/mi-cuenta/oscar')}>
                  <Image
                    src={`/imgs/flyers/flyer1.jpg`}
                    alt='Picture of the author'
                    width={500}
                    height={350}
                    className='object-cover'
                  />
                </div>
              </article>

              <article
                className='max-w-[300px] mx-auto sm:mx-0 sm:max-w-none'
              >
                <div className='' onClick={() => navigate.push('/mi-cuenta/miguel')}>
                  <Image
                    src={`/imgs/flyers/flyer2.jpg`}
                    alt='Picture of the author'
                    width={500}
                    height={350}
                    className='object-cover'
                  />
                </div>
              </article>
            </div>
          </div>
        </div>

      </Container>
      <ModalMiCuenta isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

export default MiCuenta