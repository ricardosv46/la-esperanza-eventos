import * as ReactDOM from 'react-dom'
import { Fragment, useCallback, useEffect, useState } from 'react'

import Modal from '../modal'
import { payRequest } from '../../data/paydata'

interface Props {
  isOpen: boolean
  onClose: () => void
  onChange: (data: any) => void
}

const PAYME_URL = 'https://alignet-flex-demo.s3.amazonaws.com'

const ModalPayme = ({ isOpen, onClose, onChange }: Props) => {
  const [scriptReady, setScriptReady] = useState(false)

  const handleRequest = useCallback((data) => {
    onChange(data)
  }, [])

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
    if (typeof window !== 'undefined' && (window as any).FlexCapture) {
      // @ts-ignore
      const capture = new FlexCapture({
        additionalFields: [],
        payload: payRequest({ amount: '10' }),
        key: 'FsVVX37w7ZSK1HNQ8NXxDhFEFLXjREorode1sokWZzz2ZahPfG1F35DpOd1miSuh'
        //"additionalFields": ["v_nombre", "v_apellido", "v_email", "v_doc_type", "v_dni"]
      })

      capture.init(document.querySelector('#payme'), handleRequest)
    }
  }, [scriptReady, handleRequest])

  return (
    <Fragment>
      {scriptReady &&
        ReactDOM.createPortal(
          <Modal isOpen={!isOpen} onClose={onClose}>
            <div className="bg-white p-3 rounded" id="payme" />
          </Modal>,
          document.getElementById('portal') as Element
        )}
    </Fragment>
  )
}

export default ModalPayme
