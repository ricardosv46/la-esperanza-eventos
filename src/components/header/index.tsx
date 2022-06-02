import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import IconCart from '../../../public/icons/IconCart'
import IconUser from '../../../public/icons/IconUser'
import { useRouter } from 'next/router'
import BtnBurger from '../btnBurger'
import ModalUser from '../modal/modalUser'
import SidebarCart from '../sidebarCart'

const links = [
  { title: 'Inicio', path: '/' },
  { title: 'La Plaza', path: '/plaza' },
  { title: 'Eventos', path: '/eventos' },
  { title: 'Noticias', path: '/noticias' },
  { title: 'Contacto', path: '#contacto' }
]

const Header = () => {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [navbar, setNavbar] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isOpenCart, setIsOpenCart] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', changeBackground)
    return () => {
      window.removeEventListener('scroll', changeBackground)
    }
  }, [])

  return (
    <header
      className={`h-[70px] md:h-[100px] w-full fixed  top-0  z-10 flex-col justify-center items-center transition-colors duration-500 ease-in-out $ ${
        pathname === '/' ||
        pathname === '/plaza' ||
        pathname === `/eventos/[slug]`
          ? navbar
            ? 'bg-primary'
            : 'bg-transparent'
          : 'bg-primary  sticky'
      }`}
    >
      {/* menu desktop */}
      <nav className='hidden mx-auto my-0 w-[90%] xl:w-[1200px] flex-col h-full  md:flex items-center justify-center'>
        <div className='w-full   text-white text-lg  flex items-center justify-between'>
          <Link href='/' passHref>
            <div className='flex'>
              <Image
                objectFit='scale-down'
                className='cursor-pointer'
                src='/imgs/logos/logo.png'
                width={200}
                height={80}
                alt='logo'
              />
            </div>
          </Link>
          <div className='flex items-center gap-16'>
            <ul className='flex gap-16 relative font-semibold'>
              {links.map(({ title, path }) => (
                <Link href={path} passHref key={title}>
                  <li
                    className={`cursor-pointer  py-2 border-b-2 border-transparent hover:border-yellow-500 ease-out duration-300 transition-all hover:text-yellow-500 ${
                      pathname === path ? 'text-secondary border-secondary' : ''
                    }`}
                  >
                    {title}
                  </li>
                </Link>
              ))}
            </ul>
            <div className='flex gap-10'>
              <button aria-label='Carrito' onClick={() => setIsOpenCart(true)}>
                <IconCart height={25} width={25} />
              </button>
              <button aria-label='Login' onClick={() => setShowModal(true)}>
                <IconUser height={25} width={25} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* menu mobile */}
      <nav
        className={`md:hidden mx-auto my-0 w-[90%] xl:w-[1280px] flex justify-between items-center h-full `}
      >
        <div className='flex w-full justify-between items-center  '>
          <Link href='/' passHref>
            <div className='flex'>
              <Image
                className='cursor-pointer'
                src='/imgs/logos/logo.png'
                width={120}
                height={50}
                alt='logo'
              />
            </div>
          </Link>
          <div className='flex gap-5'>
            <div className='flex gap-5'>
              <button aria-label='Carrito' onClick={() => setIsOpenCart(true)}>
                <IconCart fill='#fff' height={25} width={25} />
              </button>
              <button aria-label='Login' onClick={() => setShowModal(true)}>
                <IconUser fill='#fff' height={25} width={25} />
              </button>
            </div>
            <BtnBurger isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          <ul
            className={`text-white fixed top-16  w-full p-5 transition-all -right-full duration-500 backdrop-blur-lg ${
              pathname === '/' ||
              pathname === '/plaza' ||
              pathname === `/eventos/[slug]`
                ? navbar
                  ? 'bg-primary'
                  : 'bg-transparent'
                : 'bg-primary'
            } ${isOpen && 'transition-all -right-0 duration-500'}`}
          >
            {links.map(({ title, path }) => (
              <Link href={path} passHref key={title}>
                <li
                  className={`text-center cursor-pointer font-semibold  py-2 border-b-2 border-transparent  ease-out duration-300 transition-all hover:text-yellow-500 ${
                    pathname === path ? 'text-secondary ' : ''
                  }`}
                >
                  {title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
      <ModalUser isOpen={showModal} onClose={() => setShowModal(false)} />
      <SidebarCart isOpen={isOpenCart} onClose={() => setIsOpenCart(false)} />
    </header>
  )
}

export default Header
