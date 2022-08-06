import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGesture } from 'react-use-gesture'
import Asientos, { IColums } from '../components/asientos'
import { genNombreFilas } from '../data/asientos'
import { useAsientosAbonado } from '../services/useAsientosAbonado'
import { useButacas } from '../services/useButacas'

export default function Prueba() {
	let [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 })

	return (
		<>
			<p className='mt-2 text-lg text-center'>Image Cropper</p>

			<div className='p-8 mt-2'>
				<ImageCropper src='/thumb.jpg' crop={crop} onCropChange={setCrop} />

				<div className='mt-6'>
					<p>Crop X: {Math.round(crop.x)}</p>
					<p>Crop Y: {Math.round(crop.y)}</p>
					<p>Crop Scale: {Math.round(crop.scale * 100) / 100}</p>
				</div>
			</div>
		</>
	)
}

function ImageCropper({ src, crop, onCropChange }: any) {
	let x = useMotionValue(crop.x)
	let y = useMotionValue(crop.y)
	let scale = useMotionValue(crop.scale)
	let [isDragging, setIsDragging] = useState(false)
	let [isPinching, setIsPinching] = useState(false)

	let imageRef = useRef<any>()
	let imageContainerRef = useRef<any>()
	useGesture(
		{
			onDrag: ({ dragging, movement: [dx, dy] }) => {
				setIsDragging(dragging)
				x.stop()
				y.stop()

				let imageBounds = imageRef.current.getBoundingClientRect()
				let containerBounds = imageContainerRef.current.getBoundingClientRect()
				let originalWidth = imageRef.current.clientWidth
				let widthOverhang = (imageBounds.width - originalWidth) / 2
				let originalHeight = imageRef.current.clientHeight
				let heightOverhang = (imageBounds.height - originalHeight) / 2
				let maxX = widthOverhang
				let minX = -(imageBounds.width - containerBounds.width) + widthOverhang
				let maxY = heightOverhang
				let minY = -(imageBounds.height - containerBounds.height) + heightOverhang

				x.set(dampen(dx, [minX, maxX]))
				y.set(dampen(dy, [minY, maxY]))
			},

			onPinch: ({ pinching, event, memo, origin: [pinchOriginX, pinchOriginY], offset: [d] }) => {
				event.preventDefault()
				setIsPinching(pinching)
				x.stop()
				y.stop()

				memo ??= {
					bounds: imageRef.current.getBoundingClientRect(),
					crop: { x: x.get(), y: y.get(), scale: scale.get() }
				}

				let transformOriginX = memo.bounds.x + memo.bounds.width / 2
				let transformOriginY = memo.bounds.y + memo.bounds.height / 2

				let displacementX = (transformOriginX - pinchOriginX) / memo.crop.scale
				let displacementY = (transformOriginY - pinchOriginY) / memo.crop.scale

				let initialOffsetDistance = (memo.crop.scale - 1) * 200
				let movementDistance = d - initialOffsetDistance

				scale.set(1 + d / 200)
				x.set(memo.crop.x + (displacementX * movementDistance) / 200)
				y.set(memo.crop.y + (displacementY * movementDistance) / 200)

				return memo
			},

			onDragEnd: maybeAdjustImage,
			onPinchEnd: maybeAdjustImage
		},
		{
			drag: {
				initial: () => [x.get(), y.get()]
			},
			pinch: {
				distanceBounds: { min: 0 }
			},
			domTarget: imageRef,
			eventOptions: { passive: false }
		}
	)

	function maybeAdjustImage() {
		let newCrop = { x: x.get(), y: y.get(), scale: scale.get() }
		let imageBounds = imageRef.current.getBoundingClientRect()
		let containerBounds = imageContainerRef.current.getBoundingClientRect()
		let originalWidth = imageRef.current.clientWidth
		let widthOverhang = (imageBounds.width - originalWidth) / 2
		let originalHeight = imageRef.current.clientHeight
		let heightOverhang = (imageBounds.height - originalHeight) / 2

		if (imageBounds.left > containerBounds.left) {
			newCrop.x = widthOverhang
		} else if (imageBounds.right < containerBounds.right) {
			newCrop.x = -(imageBounds.width - containerBounds.width) + widthOverhang
		}

		if (imageBounds.top > containerBounds.top) {
			newCrop.y = heightOverhang
		} else if (imageBounds.bottom < containerBounds.bottom) {
			newCrop.y = -(imageBounds.height - containerBounds.height) + heightOverhang
		}

		animate(x, newCrop.x, {
			type: 'tween',
			duration: 0.4,
			ease: [0.25, 1, 0.5, 1]
		})
		animate(y, newCrop.y, {
			type: 'tween',
			duration: 0.4,
			ease: [0.25, 1, 0.5, 1]
		})
		onCropChange(newCrop)
	}

	const [seleccionados, setSeleccionados] = useState<IColums[]>([])

	const { butacas, loading, refetch } = useButacas('T1')

	const { asientos, refetch: refetchAsientos } = useAsientosAbonado({ feriaId: 1, tendido: 'T1' })
	console.log(butacas)

	const dataAsientos = useMemo(() => {
		if (butacas.length && !loading) {
			return butacas.map((item, i) => ({
				tendido: item?.tendido || '',
				butacaId: item?.butacaId || '',
				codigo: item?.codigo || '',
				cantidad: item?.cantidad || 0,
				precio: item?.precio || 0
			}))
		}
	}, [butacas, loading])

	return (
		<>
			<div className={`relative overflow-hidden  ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ring-white aspect-w-4 aspect-h-5`}>
				<div ref={imageContainerRef}>
					<motion.div
						ref={imageRef}
						style={{
							x: x,
							y: y,
							scale: scale,
							touchAction: 'none',
							userSelect: 'none',
							MozUserSelect: 'none',
							//@ts-ignore
							WebkitUserDrag: 'none'
						}}
						className='relative w-[2000px]  h-full max-w-none max-h-none '>
						<div className='flex-col flex w-full'>
							<div className=' h-60 bg-secondary flex gap-5 '>
								<div className='bg-red-500 w-40 h-40'>1</div>
								<div className='bg-red-500 w-40 h-40'>2</div>
								<div className='bg-red-500 w-40 h-40'>3</div>
								<div className='bg-red-500 w-40 h-40'>4</div>
								<div className='bg-red-500 w-40 h-40'>5</div>
								<div className='bg-red-500 w-40 h-40'>1</div>
								<div className='bg-red-500 w-40 h-40'>2</div>
								<div className='bg-red-500 w-40 h-40'>3</div>
								<div className='bg-red-500 w-40 h-40'>4</div>
								<div className='bg-red-500 w-40 h-40'>5</div>
							</div>

							<div className='w-full h-60 bg-secondary'></div>
						</div>
						{/* {dataAsientos?.length && (
							<Asientos
								{...{
									data: dataAsientos,
									desabilitados: asientos,
									seleccionados,
									setSeleccionados,
									nombreFilas: genNombreFilas('T1')
								}}
								tipo='abono'
							/>
						)} */}
					</motion.div>
					<div
						className={`pointer-events-none absolute inset-0 transition duration-300 ${
							isDragging || isPinching ? 'opacity-100' : 'opacity-0'
						}`}>
						<div className='absolute inset-0 flex flex-col'>
							<div className='self-stretch flex-1 border-b border-gray-50 '></div>
							<div className='self-stretch flex-1 border-b border-gray-50 '></div>
							<div className='self-stretch flex-1'></div>
						</div>
						<div className='absolute inset-0 flex'>
							<div className='self-stretch flex-1 border-r border-gray-50 '></div>
							<div className='self-stretch flex-1 border-r border-gray-50 '></div>
							<div className='self-stretch flex-1'></div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

function dampen(val: any, [min, max]: any) {
	if (val > max) {
		let extra = val - max
		let dampenedExtra = extra > 0 ? Math.sqrt(extra) : -Math.sqrt(-extra)
		return max + dampenedExtra * 2
	} else if (val < min) {
		let extra = val - min
		let dampenedExtra = extra > 0 ? Math.sqrt(extra) : -Math.sqrt(-extra)
		return min + dampenedExtra * 2
	} else {
		return val
	}
}
