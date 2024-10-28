import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import settings from '../../../../assets/images/other/settings_forImg.svg'
import img from '../../../../assets/images/signs/obllojka.png'
import { useModal } from '../../../../hooks/useModal'
import { projectService } from '../../../../services/project/project.service'
import { setTriggerUpdatePhoto } from '../../../../store/slices/other/triggerFetch'
import ImageProjectPopup from './ImageProjectPopup'


const ImageProject: React.FC<{ project_id: number, prewiev_photo?: string }> = ({ project_id, prewiev_photo }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const dispatch = useDispatch()
	const { handleClose, handleOpen, isOpen } = useModal()

	const handleLoadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const photoTarget = e.target.files[0]
			// Проверяем, что файл является изображением и не является SVG
			if (photoTarget.type.startsWith('image/') && photoTarget.type !== 'image/svg+xml') {
				try {
					const formData = new FormData()
					formData.append('preview_image', photoTarget)
					await projectService.updatePhoto(project_id, formData)
					dispatch(setTriggerUpdatePhoto())
					handleClose()
				} catch (error) {
					return alert('Не удалось загрузить фото')
				}
			} else {
				alert('Загрузите обложку в формате JPG, PNG')
			}
		}
	}

	const handleDeletePhoto = async () => {
		try {
			await projectService.deletePhoto(project_id)
			dispatch(setTriggerUpdatePhoto())
			handleClose()
		} catch (error) {
			alert('Не удалось удалить фото')
		}
	}

	const handleAddPhoto = () => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}
	return (
		<div style={{ position: 'relative' }}>
			<img style={{ width: 158, height: 158 }}
				src={prewiev_photo ? prewiev_photo : img} alt="" />
			<div style={{ position: 'absolute', left: 10, top: 85, display: 'flex', flexDirection: 'column', gap: 4 }}>
				<div
					style={{ background: '#383940', width: 26, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: -70, left: 0 }}>
					<img
						onClick={handleOpen}
						style={{ cursor: 'pointer', width: 20, height: 20 }}
						src={settings} alt="st" />
				</div>
				{isOpen &&
					<ImageProjectPopup
						handleClose={handleClose}
						handleDeletePhoto={handleDeletePhoto}
						handleAddPhoto={handleAddPhoto}
					/>}
				<input
					style={{ display: 'none' }}
					onChange={handleLoadPhoto}
					ref={inputRef}
					type='file' />
			</div>
		</div>
	)
}

export default ImageProject
