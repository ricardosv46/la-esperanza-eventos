import { Field, Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import IconCalendar from '../../../public/icons/IconCalendar'
import IconHour from '../../../public/icons/IconHour'
import * as Yup from 'yup'
import { useEntradasUsuario } from '../../services/useEntradasUsuario'
import moment from 'moment'
interface Props {
	eventoId?: number | null | undefined
	tendido?: string | null | undefined
	reservado?: string | null | undefined
	tipoDocumento?: string | null | undefined
	numDocumento?: string | null | undefined
	nombres?: string | null | undefined
	apellidos?: string | null | undefined
	fecha?: string | null | undefined
	hora?: string | null | undefined
	asientoId: string
	slug: number
}

const FormUpdateAsiento = ({
	eventoId,
	tendido,
	reservado,
	tipoDocumento,
	numDocumento,
	nombres,
	apellidos,
	asientoId,
	slug,
	fecha,
	hora
}: Props) => {
	const [mensaje, setMensaje] = useState('')
	const [error, serError] = useState(false)
	const { updateAsignacionEntrada, loadingUpdate } = useEntradasUsuario(slug)

	const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			tipoDocumento: tipoDocumento ?? 'DNI',
			documento: numDocumento ?? '',
			nombres: nombres ?? '',
			apellidos: apellidos ?? ''
		},
		validationSchema: Yup.object({
			documento: Yup.string()
				.required(`El número es requerido`)
				.matches(/^[0-9]+$/, 'Debe ser solo números'),
			nombres: Yup.string().required(`El nombre es requerido`),
			apellidos: Yup.string().required(`El apellido es requerido`)
		}),
		onSubmit: () => {
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
		}
	})

	const isDisabled =
		(numDocumento === values.documento && nombres === values.nombres && apellidos === values.apellidos) ||
		loadingUpdate

	return (
		<article key={eventoId} className='max-w-[280px] p-5 bg-white rounded-xl shadow-lg'>
			<h2 className='text-xl font-bold leading-6'>
				FERIA LA ESPERANZA <br />
				{tendido} <br />
				{reservado}
			</h2>

			<div className='flex justify-between py-3'>
				<div className='flex items-center gap-x-1'>
					<IconCalendar width={12} height={12} />
					<p className='text-xs mt-0.5'>{moment(fecha).format('LL')}</p>
				</div>
				<div className='flex items-center gap-x-1'>
					<IconHour width={12} height={12} />
					<p className='text-xs mt-0.5'> {moment(fecha + ' ' + hora).format('hh:mm A')}</p>
				</div>
			</div>
			<form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
				<select
					name='tipoDocumento'
					className='h-10 px-3 border rounded-sm border-gray-40'
					value={values.tipoDocumento}
					onChange={handleChange}
					onBlur={handleBlur}>
					<option className='' value='DNI'>
						DNI
					</option>
					<option className='' value='CE'>
						CE
					</option>
				</select>

				<div className='relative'>
					<input
						name='documento'
						type='text'
						className='w-full h-10 px-3 text-black border border-gray-400 rounded-sm focus:outline-none'
						placeholder='Nro de Documento'
						value={values.documento}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.documento && touched.documento ? (
						<p className='absolute px-1 text-sm leading-5 text-red-500 -bottom-5 '>{errors.documento}</p>
					) : null}
				</div>
				<div className='relative'>
					<input
						name='nombres'
						type='text'
						className='w-full h-10 px-3 text-black border border-gray-400 rounded-sm focus:outline-none'
						placeholder='Nombres'
						value={values.nombres}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.nombres && touched.nombres ? (
						<p className='absolute px-1 text-sm leading-5 text-red-500 -bottom-5 '>{errors.nombres}</p>
					) : null}
				</div>
				<div className='relative'>
					<input
						name='apellidos'
						type='text'
						className='w-full h-10 px-3 text-black border border-gray-400 rounded-sm focus:outline-none'
						placeholder='Apellidos'
						value={values.apellidos}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.apellidos && touched.apellidos ? (
						<p className='absolute px-1 text-sm leading-5 text-red-500 -bottom-5 '>{errors.apellidos}</p>
					) : null}
				</div>

				<div className='relative flex justify-center'>
					<p className={`absolute -top-5 ${error ? 'text-red-500' : 'text-green-500'}`}>{mensaje}</p>

					<button
						disabled={isDisabled}
						type='submit'
						className={`bg-butacas w-full text-white pb-2 pt-1 mt-5   px-4  transition-all duration-500 rounded-md ${
							isDisabled ? 'opacity-50' : 'opacity-100 hover:bg-tertiary'
						}`}>
						Registrar
					</button>
				</div>
			</form>

			<div className='text-xs '>
				<p className='mt-4 text-justify'>
					Llena los datos del asistente al evento para validar su entrada en la puerta. Tienes hasta una hora
					antes del inicio del evento para hacer el registro o transferir el asiento a otra persona.
				</p>
			</div>
		</article>
	)
}

export default FormUpdateAsiento
