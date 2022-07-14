import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import IconCalendar from "../../../public/icons/IconCalendar";
import IconHour from "../../../public/icons/IconHour";
import OpenGraph from "../../components/openGraph";
import { eventos } from "../../data/eventos";

const Eventos = () => {
  const navigate = useRouter();
  return (
    <>
      <OpenGraph
        title="La Esperanza - Eventos"
        link="La Esperanza"
        description="Compra tus entradas del mejor evento de la ciudad."
        domain="la-esperanza-eventos.vercel.app"
        img="https://la-esperanza-eventos.vercel.app/imgs/flyers/flyer1.jpg"
        keywords="Entradas,Eventos,PLazas"
        url="https://la-esperanza-eventos.vercel.app/eventos"
      />

      <div className="bg-fondo pb-10">
        <div className=" flex flex-col md:flex-row justify-between max-w-[1200px] gap-x-5 items-center  mx-auto px-5 pt-10">
          <div className="">
            <h1 className="text-3xl font-bold">
              Compra tu abono para toda la temporada
            </h1>
            <p className="text-base w-full max-w-[530px] mt-5 text-justify">
              La compra de abonos está ya <strong>disponible</strong>{" "}
              exclusivamente a través de nuestra plataforma online. Compra ahora
              tus abonos con un 20% de descuento y disfruta de la mejor fiesta
              taurina de la temporada.
            </p>
          </div>
          <div className="mt-5">
            <Image
              src="/imgs/eventos/flyers/abonado_descuento.png"
              alt="descuento"
              width={200}
              height={100}
            />
          </div>
        </div>

        <div className="flex flex-col  max-w-[1200px]  mx-auto px-5 mt-10">
          <div className="mx-auto">
            <div className="mt-5 relative hidden sm:block">
              <Image
                src="/imgs/eventos/flyers/flyer-web-esperanza.jpg"
                alt="descuento"
                width={1000}
                height={250}
              />
              <div className="absolute w-full  bottom-5 md:bottom-10 ">
                <div className="w-full flex flex-col gap-1 md:gap-y-2 items-center">
                  <h2 className="text-xs sm:text-3xl md:text-4xl text-yellow-500 font-semibold">
                    FERIA DE JULIO EN LA ESPERANZA
                  </h2>
                  <p className="text-white">
                    Separa tu abono y disfruta de la mejor feria del año.{" "}
                  </p>
                </div>
              </div>

              <div className="mt-5 relative sm:hidden">
                <Image
                  src="/imgs/eventos/flyers/flyer-web-esperanza.jpg"
                  alt="descuento"
                  width={400}
                  height={400}
                />
                <div className="absolute w-full px-10 bottom-10 left-1/2 -translate-x-1/2  text-center">
                  <h2 className="text-2xl text-yellow-500">
                    FERIA DE JULIO EN LA ESPERANZA
                  </h2>
                  <p className="text-white">
                    Separa tu abono y disfruta de la mejor feria del año.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center border-b border-black pb-14">
            <button
              onClick={() => navigate.push(`/abonados`)}
              style={{ boxShadow: "-8px 6px 13px 0px rgba(0,0,0,0.42)" }}
              className="bg-tertiary px-6 py-2 mt-5 text-md rounded-sm text-white font-semibold cursor-pointer  shadow-primary"
            >
              Comprar tu abono
            </button>
          </div>
        </div>

        <div className="flex flex-col  max-w-[1200px]  mx-auto px-5  mt-10">
          <div className="my-10">
            <h1 className="text-3xl font-bold">Elige el evento</h1>
            <p className="text-base w-full max-w-[530px] mt-5 text-justify">
              La compra de abonos está ya <strong>disponible</strong>{" "}
              exclusivamente a través de nuestra plataforma online. Compra ahora
              tus abonos con un 20% de descuento y disfruta de la mejor fiesta
              taurina de la temporada.
            </p>
          </div>

          <div className="grid pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center text-[#505050] ">
            {eventos.map(({ name, img }) => (
              <article
                key={img}
                style={{ boxShadow: "-14px 14px 14px -5px rgba(0,0,0,0.42)" }}
                className="max-w-[300px] mx-auto sm:mx-0 sm:max-w-none bg-white px-7 py-7 rounded-md shadow-md"
              >
                <div className="flex gap-x-5 text-[13px]">
                  <div className="flex items-center gap-x-1">
                    <div className="">
                      <IconCalendar width={14} height={14} />
                    </div>

                    <div className="mt-0.5">Sab 02 de Julio</div>
                  </div>
                  <div className="flex  items-center gap-x-1">
                    <div className="">
                      <IconHour width={14} height={14} />
                    </div>
                    <div className="mt-0.5">11:00 am</div>
                  </div>
                </div>
                <h6 className="text-[#4c000c] font-bold text-3xl text-left my-3">
                  {name}
                </h6>
                <div className="hover:-translate-y-3 transition-all duration-500 ease-in-out">
                  <Image
                    src={`/imgs/flyers/${img}`}
                    alt="Picture of the author"
                    width={500}
                    height={350}
                    className="object-cover"
                  />
                </div>

                <p className=" text-justify  text-sm my-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry’s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <button
                  onClick={() => navigate.push(`/eventos/${img}`)}
                  style={{ boxShadow: "-8px 6px 13px 0px rgba(0,0,0,0.42)" }}
                  className="bg-tertiary px-6 py-2 mt-2 text-md rounded-sm text-white font-semibold cursor-pointer  shadow-primary"
                >
                  Comprar entrada
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Eventos;
