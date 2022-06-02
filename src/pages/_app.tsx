import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import CarritoState from '../context/cart/CarritoState'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CarritoState>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </CarritoState>
  )
}

export default MyApp
