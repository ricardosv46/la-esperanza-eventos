import { Field, Form, Formik } from 'formik'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import IconCalendar from '../../../public/icons/IconCalendar'
import IconHour from '../../../public/icons/IconHour'
import Container from '../../components/container'
import { useEntradasUsuario } from '../../services/useEntradasUsuario'
import * as Yup from 'yup'
import { useUpdateAsignacionEntrada } from '../../services/useUpdateAsignacionEntrada'
import FormUpdateAsiento from '../../components/forms/formUpdateAsiento'
const DetalleEntrada = () => {
  const navigate = useRouter()
  const { slug } = useRouter().query as any

  const [mensaje, setMensaje] = useState('')
  const [error, serError] = useState(false)

  console.log(slug)
  const { entradas, loading } = useEntradasUsuario(slug)

  const { updateAsignacionEntrada } = useUpdateAsignacionEntrada()

  console.log(entradas)

  const { status } = useSession()
  useEffect(() => {
    if (status !== 'authenticated') {
      navigate.push('/')
    }
  }, [status])

  return (
    <Container bgColor='bg-[#fff2e6]' className='px-5'>
      <div className='max-w-[1200px] py-10 mx-auto'>
        <div className=''>
          <h1 className='text-3xl font-bold'>Detalle de la compra</h1>
          <div className='grid grid-cols-3 mt-5'>
            {entradas.map((entrada) => (
              <FormUpdateAsiento key={entrada?.asientoId} {...entrada} asientoId={entrada?.asientoId!} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx)

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }

  return {
    props: {
      session: session
    }
  }
}

export default DetalleEntrada
