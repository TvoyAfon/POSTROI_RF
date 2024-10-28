
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import circle_img from '../../../../../../assets/images/other/add-circle.svg'
import { portfolioSevice } from '../../../../../../services/user/userPortfolio.service'
import { setTriggerForAlbum } from '../../../../../../store/slices/other/triggerFetch'
import { RootState } from '../../../../../../store/store'
import styles from './PortfolioPhotoLoader.module.scss'

const PortfolioPhotoLoader: React.FC<{ albumId: number}> = ({ albumId }) => {
	const [photo, setPhoto] = useState<File>()
	const { user } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()

	const handleClick = (event: React.MouseEvent) => {
		event.preventDefault()
		document.getElementById('file-upload')?.click()
	}

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files[0]) {
			const selectedPhoto = files[0]
			const fileType = selectedPhoto.type

			// Check if the file type is an SVG
			if (fileType.startsWith('image') && fileType !== 'image/svg+xml') {
				setPhoto(selectedPhoto)
			} else {
				alert('SVG файлы не позволительны. Загрузите в формате (PNG, JPEG).')
				setPhoto(undefined) // Clear the photo state
				e.target.value = '' // Reset the input value
			}
		}
	}

	useEffect(() => {
		const addPhotoInAlbum = async () => {
			try {
				if (user?.id && photo) { // Check if there is a user and photo
					const formData = new FormData()
					formData.append('photo', photo) // Add the file to FormData
					await portfolioSevice.addPhoto(
						user.id,
						albumId,
						formData
					)
					dispatch(setTriggerForAlbum())
				}
			} catch (error) {
				console.log('Failed to add photo', error)
			}
		}
		if (photo) {
			addPhotoInAlbum()
		}
	}, [photo, albumId, user?.id])

	return (
		<>
			<label onClick={handleClick} htmlFor='file-upload' className={styles['portfolioPhotoLoader']}>
				<img src={circle_img} alt="loadPhoto" />
			</label>
			<input onChange={handlePhotoChange} className={styles['file-input']} id="file-upload" type="file" />
		</>
	)
}

export default PortfolioPhotoLoader