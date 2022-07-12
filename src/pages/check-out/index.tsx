import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import IconCalendar from "../../../public/icons/IconCalendar";
import IconHour from "../../../public/icons/IconHour";
import IconShield from "../../../public/icons/IconShield";
import Container from "../../components/container";
import InputFloat from "../../components/inputs/InputFloat";
import { usePaymentContext } from "../../context/payment/PaymentState";
import useForm from "../../hooks/useForm";

const CheckOut = () => {
  const { ruc, nombres, apellidos, celular, email, onChange } = useForm({
    ruc: "",
    nombres: "",
    apellidos: "",
    celular: "",
    email: "",
  });

  const { query } = useRouter();
  console.log(query.name);

  const { pago } = usePaymentContext();
  const total = pago.reduce(
    (previousValue, currentValue) => previousValue + currentValue.precio,
    0
  );

  return (
    <Container bgColor="bg-[#fff2e6]" className="px-5 py-5">
      <div className="max-w-[1000px] w-full mx-auto p-10 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold border-b border-black pb-3">
          Detalle
        </h1>
        <div className="flex justify-between flex-wrap border-b border-black">
          <p className="text-xl  font-bold py-5">
            {query.name === "abono" ? "Abonos" : "Eventos"} 2022, Plaza - La
            Esperanza
          </p>
          <div className="flex gap-x-5 justify-center flex-wrap items-center">
            <div className="flex gap-x-3">
              <div className="mt-0.5">
                <IconCalendar width={16} height={16} />
              </div>

              <div className="">miércoles 08 de Junio</div>
            </div>
            <div className="flex gap-x-3">
              <div className="mt-0.5">
                <IconHour width={16} height={16} />
              </div>
              <div className="">1:56 am</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-8">
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap-2">
            <select
              className="rounded-md h-[50px] px-3 border border-gray-300 "
              name=""
            >
              <option className="" value="dni">
                Boleta
              </option>
              <option className="" value="ce">
                Factura
              </option>
            </select>

            <InputFloat
              type="ruc"
              label="RUC"
              name="ruc"
              value={ruc}
              onChange={onChange}
            />

            <InputFloat
              type="nombres"
              label="Nombres"
              name="nombres"
              value={nombres}
              onChange={onChange}
            />
            <InputFloat
              type="apellidos"
              label="Apellidos"
              name="apellidos"
              value={apellidos}
              onChange={onChange}
            />

            <InputFloat
              type="celular"
              label="Celular"
              name="celular"
              value={celular}
              onChange={onChange}
            />

            <InputFloat
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <div className="flex items-center gap-x-2">
              <input type="checkbox" />
              <p className="text-xs">Acepto los términos y condiciones</p>
            </div>

            <p className="text-xs leading-[11px] px-1">
              Llene sus datos correctamente, con ellos creará un registro con su
              cuenta para generar sus boletos para el evento.
            </p>

            <div className="flex gap-2 justify-start items-center ">
              <IconShield width={20} height={20} fill="#F0AC42" />
              <p className="text-md text-[#F0AC42] font-bold">Compra Segura</p>
            </div>
          </div>
          <div>
            <div className="flex justify-end mb-10">
              <p className="w-[300px] text-xl font-bold">Nro de entradas</p>
              <p className="text-xl font-bold">{pago.length}</p>
            </div>
            {pago.map((item) => (
              <div key={item.id} className="flex items-center justify-end ">
                <p className="w-[300px] text-xs">1 x ABONO – {item.id}</p>
                <p className="text-md font-bold">S/{item.precio.toFixed(2)}</p>
              </div>
            ))}
            <div className="flex items-center justify-end mt-10 text-2xl font-bold">
              <p className="w-[200px] ">Total</p>
              <p>S/{total.toFixed(2)}</p>
            </div>

            <div className="w-full flex items-center justify-end gap-x-4 mt-5 ">
              <div className="mt-1">
                <Image
                  src="/imgs/detalle/tarjetas-credito.png"
                  alt="Picture of the author"
                  width={110}
                  height={30}
                />
              </div>

              <button
                onClick={() => {}}
                className="bg-[#a02e2b] text-white  py-1.5 px-5 sm:px-10 hover:opacity-75 transition-all duration-500 rounded-md"
              >
                Ir a Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckOut;
