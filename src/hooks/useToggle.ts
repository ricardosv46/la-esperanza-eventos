import { useState } from 'react'

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false)

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen((prev) => !prev)
  }
}

export default useToggle
