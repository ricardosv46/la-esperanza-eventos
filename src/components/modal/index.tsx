import React from 'react'
interface Props {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Modal = ({ children, isOpen = false, onClose }: Props) => {
  return (
    <div
      onClick={onClose}
      className={
        isOpen
          ? 'h-full w-full top-0 flex justify-center  items-center fixed bg-[rgba(0,0,0,0.5)]'
          : 'hidden'
      }
    >
      <div
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>
  )
}
export default Modal
