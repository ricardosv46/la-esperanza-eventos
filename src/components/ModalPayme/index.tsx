import * as ReactDOM from 'react-dom'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import Modal from '../modal'
import { PaymePayload } from '../../data/paydata'
import Image from 'next/image'
import IconPayme from '../../../public/icons/IconPayme'

interface Props {
  isOpen: boolean
  payload: PaymePayload
  onClose: () => void
  onChange: (data: any) => void
}

const PAYME_URL = 'https://alignet-flex-demo.s3.amazonaws.com'

const ModalPayme = ({ isOpen, onClose, onChange, payload }: Props) => {
  const [error, setError] = useState(false)
  const [scriptReady, setScriptReady] = useState(false)

  const handleRequest = useCallback(
    (data) => {
      if (!data?.id) return setError(true)

      onChange(data)
      onClose()
    },
    [onChange]
  )

  // Load css
  useEffect(() => {
    let linkcss: HTMLLinkElement

    if (typeof window !== 'undefined') {
      linkcss = document.createElement('link')
      linkcss.type = 'text/css'
      linkcss.rel = 'stylesheet'
      linkcss.href = `${PAYME_URL}/css/flex-capture.css`

      document.head.append(linkcss)
    }

    return () => {
      document.head.removeChild(linkcss)
    }
  }, [])

  // Load js
  useEffect(() => {
    let scriptjs: HTMLScriptElement

    if (typeof window !== 'undefined') {
      scriptjs = document.createElement('script')
      scriptjs.type = 'text/javascript'
      scriptjs.onload = () => setScriptReady(true)
      scriptjs.src = `${PAYME_URL}/flex-capture.min.js`

      document.head.append(scriptjs)
    }

    return () => {
      document.head.removeChild(scriptjs)
    }
  }, [])

  useEffect(() => {
    const paymeForm = document.querySelector('#payme')

    if (isOpen && scriptReady) {
      // @ts-ignore
      const capture = new FlexCapture({
        payload,
        additionalFields: [],
        // DEV 
        // key: 'FsVVX37w7ZSK1HNQ8NXxDhFEFLXjREorode1sokWZzz2ZahPfG1F35DpOd1miSuh'
        // PRD
        key: 'g51BswhZXrQzyPH2EMl1KmDrBK0li7bxEhpB0YLUGNGdlJbIWkGj3fiLqIeFVUe2'
      })

      capture.init(paymeForm, handleRequest)
    }
  }, [isOpen, handleRequest, payload, scriptReady])

  return (
    <Fragment>
      {scriptReady &&
        ReactDOM.createPortal(
          <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-white p-3 rounded">
              <div className="grid place-items-center mb-5">
                <Image
                  alt="logo"
                  width={180}
                  height={60}
                  className="filter-logo"
                  src="/imgs/logos/logo.png"
                />
              </div>
              <div id="payme">
                {!error && <p>Ha ocurrido un error intente nuevamente</p>}
              </div>
              <div className="grid place-items-center my-5">
                <IconPayme width={160} height={40} />
              </div>
            </div>
          </Modal>,
          document.getElementById('portal') as Element
        )}
    </Fragment>
  )
}

export default ModalPayme
