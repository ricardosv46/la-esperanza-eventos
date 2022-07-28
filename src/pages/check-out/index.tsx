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

import * as Yup from 'yup'
import { useSession } from 'next-auth/react'
import { usePedidoAbonado } from '../../services/usePedidoAbonado'
import { usePedidoEvento } from '../../services/usePedidoEvento'
import ModalPayme from '../../components/ModalPayme'
import useToggle from '../../hooks/useToggle'
import { payRequest } from '../../data/paydata'
import { FormPayAuth, FormPayNotAuth } from '../../components/FormPay'
import moment from 'moment'

const CheckOut = () => {
  const { status, data } = useSession() as any

  const [pagado, setPagado] = useState(false)
  const [errores, setErrores] = useState('')

  const { query } = useRouter()
  const { fecha, hora } = useRouter().query as any

  return (
    <Container bgColor='bg-[#fff2e6]' className='px-5 py-5'>
      {pagado && <p>se realizo el pago correctamente</p>}

      {!pagado && (
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

                <div className=''>{moment(fecha).format('LL')}</div>
              </div>
              <div className='flex gap-x-3'>
                <div className='mt-0.5'>
                  <IconHour width={16} height={16} />
                </div>
                <div className=''>{moment(fecha + ' ' + hora).format('hh:mm A')}</div>
              </div>
            </div>
          </div>

          {status === 'authenticated' && (
            <FormPayAuth
              isAbono={query.name === 'abono'}
              onSubmit={(res) => {
                if (res?.ok) {
                  setPagado(true)
                } else {
                  setErrores(res?.error!)
                  setTimeout(() => {
                    setErrores('')
                  }, 5000)
                }
              }}
            />
          )}

          {status !== 'authenticated' && (
            <FormPayNotAuth
              errores={errores}
              isAbono={query.name === 'abono'}
              onSubmit={(res) => {
                if (res?.ok) {
                  setPagado(true)
                } else {
                  setErrores(res?.error!)
                  setTimeout(() => {
                    setErrores('')
                  }, 5000)
                }
              }}
            />
          )}
        </div>
      )}
    </Container>
  )
}

export default CheckOut
