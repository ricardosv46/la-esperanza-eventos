import { ErrorMessage, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import IconCalendar from '../../../public/icons/IconCalendar'
import IconHour from '../../../public/icons/IconHour'
import IconShield from '../../../public/icons/IconShield'
import Container from '../../components/container'
import InputFloat from '../../components/inputs/InputFloat'
import { usePaymentContext } from '../../context/payment/PaymentState'
import useForm from '../../hooks/useForm'

import * as Yup from 'yup'
import { useSession } from 'next-auth/react'
import { usePedidoAbonado } from '../../services/usePedidoAbonado'
import { usePedidoEvento } from '../../services/usePedidoEvento'

const CheckOut = () => {
  const { createPedidoAbonado } = usePedidoAbonado()
  const { createPedidoEvento } = usePedidoEvento()
  const { status, data } = useSession() as any

  const [pagado, setPagado] = useState(false)
  const [errores, setErrores] = useState('')

  const { query } = useRouter()
  console.log(query.name)

  const { pago } = usePaymentContext()

  console.log('paiog', pago)

  const total = pago.reduce((previousValue, currentValue) => previousValue + currentValue.precio, 0)

  return (
    <Container bgColor='bg-[#fff2e6]' className='px-5 py-5'>
      {pagado ? (
        <p>se realizo el pago correctamente</p>
      ) : (
        <div className='max-w-[1000px] w-full mx-auto p-10 bg-white shadow-xl rounded-xl'>
          <h1 className='text-3xl font-bold border-b border-black pb-3'>Detalle</h1>
          <div className='flex justify-between flex-wrap border-b border-black'>
            <p className='text-xl  font-bold py-5'>
              {query.name === 'abono' ? 'Abonos' : 'Eventos'} 2022, Plaza - La Esperanza
            </p>
            <div className='flex gap-x-5 justify-center flex-wrap items-center'>
              <div className='flex gap-x-3'>
                <div className='mt-0.5'>
                  <IconCalendar width={16} height={16} />
                </div>

                <div className=''>miércoles 08 de Junio</div>
              </div>
              <div className='flex gap-x-3'>
                <div className='mt-0.5'>
                  <IconHour width={16} height={16} />
                </div>
                <div className=''>1:56 am</div>
              </div>
            </div>
          </div>

          {status === 'authenticated' ? (
            <Formik
              initialValues={{
                tipoComprobante: 'Boleta',
                documento: ''
              }}
              validationSchema={Yup.object().shape({
                documento: Yup.string()
                  .required(`El número es requerido`)
                  .matches(/^[0-9]+$/, 'Debe ser solo números')
              })}
              onSubmit={(values) => {
                if (query.name === 'abono') {
                  createPedidoAbonado({
                    input1: {
                      fechaPedido: '2022-07-22',
                      numeroComprobante: values.documento,
                      precioTotal: total,
                      tipoComprobante: values.tipoComprobante
                    },
                    input2: pago,
                    input3: {}
                  }).then((res) => {
                    if (res?.ok) {
                      setPagado(true)
                    } else {
                      setErrores(res?.error)
                      setTimeout(() => {
                        setErrores('')
                      }, 5000)
                    }
                  })
                }

                if (query.name === 'evento') {
                  createPedidoEvento({
                    input1: {
                      fechaPedido: '2022-07-22',
                      numeroComprobante: values.documento,
                      precioTotal: total,
                      tipoComprobante: values.tipoComprobante
                    },
                    input2: pago,
                    input3: {}
                  }).then((res) => {
                    if (res?.ok) {
                      setPagado(true)
                    } else {
                      setErrores(res?.error)
                      setTimeout(() => {
                        setErrores('')
                      }, 5000)
                    }
                  })
                }
              }}>
              {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-8'>
                  <div className='grid h-auto grid-cols-1 sm:grid-cols-2 gap-6'>
                    <select
                      name='tipoComprobante'
                      className='rounded-md h-[50px] px-3 border border-gray-300 '
                      value={values.tipoComprobante}
                      onChange={handleChange}
                      onBlur={handleBlur}>
                      <option className='' value='Boleta'>
                        Boleta
                      </option>
                      <option className='' value='Factura'>
                        Factura
                      </option>
                    </select>

                    <div className='relative'>
                      <InputFloat
                        type='text'
                        label={values.tipoComprobante === 'Factura' ? 'RUC' : 'DNI'}
                        name='documento'
                        value={values.documento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.documento && touched.documento ? (
                        <p className='text-red-500 leading-5 absolute top-[50px] text-sm px-1 '>{errors.documento}</p>
                      ) : null}
                    </div>

                    <div className='flex items-center gap-x-2'>
                      <input type='checkbox' />
                      <p className='text-xs'>Acepto los términos y condiciones</p>
                    </div>

                    <div className='flex gap-2 justify-start items-center '>
                      <IconShield width={20} height={20} fill='#F0AC42' />
                      <p className='text-md text-[#F0AC42] font-bold'>Compra Segura</p>
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-end mb-10'>
                      <p className='w-[300px] text-xl font-bold'>Nro de entradas</p>
                      <p className='text-xl font-bold'>{pago.length}</p>
                    </div>
                    {pago.map((item) => (
                      <div key={item.reservado} className='flex items-center justify-end '>
                        <p className='w-[300px] text-xs'>1 x ABONO – {item.reservado}</p>
                        <p className='text-md font-bold'>S/{item.precio.toFixed(2)}</p>
                      </div>
                    ))}
                    <div className='flex items-center justify-end mt-10 text-2xl font-bold'>
                      <p className='w-[200px] '>Total</p>
                      <p>S/{total.toFixed(2)}</p>
                    </div>

                    <div className='w-full flex items-center justify-end gap-x-4 mt-5 '>
                      <div className='mt-1'>
                        <Image
                          src='/imgs/detalle/tarjetas-credito.png'
                          alt='Picture of the author'
                          width={110}
                          height={30}
                        />
                      </div>

                      <button
                        type='submit'
                        className='bg-[#a02e2b] text-white  py-1.5 px-5 sm:px-10 hover:opacity-75 transition-all duration-500 rounded-md'>
                        Ir a Pagar
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                tipoComprobante: 'Boleta',
                documento: '',
                nombres: '',
                apellidos: '',
                celular: '',
                email: ''
              }}
              validationSchema={Yup.object().shape({
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
                email: Yup.string().email('Debe ser un Email valido').required(`El Email es requerido`)
              })}
              onSubmit={(values) => {
                if (query.name === 'abono') {
                  createPedidoEvento({
                    input1: {
                      fechaPedido: '2022-07-22',
                      numeroComprobante: values.documento,
                      precioTotal: total,
                      tipoComprobante: values.tipoComprobante
                    },
                    input2: pago,
                    input3: {
                      nombres: values.nombres,
                      apellidos: values.apellidos,
                      celular: values.celular,
                      email: values.email
                    }
                  }).then((res) => {
                    if (res?.ok) {
                      setPagado(true)
                    } else {
                      setErrores(res?.error)
                      setTimeout(() => {
                        setErrores('')
                      }, 5000)
                    }
                  })
                }

                if (query.name === 'evento') {
                  createPedidoEvento({
                    input1: {
                      fechaPedido: '2022-07-22',
                      numeroComprobante: values.documento,
                      precioTotal: total,
                      tipoComprobante: values.tipoComprobante
                    },
                    input2: pago,
                    input3: {
                      nombres: values.nombres,
                      apellidos: values.apellidos,
                      celular: values.celular,
                      email: values.email
                    }
                  }).then((res) => {
                    if (res?.ok) {
                      setPagado(true)
                    } else {
                      setErrores(res?.error)
                      setTimeout(() => {
                        setErrores('')
                      }, 5000)
                    }
                  })
                }
              }}>
              {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-8'>
                  <div className='grid  grid-cols-1 sm:grid-cols-2 gap-6'>
                    <select
                      name='tipoComprobante'
                      className='rounded-md h-[50px] px-3 border border-gray-300 '
                      value={values.tipoComprobante}
                      onChange={handleChange}
                      onBlur={handleBlur}>
                      <option className='' value='Boleta'>
                        Boleta
                      </option>
                      <option className='' value='Factura'>
                        Factura
                      </option>
                    </select>

                    <div className='relative'>
                      <InputFloat
                        type='text'
                        label={values.tipoComprobante === 'Factura' ? 'RUC' : 'DNI'}
                        name='documento'
                        value={values.documento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.documento && touched.documento ? (
                        <p className='text-red-500 leading-5 absolute -bottom-5 text-sm px-1 '>{errors.documento}</p>
                      ) : null}
                    </div>

                    <div className='relative'>
                      <InputFloat
                        type='text'
                        label='Nombres'
                        name='nombres'
                        value={values.nombres}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.nombres && touched.nombres ? (
                        <p className='text-red-500 leading-5 absolute -bottom-5 text-sm px-1 '>{errors.nombres}</p>
                      ) : null}
                    </div>

                    <div className='relative'>
                      <InputFloat
                        type='text'
                        label='Apellidos'
                        name='apellidos'
                        value={values.apellidos}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.apellidos && touched.apellidos ? (
                        <p className='text-red-500 leading-5 absolute -bottom-5 text-sm px-1 '>{errors.apellidos}</p>
                      ) : null}
                    </div>
                    <div className='relative'>
                      <InputFloat
                        type='text'
                        label='Celular'
                        name='celular'
                        value={values.celular}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.celular && touched.celular ? (
                        <p className='text-red-500 leading-5 absolute -bottom-5 text-sm px-1 '>{errors.celular}</p>
                      ) : null}
                    </div>

                    <div className='relative'>
                      <InputFloat
                        type='email'
                        label='Email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.email && touched.email ? (
                        <p className='text-red-500 leading-5 absolute -bottom-5 text-sm px-1 '>{errors.email}</p>
                      ) : null}
                    </div>
                    <div className='flex items-center gap-x-2'>
                      <input type='checkbox' />
                      <p className='text-xs'>Acepto los términos y condiciones</p>
                    </div>

                    <p className='text-xs leading-[11px] px-1'>
                      Llene sus datos correctamente, con ellos creará un registro con su cuenta para generar sus boletos
                      para el evento.
                    </p>

                    <div className='flex gap-2 justify-start items-center '>
                      <IconShield width={20} height={20} fill='#F0AC42' />
                      <p className='text-md text-[#F0AC42] font-bold'>Compra Segura</p>
                    </div>

                    {errores.length > 0 && <p className='text-red-500 font-bold'>{errores}</p>}
                  </div>
                  <div>
                    <div className='flex justify-end mb-10'>
                      <p className='w-[300px] text-xl font-bold'>Nro de entradas</p>
                      <p className='text-xl font-bold'>{pago.length}</p>
                    </div>
                    {pago.map((item) => (
                      <div key={item.reservado} className='flex items-center justify-end '>
                        <p className='w-[300px] text-xs'>1 x ABONO – {item.reservado}</p>
                        <p className='text-md font-bold'>S/{item.precio.toFixed(2)}</p>
                      </div>
                    ))}
                    <div className='flex items-center justify-end mt-10 text-2xl font-bold'>
                      <p className='w-[200px] '>Total</p>
                      <p>S/{total.toFixed(2)}</p>
                    </div>

                    <div className='w-full flex items-center justify-end gap-x-4 mt-5 '>
                      <div className='mt-1'>
                        <Image
                          src='/imgs/detalle/tarjetas-credito.png'
                          alt='Picture of the author'
                          width={110}
                          height={30}
                        />
                      </div>

                      <button
                        type='submit'
                        className='bg-[#a02e2b] text-white  py-1.5 px-5 sm:px-10 hover:opacity-75 transition-all duration-500 rounded-md'>
                        Ir a Pagar
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </div>
      )}
    </Container>
  )
}

export default CheckOut
