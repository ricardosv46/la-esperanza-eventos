import Image from 'next/image'
import React, {
  LegacyRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Modal from '.'
import IconDate from '../../../public/icons/IconDate'
import IconSearchMinus from '../../../public/icons/IconSearchMinus'
import IconSearchPlus from '../../../public/icons/IconSearchPlus'
interface Props {
  onClose: () => void
  isOpen: boolean
  onClick: () => void
}

const ModalCompra = ({ isOpen, onClose, onClick }: Props) => {
  const [ids, setIds] = useState<string[]>([])
  const ref = useRef<HTMLButtonElement>(null)
  console.log(ids)

  const data = [
    { fila: 'A', columnas: 62 },
    { fila: 'B', columnas: 60 },
    { fila: 'C', columnas: 58 },
    { fila: 'D', columnas: 50 },
    { fila: 'E', columnas: 45 }
  ]

  const disabilitados = ['A13', 'B45', 'C,40']

  const filas = useMemo(() => {
    let tfilas: any = {}

    for (let i = 0; i < data.length; i++) {
      tfilas[data[i].fila] = new Array(data[i].columnas)
        .fill(null)
        .map((_, i) => i + 1)
    }
    return tfilas
  }, [])

  const selectId = (id: string) => {
    if (ids.includes(id)) {
      // const newids = ids.filter((item) => item !== id)
      // setIds(newids)
      setIds([...ids])
    } else {
      setIds([...ids, id])
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      for (let i = 0; i < ids.length; i++) {
        if (ids.includes(ids[i])) {
          let intro = window.document.getElementById(ids[i])!
          intro.style.backgroundColor = '#A02E2B'
          intro.style.color = '#FFFFFF'
        } else {
          let intro = window.document.getElementById(ids[i])!
          intro.style.backgroundColor = '#EAB308'
          intro.style.color = '#000000'
        }
      }
    }
  }, [ids])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let elmo1 = window.document.getElementById('A45')!
      elmo1.style.backgroundColor = '#505050'
      elmo1.style.color = '#FFFFFF'

      let elmo2 = window.document.getElementById('B50')!
      elmo2.style.backgroundColor = '#505050'
      elmo2.style.color = '#FFFFFF'

      let elmo3 = window.document.getElementById('D4')!
      elmo3.style.backgroundColor = '#505050'
      elmo3.style.color = '#FFFFFF'

      let elmo4 = window.document.getElementById('C45')!
      elmo4.style.backgroundColor = '#505050'
      elmo4.style.color = '#FFFFFF'
    }
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='h-full md:h-auto w-full md:w-[1000px] overflow-y-scroll no-scrollbar '
    >
      <section className='bg-white  rounded-lg pt-5 relative overflow-hidden'>
        <button
          onClick={onClose}
          className='absolute top-2 right-4 text-primary font-bold cursor-pointer'
        >
          X
        </button>
        <div className='flex justify-center mb-5'>
          <Image
            objectFit='scale-down'
            className='cursor-pointer filter-logo'
            src='/imgs/logos/logo.png'
            width={200}
            height={80}
            alt='logo'
          />
        </div>
        <p className='text-center text-3xl text-primary font-bold'>
          SELECCIONA TUS ASIENTOS
        </p>
        <div className='flex flex-col justify-center border-b-2 border-t-2 border-primary py-5 mt-5 mx-5'>
          <div className='flex justify-end items-center gap-3'>
            <IconDate fill='#4C000C' width={20} height={20} />{' '}
            <p className='text-primary font-bold'>Sábado 23 de julio</p>
          </div>

          <div className='flex gap-3 justify-start overflow-x-scroll no-scrollbar '>
            <TransformWrapper initialScale={1}>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div className='overflow-x-scroll no-scrollbar '>
                  <div className=' overflow-x-hidden '>
                    <TransformComponent
                      contentStyle={{
                        // backgroundColor: '#000',
                        padding: '40px 20px'
                      }}
                    >
                      <div className='flex flex-col gap-3 justify-center items-center '>
                        {Object.keys(filas).map((fila) => (
                          <div
                            key={fila}
                            className='flex justify-center items-center gap-1'
                          >
                            {filas[`${fila.toString()}`].map(
                              (columna: any, index: any) => {
                                if (index < columna) {
                                  return (
                                    <button
                                      ref={ref}
                                      id={`${fila}${columna.toString()}`}
                                      key={`${fila}${columna.toString()}`}
                                      onClick={() =>
                                        selectId(`${fila}${columna.toString()}`)
                                      }
                                      className='rounded-full h-2.5 w-2.5 bg-yellow-500 flex justify-center items-center text-[3px] font-mono text-center '
                                    >
                                      {fila}
                                      {columna}
                                    </button>
                                  )
                                } else return null
                              }
                            )}
                          </div>
                        ))}
                      </div>
                    </TransformComponent>
                  </div>
                  <div className='flex justify-end gap-3 '>
                    <button onClick={() => zoomIn()}>
                      <IconSearchPlus
                        fill='#4C000C'
                        width={20}
                        height={20}
                      ></IconSearchPlus>
                    </button>
                    <button onClick={() => zoomOut()}>
                      <IconSearchMinus
                        fill='#4C000C'
                        width={20}
                        height={20}
                      ></IconSearchMinus>
                    </button>
                  </div>
                </div>
              )}
            </TransformWrapper>
          </div>
        </div>
        <div className='p-5 flex gap-3'>
          <div className='flex gap-2 items-center'>
            <span className='w-2.5 h-2.5 bg-primary rounded-full'></span>
            <p className='text-tertiary'>Seleccionados</p>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='w-2.5 h-2.5 bg-secondary rounded-full'></span>
            <p className='text-tertiary'>Libres</p>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='w-2.5 h-2.5 bg-text rounded-full'></span>
            <p className='text-tertiary'>No disponibles</p>
          </div>
        </div>
        <div className='py-10 px-5 bg-secondary flex justify-between'>
          <div className='flex gap-5 items-center'>
            <p className='text-primary font-bold'>Seleccionados:</p>
            <div className='flex flex-wrap w-60 gap-2 leading-none'>
              {ids.map((item) => (
                <p key={item} className='text-primary font-bold'>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className='flex items-end'>
            <button className='bg-tertiary px-5 py-2 text-white rounded-lg mt-10 lg:mt-0'>
              COMPRAR: S/.288.00
            </button>
          </div>
        </div>
        {/* <p className='text-4xl text-primary font-bold text-center'>
          SELECCIONA TUS ASIENTOS
        </p>
        <article className='flex flex-col md:flex-row border-t mt-5'>
          <div className='w-full flex flex-col items-center md:w-8/12 p-3'>
            <p className='text-2xl text-tertiary font-bold '>
              Oscar Quinteros 1 Mayo
            </p>
            <section className='flex flex-col  md:flex-row mt-10'>
              <article className='w-full lg:w-8/12 flex flex-col items-center'>
                <div className='-mb-12'>
                  <Image
                    src={`/imgs/compra/coliseo1.png`}
                    alt='Picture of the author'
                    width={342}
                    height={120}
                    objectFit='scale-down'
                  />
                </div>
                <div className='-mb-8'>
                  <Image
                    src={`/imgs/compra/coliseo2.png`}
                    alt='Picture of the author'
                    width={342}
                    height={93}
                    objectFit='scale-down'
                  />
                </div>
                <div className='-mb-2'>
                  <Image
                    src={`/imgs/compra/coliseo3.png`}
                    alt='Picture of the author'
                    width={342}
                    height={72}
                    objectFit='scale-down'
                  />
                </div>
                <div className='-mb-5'>
                  <Image
                    src={`/imgs/compra/coliseo4.png`}
                    alt='Picture of the author'
                    width={342}
                    height={55}
                    objectFit='scale-down'
                  />
                </div>
              </article>
              <article className='w-full md:w-4/12 py-3 flex-col flex justify-between '>
                <p className='text-xs text-text p-5 lg:p-0'>
                  Lorem fistrum por la gloria de mi madre esse jarl aliqua
                  llevame al sircoo. De la pradera ullamco qué dise usteer está
                  la cosa muy malar.
                </p>
                <div className='flex justify-center items-center '>
                  <Image
                    src={`/imgs/compra/coliseo.jpg`}
                    alt='Picture of the author'
                    width={130}
                    height={130}
                    objectFit='scale-down'
                  />
                </div>
              </article>
            </section>
          </div>
          <div className='w-full md:w-4/12 p-3 flex flex-col justify-between border-l'>
            <div>
              <p className='text-3xl text-primary font-bold mb-5'>
                Asientos Tendido{' '}
              </p>
              <p className='text-md text-primary font-semibold'>
                Barrera: 46 asientos
              </p>
              <p className='text-md text-primary font-semibold'>
                Contra brarrea: 48 aientos
              </p>
              <p className='text-md text-primary font-semibold'>
                Fila 3: 53 asientos
              </p>
            </div>
            <button
              onClick={onClick}
              className='bg-tertiary px-5 py-2 text-white rounded-lg mt-10 lg:mt-0'
            >
              PAGAR AHORA: S/.288.00
            </button>
          </div>
        </article> */}
      </section>
    </Modal>
  )
}

export default ModalCompra
