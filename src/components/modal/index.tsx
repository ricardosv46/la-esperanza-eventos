import React from 'react'
import { motion } from 'framer-motion'
interface Props {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

const fade = {
  open: { opacity: 1, pointerEvents: 'unset' },
  closed: { opacity: 0, pointerEvents: 'none' }
} as const

const variants = {
  open: {
    scale: 1,
    opacity: 1,
    transition: { ease: 'easeInOut' }
  },
  closed: {
    scale: 0.9,
    opacity: 0,
    transition: { ease: 'easeOut' }
  }
}

const Modal = ({ children, isOpen = false, onClose, className }: Props) => {
  return (
    <motion.div
      variants={fade}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={isOpen ? 'open' : 'closed'}
      className='fixed h-full top-0 w-full flex justify-center items-center bg-black bg-opacity-50 z-50'
    >
      <motion.div
        variants={variants}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isOpen ? 'open' : 'closed'}
        onClick={(e) => e.stopPropagation()}
        className={`${className} bg-primarydark`}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
export default Modal
