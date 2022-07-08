import Image from 'next/image'
import React from 'react'
import Modal from '.'
import useForm from '../../hooks/useForm'
import InputFloat from '../inputs/InputFloat'
interface Props {
 onClose: () => void
 isOpen: boolean
}

const ModalMiCuenta = ({ isOpen, onClose }: Props) => {

 const { nombres, apellidos, numeroDocumento, email, telefono, onChange } = useForm({
  nombres: '',
  apellidos: '',
  numeroDocumento: '',
  email: '',
  telefono: ''
 })
 return (
  <Modal
   isOpen={isOpen}
   onClose={onClose}
   className='h-full md:h-auto w-full md:w-[920px] overflow-y-scroll no-scrollbar '
  >
   <section className='bg-white  rounded-lg py-10 relative px-10'>
    <button
     onClick={onClose}
     className='absolute top-2 right-4 text-primary font-bold cursor-pointer'
    >
     X
    </button>
    <p className='text-4xl text-primary font-bold text-center'>
     Editar Datos
    </p>
    <div className="grid grid-cols-2 gap-4 mt-10">
     <InputFloat
      type='nombres'
      label='Nombres'
      name='nombres'
      value={nombres}
      onChange={onChange}
     />

     <InputFloat
      type='apellidos'
      label='Apellidos'
      name='apellidos'
      value={apellidos}
      onChange={onChange}
     />

     <InputFloat
      type='numeroDocumento'
      label='Nro Doc'
      name='numeroDocumento'
      value={numeroDocumento}
      onChange={onChange}
     />

     <InputFloat
      type='email'
      label='Email'
      name='email'
      value={email}
      onChange={onChange}
     />

     <InputFloat
      type='telefono'
      label='Telefono'
      name='telefono'
      value={telefono}
      onChange={onChange}
     />
    </div>

    <div className='mt-7 flex justify-center'>
     <button className=' bg-primary text-white cursor-pointer px-10  py-3 rounded-lg'
      onClick={onClose}>
      Guardar
     </button>
    </div>
   </section>
  </Modal>
 )
}

export default ModalMiCuenta