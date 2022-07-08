import React from 'react'
import IconCalendar from '../../../public/icons/IconCalendar'
import IconHour from '../../../public/icons/IconHour'
import Container from '../../components/container'

const DetalleEntrada = () => {
	return (
		<Container bgColor='bg-[#fff2e6]' className='px-5'>
			<div className="max-w-[1200px] py-10 mx-auto">
				<div className="">
					<h1 className='text-3xl font-bold'>Detalle de la compra</h1>
					<div className="grid grid-cols-3 mt-5">
						<article
							className='max-w-[280px] p-5 bg-white rounded-xl shadow-lg'
						>
							<h2 className='text-xl leading-6 font-bold'>FERIA LA ESPERANZA <br />Tendido 01 <br />Fila 01 - Asiento 14</h2>

							<div className="flex gap-x-5 py-3">
								<div className="flex items-center gap-x-3">
									<IconCalendar width={12} height={12} />
									<p className='text-xs mt-0.5'>junio 25, 2022</p>
								</div>
								<div className="flex items-center gap-x-3">
									<IconHour width={12} height={12} />
									<p className='text-xs mt-0.5'>		1:05 am</p>

								</div>
							</div>

							<div className="flex flex-col gap-y-2">

								<select className="rounded-sm h-10 px-3 border border-gray-400 " name="">
									<option className="" value="" disabled>Documento</option>
									<option className="" value="dni"  >DNI</option>
									<option className="" value="ce" >CE</option>
								</select>

								<input
									type='text'
									className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
									placeholder='Nro de Documento'
								/>
								<input
									type='text'
									className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
									placeholder='Nombres'
								/>

								<input
									type='text'
									className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
									placeholder='Apellidos'
								/>
							</div>

							<div className="flex justify-center">
								<button
									className='bg-[#a02e2b] w-full text-white pb-2 pt-1 mt-5  px-4 hover:opacity-75 transition-all duration-500 rounded-md'
								>
									Registrar
								</button>
							</div>

							<div className=" text-xs">
								<p className='text-justify mt-4'>Llena los datos del asistente al evento para validar su entrada en la puerta.
									Tienes hasta una hora antes del inicio del evento para hacer el registro o transferir
									el asiento a otra persona.</p>
							</div>
						</article>
						<article
							className='max-w-[280px] p-5 bg-white rounded-xl shadow-lg'
						>
							<h2 className='text-xl leading-6 font-bold'>FERIA LA ESPERANZA <br />Tendido 01 <br />Fila 01 - Asiento 14</h2>

							<div className="flex gap-x-5 py-3">
								<div className="flex items-center gap-x-3">
									<IconCalendar width={12} height={12} />
									<p className='text-xs mt-0.5'>junio 25, 2022</p>
								</div>
								<div className="flex items-center gap-x-3">
									<IconHour width={12} height={12} />
									<p className='text-xs mt-0.5'>		1:05 am</p>

								</div>
							</div>

							<div className="flex flex-col gap-y-2">

								<select className="rounded-sm h-10 px-3 border border-gray-400 " name="">
									<option className="" value="" disabled>Documento</option>
									<option className="" value="dni"  >DNI</option>
									<option className="" value="ce" >CE</option>
								</select>

								<input
									type='text'
									className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
									placeholder='Nro de Documento'
								/>
								<input
									type='text'
									className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
									placeholder='Nombres'
								/>

								<input
									type='text'
									className='rounded-sm w-full text-black focus:outline-none h-10 px-3 border border-gray-400'
									placeholder='Apellidos'
								/>
							</div>

							<div className="flex justify-center">
								<button
									className='bg-[#a02e2b] w-full text-white pb-2 pt-1 mt-5  px-4 hover:opacity-75 transition-all duration-500 rounded-md'
								>
									Registrar
								</button>
							</div>

							<div className=" text-xs">
								<p className='text-justify mt-4'>Llena los datos del asistente al evento para validar su entrada en la puerta.
									Tienes hasta una hora antes del inicio del evento para hacer el registro o transferir
									el asiento a otra persona.</p>
							</div>
						</article>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default DetalleEntrada