import React from 'react'

import delete_icon from '../../../../assets/images/other/delete_icon.svg'
import generic from '../../../../assets/images/other/Property 1=Generic.svg'
import pdf from '../../../../assets/images/other/Property 1=PDF.svg'
import txt from '../../../../assets/images/other/Property 1=TXT.svg'
import word from '../../../../assets/images/other/Property 1=Word.svg'
import { addFileToCard, deleteFileFromCard, ICard } from '../../../../store/slices/Signs/dataSigns/DataSignsSlice'

import { useDispatch } from 'react-redux'
import PhotoLoader from '../../../ui/PhotoLoader/PhotoLoader'
import styles from '../../Signs.module.scss'


const SignsCardDetailFiles: React.FC<{ card: ICard, isEdit?: boolean }> = ({ card, isEdit = false }) => {
	const dispatch = useDispatch()

	const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0]
			dispatch(addFileToCard({
				cardId: card?.id,
				file
			}))
		}
	}
	const handleDeleteFile = (file: File) => {
		dispatch(deleteFileFromCard({
			cardId: card?.id,
			fileAction: file
		}))
	}

	return (
		<div style={{ position: 'relative' }} className='flex-column gap-medium'>
			{isEdit && <PhotoLoader handleAddFiles={handleAddFiles} />}
			{card?.data ? card.data.filesSigns.length > 0 && (  // Изменено на files вместо card.data.filesSigns
				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{card?.data.filesSigns.map(file => {
						if (file instanceof File) {
							const isImage = file.type.startsWith('image/')

							if (isImage) {
								return (
									<div style={{ position: 'relative' }} key={file.name}>
										{isEdit && <img onClick={() => handleDeleteFile(file)} style={{ position: 'absolute', right: 0, cursor: 'pointer' }} src={delete_icon} alt="delete_icon" />}
										<img
											style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 16, border: '1px solid rgba(0,0,0,0.15)' }}
											src={URL.createObjectURL(file)}
											alt={file.name}
										/>
									</div>
								)
							} else if (file.type === 'application/pdf') {
								return (
									<div style={{ position: 'relative' }} key={file.name}>
										{isEdit && <img onClick={() => handleDeleteFile(file)} style={{ position: 'absolute', right: 0, cursor: 'pointer' }} src={delete_icon} alt="delete_icon" />}
										<div className={styles['files_container']}>
											<span style={{ fontSize: 10 }}>{file.name}</span>
											<img src={pdf} alt="PDF" style={{ width: 40, height: 40 }} />
										</div>
									</div>
								)
							} else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
								return (
									<div style={{ position: 'relative' }} key={file.name}>
										{isEdit && <img onClick={() => handleDeleteFile(file)} style={{ position: 'absolute', right: 0, cursor: 'pointer' }} src={delete_icon} alt="delete_icon" />}
										<div className={styles['files_container']}>
											<span style={{ fontSize: 10 }}>{file.name}</span>
											<img src={word} alt="Word" style={{ width: 40, height: 40 }} />
										</div>
									</div>
								)
							} else if (file.type === 'text/plain') {
								return (
									<div style={{ position: 'relative' }} key={file.name}>
										{isEdit && <img onClick={() => handleDeleteFile(file)} style={{ position: 'absolute', right: 0, cursor: 'pointer' }} src={delete_icon} alt="delete_icon" />}
										<div className={styles['files_container']}>
											<span style={{ fontSize: 10 }}>{file.name}</span>
											<img src={txt} alt="TXT" style={{ width: 40, height: 40 }} />
										</div>
									</div>
								)
							} else {
								return (
									<div style={{ position: 'relative' }} key={file.name}>
										{isEdit && <img onClick={() => handleDeleteFile(file)} style={{ position: 'absolute', right: 0, cursor: 'pointer' }} src={delete_icon} alt="delete_icon" />}
										<div className={styles['files_container']}>
											<span style={{ fontSize: 10 }}>{file.name}</span>
											<img src={generic} alt="Generic" style={{ width: 40, height: 40 }} />
										</div>
									</div>
								)
							}
						}
						return null // игнорируем, если не файл
					})}
				</div>
			) : null}
		</div>
	)
}

export default SignsCardDetailFiles
