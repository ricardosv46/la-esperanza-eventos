import type { NextPage } from 'next'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css/effect-fade'
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import Container from '../components/container'
import Image from 'next/image'
const banners = ['banner-home1', 'banner-home2', 'banner-home3', 'banner-home4']

const flyers = [
  { id: 0, img: 'flyer1' },
  { id: 1, img: 'flyer2' },
  { id: 2, img: 'flyer3' }
]

const Home: NextPage = () => {
  return (
    <>
      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true
        }}
        simulateTouch={true}
        effect={'fade'}
        modules={[Autoplay, EffectFade]}
        className='mySwiper'
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner}>
            <div className={`banner ${banner}`}>
              <div className='mx-auto h-full my-0 w-[90%] xl:w-[1200px] flex justify-end items-center relative z-10'>
                <div className='text-white text-6xl font-bold flex flex-col items-end'>
                  <p>Vive la tradición</p>
                  <p>Vive la magia</p>
                  <button className='text-lg text-center font-bold rounded-lg bg-secondary px-4 py-2 mt-4 hover:bg-tertiary ease-in-out duration-300 transition-all shadow-2xl'>
                    Venta de entradas
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Container bgColor='banner banner-home5'>
        <h1 className='text-5xl text-primary font-bold text-center pt-16'>
          LA PLAZA
        </h1>
        <p className='text-center text-[#505050] font-semibold text-md p-16'>
          La Plaza de Toros La Esperanza fue inaugurada en el año 2009, siendo
          un ruedo sin graderías, el punto de encuentro y lugar donde se incubó
          la nueva generación de aficionados prácticos, llenando aquel año cada
          sábado con encerronas taurinas y gratos momentos de confraternidad.{' '}
          <br />
          <br />
          Buscando ser la casa del taurino de buena voluntad, se amplió en una
          primera etapa dotándola de un callejón que permita el buen desarrollo
          de un festejo taurino y cómodas butacas en las tres filas más cercanas
          al ruedo. Bajo esa configuración se albergaron las primeras corridas
          de toros formales brindando un lugar muy especial a la afición
          taurina, que fue creando el ambiente y la identidad de La Esperanza,
          en un espacio de campo con sabor criollo y fraternidad. <br />
          <br />Y así, la necesidad de albergar más afición tras vivir esta
          pandemia hizo que la plaza creciera mucho más, contando ahora con un
          tendido fijo de 12 filas y 5 palcos, capaz de albergar en su totalidad
          cerca de 3000 personas, manteniendo su coqueta identidad y esa
          personalidad que invita a disfrutar una tarde de toros entre amigos.
        </p>
        <div className='flex lg:shadow-2xl flex-col justify-center items-center gap-5 lg:gap-0 lg:flex-row'>
          <div className='flex-1 flex'>
            <Image
              objectFit='cover'
              className='cursor-pointer'
              src='/imgs/home/home1.jpg'
              width={400}
              height={265}
              alt='logo'
            />
          </div>
          <div className='flex-1 flex'>
            <Image
              objectFit='cover'
              className='cursor-pointer'
              src='/imgs/home/home2.jpg'
              width={400}
              height={265}
              alt='logo'
            />
          </div>
          <div className='flex-1 flex'>
            <Image
              objectFit='cover'
              className='cursor-pointer'
              src='/imgs/home/home3.jpg'
              width={400}
              height={265}
              alt='logo'
            />
          </div>
        </div>
        <div className='flex justify-center py-16 '>
          <button className='bg-tertiary px-8 py-3 rounded-md text-white font-semibold cursor-pointer'>
            Conoce más
          </button>
        </div>
      </Container>
      <Container
        bgColor='banner banner-home6 '
        className='flex py-16 lg:py-20 flex-col justify-center items-center gap-14 lg:gap-0 lg:flex-row'
      >
        <div className='w-full lg:w-1/2'>
          <h2 className='text-5xl text-secondary font-bold lg:px-5 '>
            PRÓXIMOS EVENTOS
          </h2>
          <p className='text-white font-semibold text-md lg:px-5 pt-10'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic.
          </p>
        </div>
        <div className='w-full lg:w-1/2'>
          <Swiper
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true
            }}
            slidesPerView={1}
            navigation={true}
            pagination={true}
            modules={[Autoplay, Navigation, Pagination]}
            className='mySwiper'
          >
            {flyers.map((flyer, index) => (
              <SwiperSlide key={flyer.id}>
                {({ isActive }) => (
                  <div className='flex justify-center items-center '>
                    <Image
                      className='cursor-pointer relative'
                      src={`/imgs/flyers/${flyer.img}.jpg`}
                      width={520}
                      height={344}
                      alt='logo'
                    />
                    <button
                      className={`bottom-7 lg:bottom-10 right-5 lg:right-20 absolute px-4 lg:px-6 py-2 lg:py-2.5  bg-secondary border-2 border-secondary hover:bg-transparent transition-all ease-in-out duration-500 text-white font-semibold text-sm lg:text-lg rounded   ${
                        isActive ? 'animate-fade' : 'animate-fade-out'
                      }`}
                    >
                      Comprar entradas
                    </button>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
      <Container bgColor='bg-primarydark'>
        <div className='flex  banner banner-parallax'>
          <div className='flex'>
            <Image
              className='cursor-pointer relative'
              src={`/imgs/home/toro.png`}
              width={557}
              height={531}
              alt='logo'
            />
          </div>
          <div className=' w-full flex-1 flex items-center  bg-primarydark'>
            <div className='flex flex-col items-end gap-10'>
              <p className='text-5xl text-secondary font-bold lg:px-5'>
                VENTA DE ENTRADAS
              </p>
              <p className='text-white font-semibold text-md lg:px-5 text-right'>
                Las fiestas de toros es considerada un arte que sólo los
                entendidos pueden apreciar. A partir de las reflexiones del
                filósofo Francis Wolff, se emprende un recorrido histórico y
                antropológico para mostrar cuán diversas son las tradiciones
                taurinas en España, México y Perú.
              </p>
              <button className='bg-tertiary px-8 py-3 rounded-md text-white font-semibold cursor-pointer'>
                Comprar aquí
              </button>
            </div>
          </div>
        </div>
      </Container>
      {/* <Container bgColor='banner banner-home'>
        <h2 className='text-5xl text-primary font-bold text-center pt-16'>
          NOTICIAS
        </h2>
        <div>

        </div>
      </Container> */}
    </>
  )
}

export default Home
