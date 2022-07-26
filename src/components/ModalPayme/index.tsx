import * as ReactDOM from 'react-dom'
import { Fragment, useCallback, useEffect, useState } from 'react'

import Modal from '../modal'
import { PaymePayload } from '../../data/paydata'

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
    if (isOpen) {
      // @ts-ignore
      const capture = new FlexCapture({
        payload,
        additionalFields: [],
        key: 'FsVVX37w7ZSK1HNQ8NXxDhFEFLXjREorode1sokWZzz2ZahPfG1F35DpOd1miSuh'
        //"additionalFields": ["v_nombre", "v_apellido", "v_email", "v_doc_type", "v_dni"]
      })

      capture.init(document.querySelector('#payme'), handleRequest)
    }
  }, [isOpen, handleRequest, payload])

  return (
    <Fragment>
      {scriptReady &&
        ReactDOM.createPortal(
          <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-white p-3 rounded" id="payme">
              {!error && <p>Ha ocurrido un error intente nuevamente</p>}
            </div>
          </Modal>,
          document.getElementById('portal') as Element
        )}
    </Fragment>
  )
}

export default ModalPayme
