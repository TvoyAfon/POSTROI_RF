
import { useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Button from '../Button/Button'
import CloseButton from '../CloseButton/CloseButton'
import ModalContainer from '../Modal/ModalContainer'
import styles from './AvatarLoader.module.scss'

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
	return centerCrop(
		makeAspectCrop(
			{ unit: '%', width: 90 },
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	)
}

interface ImageCropperProps {
	file: File | null
	imageUrl: string | null
	onCropComplete: (croppedImageUrl: string | null) => void
	onClose: () => void
}

export default function ImageCropper({ file, imageUrl, onCropComplete, onClose }: ImageCropperProps) {
	
	const [imgSrc, setImgSrc] = useState<string>('')
	const imgRef = useRef<HTMLImageElement>(null)
	const [crop, setCrop] = useState<Crop>({ unit: '%', width: 90, height: 90, x: 5, y: 5 }) // Более низкие значения чтобы центрировать
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
	const [croppedImage, setCroppedImage] = useState<string | null>(null)
	const aspect = 16 / 9 // Fixed aspect ratio
	console.log(imgSrc)
	useEffect(() => {
		if (file) {
			const reader = new FileReader()
			reader.onload = () => setImgSrc(reader.result as string)
			console.log(imgSrc)
			reader.readAsDataURL(file)
		} else if (imageUrl) {
			setImgSrc(imageUrl)
		}
	}, [file, imageUrl])

	// Пересчет обрезки после загрузки изображения
	useEffect(() => {
		if (imgSrc && imgRef.current) {
			const { width, height } = imgRef.current
			setCrop(centerAspectCrop(width, height, aspect)) // Установка обрезки с использованием изображение
		}
	}, [imgSrc, aspect])

	useEffect(() => {
		if (completedCrop?.width && completedCrop?.height && imgRef.current) {
			const canvas = document.createElement('canvas')
			const scaleX = imgRef.current.naturalWidth / imgRef.current.width
			const scaleY = imgRef.current.naturalHeight / imgRef.current.height

			canvas.width = completedCrop.width
			canvas.height = completedCrop.height

			const ctx = canvas.getContext('2d')
			if (ctx) {
				ctx.drawImage(
					imgRef.current,
					completedCrop.x * scaleX,
					completedCrop.y * scaleY,
					completedCrop.width * scaleX,
					completedCrop.height * scaleY,
					0,
					0,
					completedCrop.width,
					completedCrop.height
				)
				const croppedImageUrl = canvas.toDataURL('image/png')
				setCroppedImage(croppedImageUrl) // Save cropped image to state
			}
		}
	}, [completedCrop, imgRef])

	const handleSave = () => {
		if (croppedImage) {
			onCropComplete(croppedImage) // Call the prop function with the saved cropped image
			onClose()
		}
	}

	return (
		<ModalContainer style={{ position: 'fixed', width: 1200,height:830,backgroundColor:'#383940' }} zIndex={12}>
			<div style={{position:'relative'}}>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<CloseButton onClick={onClose} />
				</div>
				{!!imgSrc && (
					<ReactCrop
						crop={crop}
						onChange={(newCrop) => setCrop(newCrop)}
						onComplete={(c) => setCompletedCrop(c)}
						aspect={aspect}
					>
						<img
							ref={imgRef}
							alt="Crop me"
							src={imgSrc}
							className={styles['imgCropper']}
							crossOrigin='anonymous'
						/>
					</ReactCrop>
				)}
				<Button style={{ marginTop: 32 }} onClick={handleSave} disabled={!croppedImage}>
					Сохранить
				</Button>
			</div>
		</ModalContainer>
	)
}