import type { NextPage } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css/effect-fade";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import Container from "../components/container";
import Image from "next/image";
import OpenGraph from "../components/openGraph";
import { useRouter } from "next/router";
import IconMano from "../../public/icons/IconMano";

const banners = [
  "banner-home1",
  "banner-home2",
  "banner-home3",
  "banner-home4",
];

const flyers = [
  { id: 0, img: "flyer1.jpg" },
  { id: 1, img: "flyer2.jpg" },
  { id: 2, img: "flyer3.jpg" },
];

const Home: NextPage = () => {
  const navigate = useRouter();
  return (
    <>
      <OpenGraph
        title="La Esperanza - Incio"
        link="La Esperanza"
        description="Disfuta del mejor evento de la ciudad, La esperanza, con una gran variedad de eventos, promociones y mucho más."
        domain="la-esperanza-eventos.vercel.app"
        img="https://la-esperanza-eventos.vercel.app/imgs/banners/banner3.jpg"
        keywords="Entradas,Eventos,PLazas"
        url="https://la-esperanza-eventos.vercel.app/"
      />

      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        simulateTouch={true}
        effect={"fade"}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner}>
            <div className={`banner ${banner}`}>
              <div className="mx-auto h-full my-0 w-[90%] xl:w-[1200px] flex justify-end items-center relative z-10">
                <div className="text-white text-5xl text-right sm:text-6xl lg:text-8xl font-bold flex flex-col items-end">
                  <h2>Vive la tradición</h2>
                  <h2>Vive la magia</h2>
                  <div className=" mt-4">
                    <button className="relative text-lg text-center font-bold rounded-l-md rounded-r-full bg-secondary pr-12 pl-6 py-2 mt-4 hover:bg-tertiary ease-in-out duration-300 transition-all shadow-2xl">
                      <p className="font-extrabold"> Venta de entradas</p>
                      <div className="absolute -bottom-3 -right-3">
                        <IconMano width={45} height={45} fill="#fff" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <section className="bg-fondo  ">
        <div className="banner-parallax-plaza">
          <div className="mx-auto my-0 w-[90%] xl:w-[1200px]">
            <div className=" flex flex-col md:flex-row  py-16">
              <div className=" w-full   flex items-center ">
                <div className="flex flex-col md:items-start gap-5 ">
                  <h1 className="text-5xl text-primary font-bold text-center ">
                    LA PLAZA
                  </h1>
                  <p className="text-justify px-0 text-[#505050] font-normal text-[16px] ">
                    La Plaza de Toros La Esperanza fue inaugurada en el año
                    2009, siendo un ruedo sin graderías, el punto de encuentro y
                    lugar donde se incubó la nueva generación de aficionados
                    prácticos, llenando aquel año cada sábado con encerronas
                    taurinas y gratos momentos de confraternidad. <br />
                    <br />
                    Buscando ser la casa del taurino de buena voluntad, se
                    amplió en una primera etapa dotándola de un callejón que
                    permita el buen desarrollo de un festejo taurino y cómodas
                    butacas en las tres filas más cercanas al ruedo. Bajo esa
                    configuración se albergaron las primeras corridas de toros
                    formales brindando un lugar muy especial a la afición
                    taurina, que fue creando el ambiente y la identidad de La
                    Esperanza, en un espacio de campo con sabor criollo y
                    fraternidad. <br />
                    <br />Y así, la necesidad de albergar más afición tras vivir
                    esta pandemia hizo que la plaza creciera mucho más, contando
                    ahora con un tendido fijo de 12 filas y 5 palcos, capaz de
                    albergar en su totalidad cerca de 3000 personas, manteniendo
                    su coqueta identidad y esa personalidad que invita a
                    disfrutar una tarde de toros entre amigos.
                  </p>
                  <button
                    onClick={() => navigate.push("/plaza")}
                    style={{ boxShadow: "-8px 6px 13px 0px rgba(0,0,0,0.42)" }}
                    className="bg-tertiary px-6 py-2 rounded-sm text-white  cursor-pointer  shadow-primary"
                  >
                    <p className="font-bold">Conoce más</p>
                  </button>
                </div>
              </div>
              <div className="relative w-full pl-16 flex   sm:bg-transparent">
                <div className="absolute right-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Container
        bgColor="banner banner-home6 "
        className="flex py-16 lg:py-3 flex-col justify-center items-center gap-14 lg:gap-0 lg:flex-row"
      >
        <div className="w-full lg:w-1/2">
          <h2 className="text-5xl text-secondary font-bold lg:px-5 ">
            PRÓXIMOS EVENTOS
          </h2>
          <p className="text-gray-50 font-light text-[18px] lg:px-5 pt-5">
            <strong>Lorem Ipsum </strong>is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry’s
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <Swiper
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            slidesPerView={1}
            navigation={true}
            pagination={true}
            modules={[Autoplay, Navigation, Pagination]}
            className="mySwiper"
          >
            {flyers.map((flyer) => (
              <SwiperSlide key={flyer.id}>
                {({ isActive }) => (
                  <div className="flex justify-center items-center ">
                    <Image
                      className="cursor-pointer relative"
                      src={`/imgs/flyers/${flyer.img}`}
                      width={520}
                      height={344}
                      alt="logo"
                    />
                    <button
                      onClick={() => navigate.push(`/eventos/${flyer.img}`)}
                      className={`bottom-7 lg:bottom-10 right-5 lg:right-20 absolute px-1 lg:px-5 py-[6px]  bg-secondary border-2 border-secondary hover:bg-transparent transition-all ease-in-out duration-500 text-white font-semibold text-xs lg:text-[13px] rounded-sm  ${
                        isActive ? "animate-fade" : "animate-fade-out"
                      }`}
                    >
                      <p>Comprar entradas</p>
                    </button>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
      <Container bgColor="bg-primarydark">
        <div className="flex flex-col md:flex-row  banner banner-parallax ">
          <div className="flex  sm:bg-transparent">
            <Image
              className="cursor-pointer relative"
              src={`/imgs/home/toro.png`}
              width={557}
              height={531}
              alt="logo"
            />
          </div>
          <div className=" w-full flex-1 flex items-center  bg-primarydark">
            <div className="flex flex-col md:items-end gap-5">
              <h2 className="text-3xl md:text-5xl text-secondary font-bold lg:ml-7">
                VENTA DE ENTRADAS
              </h2>
              <p className="text-gray-50 font-light text-[18px] lg:ml-7 md:text-right ">
                Las fiestas de toros es considerada un arte que sólo los
                entendidos pueden apreciar. A partir de las reflexiones del
                filósofo Francis Wolff, se emprende un recorrido histórico y
                antropológico para mostrar cuán diversas son las tradiciones
                taurinas en España, México y Perú.
              </p>
              <button
                onClick={() => navigate.push("/eventos")}
                style={{ boxShadow: "-8px 6px 13px 0px rgba(0,0,0,0.42)" }}
                className="bg-tertiary px-6 py-2 rounded-sm text-white  font-semibold cursor-pointer  shadow-primary"
              >
                <p>Comprar aquí</p>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
