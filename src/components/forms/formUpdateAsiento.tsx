import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import IconCalendar from '../../../public/icons/IconCalendar'
import IconHour from '../../../public/icons/IconHour'
import * as Yup from 'yup'
import { useEntradasUsuario } from '../../services/useEntradasUsuario'
import { useUpdateAsignacionEntrada } from '../../services/useUpdateAsignacionEntrada'

interface Props {
  eventoId?: number | null | undefined
  tendido?: string | null | undefined
  reservado?: string | null | undefined
  tipoDocumento?: string | null | undefined
  numDocumento?: string | null | undefined
  nombres?: string | null | undefined
  apellidos?: string | null | undefined
  asientoId: string
}

const FormUpdateAsiento = ({
  eventoId,
  tendido,
  reservado,
  tipoDocumento,
  numDocumento,
  nombres,
  apellidos,
  asientoId
}: Props) => {
  const [mensaje, setMensaje] = useState('')
  const [error, serError] = useState(false)
  const { updateAsignacionEntrada } = useUpdateAsignacionEntrada()

  return (
    <article key={eventoId} className='max-w-[280px] p-5 bg-white rounded-xl shadow-lg'>
      <h2 className='text-xl leading-6 font-bold'>
        FERIA LA ESPERANZA <br />
        {tendido} <br />
        {reservado}
      </h2>

      <div className='flex gap-x-5 py-3'>
        <div className='flex items-center gap-x-3'>
          <IconCalendar width={12} height={12} />
          <p className='text-xs mt-0.5'>junio 25, 2022</p>
        </div>
        <div className='flex items-center gap-x-3'>
          <IconHour width={12} height={12} />
          <p className='text-xs mt-0.5'> 1:05</p>
        </div>
      </div>

      <Formik
        initialValues={{
          tipoDocumento: tipoDocumento ?? '',
          documento: numDocumento ?? '',
          nombres: nombres ?? '',
          apellidos: apellidos ?? ''
        }}
        validationSchema={Yup.object().shape({
          documento: Yup.string()
            .required(`El número es requerido`)
            .matches(/^[0-9]+$/, 'Debe ser solo números'),
          nombres: Yup.string().required(`El nombre es requerido`),
          apellidos: Yup.string().required(`El apellido es requerido`)
        })}
        onSubmit={(values) => {
          updateAsignacionEntrada({
            apellidos: values.apellidos,
            asientoId: asientoId,
            nombres: values.nombres,
            numDocumento: values.documento,
            tipoDocumento: values.tipoDocumento
          }).then((res) => {
            if (res?.ok) {
              setMensaje('Datos actualizados')
              serError(false)
            } else {
              setMensaje('No se pudo actualizar')
              serError(true)
            }
            setTimeout(() => {
              setMensaje('')
              serError(false)
            }, 5000)
          })
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
            <Field
              as='select'
              name='tipoDocumento'
              className='rounded-sm h-10 px-3 border border-gray-40'
              value={values.tipoDocumento}
              onChange={handleChange}
              onBlur={handleBlur}>
              <option className='' value='DNI'>
                DNI
              </option>
              <option className='' value='CE'>
                CE
              </option>
            </Field>

            <div className='relative'>
              <Field
                name='documento'
                type='text'
                className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
                placeholder='Nro de Documento'
              />
              {errors.documento && touched.documento ? (
                <p className='text-red-500 leading-5 absolute -bottom-5 text-sm px-1 '>{errors.documento}</p>
              ) : null}
            </div>
            <div className='relative'>
              <Field
                name='nombres'
                type='text'
                className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
                placeholder='Nombres'
              />
              {errors.nombres && touched.nombres ? (
                <p className='text-red-500 leading-5 absolute -bottom-5 text-sm px-1 '>{errors.nombres}</p>
              ) : null}
            </div>
            <div className='relative'>
              <Field
                name='apellidos'
                type='text'
                className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
                placeholder='Apellidos'
              />{' '}
              {errors.apellidos && touched.apellidos ? (
                <p className='text-red-500 leading-5 absolute -bottom-5 text-sm px-1 '>{errors.apellidos}</p>
              ) : null}
            </div>

            <div className='flex justify-center relative'>
              <p className={`absolute -top-5 ${error ? 'text-red-500' : 'text-green-500'}`}>{mensaje}</p>

              <button
                type='submit'
                className='bg-[#a02e2b] w-full text-white pb-2 pt-1 mt-5  px-4 hover:opacity-75 transition-all duration-500 rounded-md'>
                Registrar
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className=' text-xs'>
        <p className='text-justify mt-4'>
          Llena los datos del asistente al evento para validar su entrada en la puerta. Tienes hasta una hora antes del
          inicio del evento para hacer el registro o transferir el asiento a otra persona.
        </p>
      </div>
    </article>
  )
}

export default FormUpdateAsiento
