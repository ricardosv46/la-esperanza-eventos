import Image from "next/image";
import React, { useState } from "react";
import IconCalendar from "../../../public/icons/IconCalendar";
import IconHour from "../../../public/icons/IconHour";
import Container from "../../components/container";
import ModalCompra from "../../components/modal/modalCompra";
import ModalTendido1 from "../../components/modal/ModalTendido1";
import ModalTendido2Bajo from "../../components/modal/ModalTendido2Bajo";
import ModalTendido2Sol from "../../components/modal/ModalTendido2Sol";
import ModalTendido3ASol from "../../components/modal/ModalTendido3ASol";
import ModalTendido3B from "../../components/modal/ModalTendido3B";
import ModalTendido3Sol from "../../components/modal/ModalTendido3Sol";
import {
  CarritoProps,
  useCarritoContext,
} from "../../context/cart/CarritoState";
import { abonados } from "../../data/abonados";

const colors = [
  "bg-[#F89F59]",
  " bg-[#FFD066]",
  "bg-[#FFDA99]",
  "bg-[#D03B3E]",
  "bg-[#E7565C]",
  "bg-[#E7565C]",
];

const Abonados = () => {
  const [showModalTenido1, setShowModalTenido1] = useState(false);
  const [showModalTenido2Sol, setShowModalTenido2Sol] = useState(false);
  const [showModalTenido2Bajo, setShowModalTenido2Bajo] = useState(false);
  const [showModalTenido3Sol, setShowModalTenido3Sol] = useState(false);
  const [showModalTenido3ASol, setShowModalTenido3ASol] = useState(false);
  const [showModalTenido3B, setShowModalTenido3B] = useState(false);
  const [product, setProduct] = useState({} as CarritoProps);
  const { addCarrito, carrito } = useCarritoContext();

  console.log(carrito);

  const abonado = abonados.filter((abonado) => abonado.img === "flyer1.jpg")[0];

  console.log(abonado);

  const handleModal = (id: number) => {
    if (id === 1) {
      setShowModalTenido1(true);
    }
    if (id === 2) {
      setShowModalTenido2Sol(true);
    }
    if (id === 3) {
      setShowModalTenido2Bajo(true);
    }
    if (id === 4) {
      setShowModalTenido3Sol(true);
    }
    if (id === 5) {
      setShowModalTenido3ASol(true);
    }
    if (id === 6) {
      setShowModalTenido3B(true);
    }
  };
  return (
    <>
      <div className="w-full  relative ">
        <Image
          src={`/imgs/flyers/flyer1.jpg`}
          width={"100%"}
          height={"100%"}
          layout="fill"
          objectFit="cover"
          className="-z-10 "
          alt="flyer"
        />
        <Container bgColor="backdrop-blur-lg" className=" pt-36 pb-5">
          <main className="lg:px-5 flex flex-col lg:flex-row gap-5">
            <section className="lg:relative w-full lg:w-[760px]  lg:h-[470px] gap-5  flex flex-col lg:flex-row">
              <div className="bg-white w-full h-full rounded-lg">
                <div className="flex flex-col  py-5 px-8">
                  <div className="">
                    <h1 className="text-3xl font-extrabold">
                      FERIA LA ESPERANZA
                    </h1>
                    <h2 className="text-3xl font-extrabold">Compra tu Abono</h2>
                  </div>
                  <div className="flex gap-x-5 items-center mt-4">
                    <div className="flex gap-x-3">
                      <div className="mt-0.5">
                        <IconCalendar width={16} height={16} />
                      </div>

                      <div className="">23 jul 2022</div>
                    </div>
                    <div className="flex gap-x-3">
                      <div className="mt-0.5">
                        <IconHour width={16} height={16} />
                      </div>
                      <div className="">1:56 am</div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-5">
                    <Image
                      src={`/imgs/compra/coliseo.jpg`}
                      alt="Picture of the author"
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              </div>

              <article className="w-full bg-white rounded-lg lg:absolute top-[30.5rem] p-5 lg:p-9 flex flex-col gap-5 border shadow-lg">
                <h1 className="text-2xl lg:text-5xl text-primary font-bold ">
                  Vive la emoción de cerca!
                </h1>
                <p className="text-md text-primary ">
                  Este domingo 1 de Mayo se presentará Oscar Quiñonez en nuestra
                  casa. ¡¡Llenemos las tribunas, hagamos sentir la Tauromaquia!!
                </p>
                <p className="text-md text-primary font-bold">
                  Información adicional
                </p>
                <p>Términos y condiciones:</p>
                <p className="-mt-5">ANTES DE COMPRAR:</p>
                <p>
                  Por disposiciones sanitarias del MINSA, solo podrán acceder al
                  estadio las personas (niños y adultos) que cuenten con
                  constancia de vacunación completa con el COVID 19.
                </p>
                <p>
                  Mascarilla KN95 o Doble Mascarilla (En caso sean quirúrgicas o
                  de tela)
                </p>
                <p>
                  Constancia digital o física de esquema de vacunación completo:
                  <br />
                  Ingreso para menores de edad con 2 dosis
                  <br />
                  Ingreso para mayores de 18 años a más con 2 dosis y dosis de
                  refuerzo
                </p>

                <p>
                  Documento Nacional de Identidad
                  <br />
                  Entrada Impresa
                </p>

                <p>
                  No hay Reembolso o devolución por entradas adquiridas
                  <br />
                  Cada entrada debe tener el nombre y DNI de la persona que hará
                  uso de la misma
                  <br />
                  No se permiten cambios de tribuna, tipo de entrada o de
                  partido
                  <br />
                  Los menores de edad deben ingresar acompañados por un adulto
                  <br />
                </p>
                <p>
                  Recuerda que, si el partido sufre de inconvenientes causados
                  por circunstancias externas a la organización, el partido o el
                  ingreso al estadio puede anularse o verse restringido sin
                  opción a devolución o reembolso.
                </p>
              </article>
            </section>

            <section className="bg-white flex-1 rounded-lg   shadow-lg border">
              <article className="flex flex-col gap-2 p-3 lg:px-3 ">
                <Image
                  src={`/imgs/flyers/flyer1.jpg`}
                  alt="Picture of the author"
                  width={500}
                  height={350}
                  className="object-cover"
                />
                <h2 className="text-[27px] text-center mt-2 text-primary font-bold ">
                  Feria La Esperanza
                </h2>
                <div className="flex gap-x-5 justify-center items-center">
                  <div className="flex gap-x-3">
                    <div className="mt-0.5">
                      <IconCalendar width={16} height={16} />
                    </div>

                    <div className="">23 jul 2022</div>
                  </div>
                  <div className="flex gap-x-3">
                    <div className="mt-0.5">
                      <IconHour width={16} height={16} />
                    </div>
                    <div className="">1:56 am</div>
                  </div>
                </div>
                <p className="text-md text-text text-center border-b border-black pb-5">
                  ¡Disfruta una emocionante tarde de toros en la comodidad de
                  nuestras butacas!
                </p>
              </article>
              <article className="mb-5">
                <p className="text-2xl text-primary font-bold px-3 pb-3">
                  Entradas
                </p>
                <section className="flex flex-col">
                  {abonado?.entradas.map((item, index) => (
                    <article
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-[#F3F3F3]" : "bg-white"
                      }    flex justify-between p-3 items-center`}
                    >
                      <div className="flex-1 text-[10px]">
                        <p className=" text-primary  leading-5">{item.title}</p>
                        <p className=" text-primary text-[9px] leading-5">
                          desde
                        </p>
                      </div>
                      <p className="flex-1 text-center text-[20px] font-semibold">
                        S/ {item.price}
                      </p>
                      <div className="flex-1">
                        <button
                          onClick={() => handleModal(item.id)}
                          className={` px-6 py-2 mt-2 text-sm rounded-sm text-white font-semibold cursor-pointer ${colors[index]} `}
                        >
                          <p>Comprar</p>
                        </button>
                      </div>
                    </article>
                  ))}
                </section>
              </article>
            </section>
          </main>
        </Container>
        <Container bgColor="bg-white" className=" pb-5 pr-5">
          <section className="py-5 flex justify-center lg:justify-end">
            <article className="border w-full  lg:w-[280px] xl:w-[380px] p-3 rounded-md flex flex-col gap-1 shadow-xl">
              <h2 className="text-2xl text-primary font-bold">Lurín, Lima</h2>
              <p className="text-md text-text font-semibold">
                Fundo La Esperanza
              </p>
              <div className="w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d124765.90864455116!2d-76.87008!3d-12.252702!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6836d2dfddd46029!2sFundo%20La%20Esperanza%20-%20Lur%C3%ADn!5e0!3m2!1sen!2sus!4v1653950659611!5m2!1sen!2sus"
                  width="100%"
                  height="350"
                  loading="lazy"
                />
              </div>
            </article>
          </section>
        </Container>
      </div>

      <ModalTendido1
        isOpen={showModalTenido1}
        onClose={() => setShowModalTenido1(false)}
      />

      <ModalTendido2Sol
        isOpen={showModalTenido2Sol}
        onClose={() => setShowModalTenido2Sol(false)}
      />

      <ModalTendido2Bajo
        isOpen={showModalTenido2Bajo}
        onClose={() => setShowModalTenido2Bajo(false)}
      />

      <ModalTendido3Sol
        isOpen={showModalTenido3Sol}
        onClose={() => setShowModalTenido3Sol(false)}
      />

      <ModalTendido3ASol
        isOpen={showModalTenido3ASol}
        onClose={() => setShowModalTenido3ASol(false)}
      />

      <ModalTendido3B
        isOpen={showModalTenido3B}
        onClose={() => setShowModalTenido3B(false)}
      />
    </>
  );
};

export default Abonados;
