import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import IconShield from '../../../public/icons/IconShield'
import InputFloat from '../inputs/InputFloat'
import ModalPayme from '../ModalPayme'
import useToggle from '../../hooks/useToggle'
import { payRequest } from '../../data/paydata'
import { usePaymentContext } from '../../context/payment/PaymentState'
import { usePedidoEvento } from '../../services/usePedidoEvento'
import { usePedidoAbonado } from '../../services/usePedidoAbonado'

interface Props {
  errores: string
  isAbono: boolean
  onSubmit: (res: { ok?: boolean; error?: string }) => void
}

const validationSchema = Yup.object().shape({
  documento: Yup.string()
    .required(`El número es requerido`)
    .matches(/^[0-9]+$/, 'Debe ser solo números'),
  nombres: Yup.string().required(`El nombre es requerido`),
  apellidos: Yup.string().required(`El apellido es requerido`),
  celular: Yup.number()
    .positive('El Número no es válido')
    .integer('El Número no es válido')
    .required('El Telefono es requerido')
    .typeError(`El Número no es válido`),
  email: Yup.string()
    .email('Debe ser un Email valido')
    .required(`El Email es requerido`)
})

export const FormPayNotAuth = ({ isAbono, onSubmit, errores }: Props) => {
  const { pago } = usePaymentContext()
  const { isOpen, onOpen, onClose } = useToggle()
  const { createPedidoEvento } = usePedidoEvento()
  const { createPedidoAbonado } = usePedidoAbonado()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validationSchema,
      onSubmit: onOpen,
      initialValues: {
        tipoComprobante: 'Boleta',
        documento: '',
        nombres: '',
        apellidos: '',
        celular: '',
        email: ''
      }
    })

  const handlePay = async ({ id }: { id: string }) => {
    const transaccionId = parseInt(id)

    if (isAbono) {
      const res = await createPedidoAbonado({
        input1: {
          transaccionId,
          precioTotal: total,
          fechaPedido: '2022-07-22',
          numeroComprobante: values.documento,
          tipoComprobante: values.tipoComprobante
        },
        input2: pago,
        input3: {
          apellidos: values.apellidos,
          nombres: values.nombres,
          celular: values.celular,
          email: values.email
        }
      })

      onSubmit(res)
    }

    if (!isAbono) {
      const res = await createPedidoEvento({
        input1: {
          transaccionId,
          precioTotal: total,
          fechaPedido: '2022-07-22',
          numeroComprobante: values.documento,
          tipoComprobante: values.tipoComprobante
        },
        input2: pago,
        input3: {
          apellidos: values.apellidos,
          nombres: values.nombres,
          celular: values.celular,
          email: values.email
        }
      })

      onSubmit(res)
    }
  }

  const total = pago.reduce((prev, curr) => prev + curr.precio, 0)

  return (
    <>
      <ModalPayme
        isOpen={isOpen}
        onClose={onClose}
        onChange={handlePay}
        payload={payRequest({ amount: total })}
      />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <select
            name="tipoComprobante"
            className="rounded-md h-[50px] px-3 border border-gray-300 "
            value={values.tipoComprobante}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option className="" value="Boleta">
              Boleta
            </option>
            <option className="" value="Factura">
              Factura
            </option>
          </select>

          <div className="relative">
            <InputFloat
              type="text"
              label={values.tipoComprobante === 'Factura' ? 'RUC' : 'DNI'}
              name="documento"
              value={values.documento}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.documento && touched.documento ? (
              <p className="text-red-500 leading-5 absolute -bottom-5 text-sm px-1 ">
                {errors.documento}
              </p>
            ) : null}
          </div>

          <div className="relative">
            <InputFloat
              type="text"
              label="Nombres"
              name="nombres"
              value={values.nombres}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.nombres && touched.nombres ? (
              <p className="text-red-500 leading-5 absolute -bottom-5 text-sm px-1 ">
                {errors.nombres}
              </p>
            ) : null}
          </div>

          <div className="relative">
            <InputFloat
              type="text"
              label="Apellidos"
              name="apellidos"
              value={values.apellidos}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.apellidos && touched.apellidos ? (
              <p className="text-red-500 leading-5 absolute -bottom-5 text-sm px-1 ">
                {errors.apellidos}
              </p>
            ) : null}
          </div>
          <div className="relative">
            <InputFloat
              type="text"
              label="Celular"
              name="celular"
              value={values.celular}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.celular && touched.celular ? (
              <p className="text-red-500 leading-5 absolute -bottom-5 text-sm px-1 ">
                {errors.celular}
              </p>
            ) : null}
          </div>

          <div className="relative">
            <InputFloat
              type="email"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.email && touched.email ? (
              <p className="text-red-500 leading-5 absolute -bottom-5 text-sm px-1 ">
                {errors.email}
              </p>
            ) : null}
          </div>
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

          {errores.length > 0 && (
            <p className="text-red-500 font-bold">{errores}</p>
          )}
        </div>
        <div>
          <div className="flex justify-end mb-10">
            <p className="w-[300px] text-xl font-bold">Nro de entradas</p>
            <p className="text-xl font-bold">{pago.length}</p>
          </div>
          {pago.map((item) => (
            <div
              key={item.reservado}
              className="flex items-center justify-end "
            >
              <p className="w-[300px] text-xs">1 x ABONO – {item.reservado}</p>
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
              type="submit"
              className="bg-[#a02e2b] text-white  py-1.5 px-5 sm:px-10 hover:opacity-75 transition-all duration-500 rounded-md"
            >
              Ir a Pagar
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
