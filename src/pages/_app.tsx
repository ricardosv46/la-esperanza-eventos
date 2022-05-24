import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Header from '../components/header'

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])
  if (!showChild) {
    return null
  }
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
