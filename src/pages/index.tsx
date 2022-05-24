import type { NextPage } from 'next'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css/effect-fade'
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
const banners = ['banner-home1', 'banner-home2', 'banner-home3', 'banner-home4']

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

      <div className='h-[955px] w-full bg-primary-100'>Plantilla base</div>
    </>
  )
}

export default Home
