import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutsideClick } from '../../../hooks/useOutside'
import useStopScrolling from '../../../hooks/useStopScrolling'
import { userService } from '../../../services/user/user.service'
import { changeUser } from '../../../store/slices/AuthSlice/AuthSlice'
import { RootState } from '../../../store/store'
import ErrorSignature from '../../Auth/ui/ErrorSignature'
import AttachPhotoButton from '../AttachPhoto/AttachPhotoButton'
import AvatarPattern from '../AvatarPattern/AvatarPattern'
import Button from '../Button/Button'
import CloseButton from '../CloseButton/CloseButton'
import Loader from '../Loader/Loader'
import ModalContainer from '../Modal/ModalContainer'
import ImageCropper from './ImageCropper'

interface IAvatarLoader {
	onClose: () => void
	stateValue: boolean
	handleChangePhoto?: (e: React.ChangeEvent<HTMLInputElement>) => void
	avatar?: File | string
}

const AvatarLoader: React.FC<IAvatarLoader> = ({ onClose, stateValue, handleChangePhoto, avatar }) => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [openCrop, setOpenCrop] = useState(false)
	const [croppedImage, setCroppedImage] = useState<string | null>(null)
	const [imageUrl, setImageUrl] = useState<string | null>(null)

	const handleCropComplete = (croppedImageUrl: string | null) => {
		setCroppedImage(croppedImageUrl)
	}

	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, onClose)

	useEffect(() => {
		if (!avatar) return
		if (avatar instanceof File) {
			setImageUrl(URL.createObjectURL(avatar))
		} else {
			setImageUrl(avatar as string)
		}

		return () => {
			if (avatar instanceof File && imageUrl) {
				URL.revokeObjectURL(imageUrl)
			}
		}
	}, [avatar])

	const handleSubmit = async () => {
		try {
			setLoading(true)
			setError(false)
			const formData = new FormData()

			if (croppedImage) {
				const response = await fetch(croppedImage)
				const blob = await response.blob()
				formData.append('photo', blob, 'croppedImage.png')
			} else if (avatar instanceof File) {
				formData.append('photo', avatar)
			}

			if (user?.id) {
				const response = await userService.editAvatar(user.id, formData)
				const profile_photo = response.profile_photo
				dispatch(changeUser({ ...user, profile_photo }))
			}
			onClose()
		} catch (error) {
			setError(true)
			console.log('Не удалось изменить фото', error)
		} finally {
			setLoading(false)
		}
	}

	useStopScrolling(stateValue!)


	return (
		<>
			{openCrop && (
				<ImageCropper
					onClose={() => setOpenCrop(false)}
					imageUrl={user?.profile_photo as string || null}
					file={avatar as File}
					onCropComplete={handleCropComplete}
				/>
			)}
			{stateValue && (
				<ModalContainer
					style={{ position: 'fixed', top: '50%', left: '50%', width: 660, transform: 'translate(-50%, -50%)' }}
					isOnOverlay={true}
					zIndex={11}
				>
					<div className='flex-column'>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='textSizeL'>ФОТО</span>
							<CloseButton onClick={onClose} />
						</div>
						{user?.profile_photo || imageUrl ? (
							<div onClick={() => setOpenCrop(true)} style={{ display: 'flex', gap: 70, flexWrap: 'wrap' }}>
								<img
									style={{ width: 150, height: 150, borderRadius: '50%', cursor: 'pointer', objectFit: "cover" }}
									src={croppedImage || imageUrl || user?.profile_photo as string} // Ensure displaying the correct image URL
									alt='avatar'
								/>
							</div>
						) : (
							<AvatarPattern />
						)}
						<AttachPhotoButton handleChangePhoto={handleChangePhoto!} />
						<div className='flex-column gap-small'>
							<span style={{ fontWeight: 800 }}>Загрузить новую фотографию</span>
							<span>jpg, png, bmp, не более 6 МБ</span>
						</div>
						<Button onClick={handleSubmit}>{loading ? <Loader color='white' /> : 'Сохранить'}</Button>
						{error && <ErrorSignature>Не удалось изменить фото.</ErrorSignature>}
					</div>
				</ModalContainer>
			)}
		</>
	)
}

export default AvatarLoader