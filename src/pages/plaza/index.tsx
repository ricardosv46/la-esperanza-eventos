import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

// import required modules
import { Navigation, Pagination } from 'swiper'
const Plaza = () => {
  return (
    <>
      <div className='banner banner-plaza relative'>
        <p className='absolute top-[40%]  right-[30%]  sm:right-[40%] text-5xl sm:text-6xl font-bold text-white'>
          La Plaza
        </p>
      </div>
      <div className='bg-[#fff2e6] py-6'>
        <div className='max-w-[1200px] px-4 mx-auto text-center text-[#505050] mb-4 '>
          <p className='max-w-3xl mx-auto'>
            La Plaza de Toros La Esperanza fue inaugurada en el año 2009, siendo
            un ruedo sin graderías, el punto de encuentro y lugar donde se
            incubó la nueva generación de aficionados prácticos, llenando aquel
            año cada sábado con encerronas taurinas y gratos momentos de
            confraternidad.
          </p>
          <br />
          <p className='max-w-3xl mx-auto'>
            Buscando ser la casa del taurino de buena voluntad, se amplió en una
            primera etapa dotándola de un callejón que permita el buen
            desarrollo de un festejo taurino y cómodas butacas en las tres filas
            más cercanas al ruedo. Bajo esa configuración se albergaron las
            primeras corridas de toros formales brindando un lugar muy especial
            a la afición taurina, que fue creando el ambiente y la identidad de
            La Esperanza, en un espacio de campo con sabor criollo y
            fraternidad.
          </p>
          <br />
          <p className='max-w-3xl mx-auto mb-4'>
            Y así, la necesidad de albergar más afición tras vivir esta pandemia
            hizo que la plaza creciera mucho más, contando ahora con un tendido
            fijo de 12 filas y 5 palcos, capaz de albergar en su totalidad cerca
            de 3000 personas, manteniendo su coqueta identidad y esa
            personalidad que invita a disfrutar una tarde de toros entre amigos.
          </p>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            loop={true}
            pagination={{
              clickable: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 0
              }
            }}
            modules={[Navigation, Pagination]}
            className='mySwiper'
          >
            <SwiperSlide>
              <div className=' pb-10 pt-3'>
                <Image
                  src='/imgs/la-esperanza/la-esperanza-01.jpg'
                  alt='Picture of the author'
                  width={500}
                  height={250}
                  className='object-cover'
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=' pb-10 pt-3'>
                <Image
                  src='/imgs/la-esperanza/la-esperanza-02.jpeg'
                  alt='Picture of the author'
                  width={500}
                  height={250}
                  className='object-cover'
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=' pb-10 pt-3'>
                <Image
                  src='/imgs/la-esperanza/la-esperanza-03.jpg'
                  alt='Picture of the author'
                  width={500}
                  height={250}
                  className='object-cover'
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default Plaza
