import React, { useState } from 'react'
import { FormikErrors, FormikValues, useFormik } from 'formik'
import Image from 'next/image'
import IconShield from '../../../public/icons/IconShield'
import InputFloat from '../inputs/InputFloat'
import ModalPayme from '../ModalPayme'
import useToggle from '../../hooks/useToggle'
import { payRequest } from '../../data/paydata'
import { usePaymentContext } from '../../context/payment/PaymentState'
import { usePedidoEvento } from '../../services/usePedidoEvento'
import { usePedidoAbonado } from '../../services/usePedidoAbonado'
import { isEmail } from '../../utils/isEmail'
import { useEmail } from '../../services/useEmail'
import { isEmpty } from '../../utils/isEmpty'
import moment from 'moment'

interface Props {
  errores: string
  isAbono: boolean
  onSubmit: (res: { ok?: boolean; error?: string }) => void
}

const consultaCorreo = async (email: string) => {
  const res = await fetch(
    'https://laesperanza.almacenrivera.com/public/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
      mutation ConsultEmail($email:String!){
        ConsultEmail(email:$email)
      }
        `,
        variables: {
          email
        }
      })
    }
  ).then((res) => res.json())

  return res.data?.ConsultEmail === 'EMAIL_VALIDO'
}

const validationSchema = async (values: FormikValues) => {
  let errors: FormikErrors<FormikValues> = {}

  const isDNI = values.tipoComprobante === 'Boleta'
  const isRUC = values.tipoComprobante === 'Factura'

  if (isDNI) {
    if (isEmpty(values.dni)) {
      errors.dni = 'El DNI es requerido'
    }

    if (values.dni.length !== 8) {
      errors.dni = 'El DNI debe tener 8 dígitos'
    }
  }

  if (isRUC) {
    if (isEmpty(values.ruc)) {
      errors.ruc = 'El RUC es requerido'
    }

    if (values.ruc.length !== 11) {
      errors.ruc = 'El RUC debe tener 11 dígitos'
    }
  }

  if (isEmpty(values.celular)) {
    errors.celular = 'El número es requerido'
  }

  if (isEmpty(values.nombres)) {
    errors.nombres = 'El nombre es requerido'
  }

  if (isEmpty(values.apellidos)) {
    errors.apellidos = 'El apellido es requerido'
  }

  if (isEmpty(values.email)) {
    errors.email = 'El Email es requerido'
  }

  if (!isEmail(values.email)) {
    errors.email = 'Debe ser un Email valido'
  }

  if (isEmail(values.email)) {
    const respuesta = await consultaCorreo(values.email)
    if (!respuesta) {
      errors.email = 'El Email ya existe, inicie sesión'
    }
  }
  return errors
}

export const FormPayNotAuth = ({ isAbono, onSubmit, errores }: Props) => {
  const { pago } = usePaymentContext()
  const { isOpen, onOpen, onClose } = useToggle()
  const [isChecked, setIsChecked] = useState(false)

  const { createPedidoEvento } = usePedidoEvento()
  const { createPedidoAbonado } = usePedidoAbonado()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validate: validationSchema,
      onSubmit: onOpen,
      initialValues: {
        tipoComprobante: 'Boleta',
        ruc: '',
        dni: '',
        nombres: '',
        apellidos: '',
        celular: '',
        email: ''
      }
    })

  const fecha = moment().format('YYYY-MM-DD')

  const handleOnChangeCheckBox = () => {
    setIsChecked(!isChecked)
  }

  const handlePay = async ({ id }: { id: string }) => {
    const transaccionId = parseInt(id)

    if (isAbono) {
      const res = await createPedidoAbonado({
        input1: {
          transaccionId,
          precioTotal: total,
          fechaPedido: fecha,
          numeroComprobante: values.tipoComprobante === 'Factura' ? values.ruc : values.dni,
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
          fechaPedido: fecha,
          numeroComprobante: values.tipoComprobante === 'Factura' ? values.ruc : values.dni,
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
              name={values.tipoComprobante === 'Factura' ? 'ruc' : 'dni'}
              value={
                values.tipoComprobante === 'Factura' ? values.ruc : values.dni
              }
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.ruc && touched.ruc ? (
              <p className="text-red-500 leading-5 absolute -bottom-5 text-sm px-1 ">
                {errors.ruc}
              </p>
            ) : null}
            {errors.dni && touched.dni ? (
              <p className="text-red-500 leading-5 absolute -bottom-5 text-sm px-1 ">
                {errors.dni}
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
            <input
              type="checkbox"
              id="topping"
              name="topping"
              value="Terminos"
              checked={isChecked}
              onChange={handleOnChangeCheckBox}
            />
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
              disabled={!isChecked}
              type="submit"
              className={`bg-[#a02e2b] text-white  py-1.5 px-5 sm:px-10 hover:opacity-75 transition-all duration-500 rounded-md ${
                !isChecked ? 'opacity-50' : 'opacity-100'
              } `}
            >
              Ir a Pagar
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
