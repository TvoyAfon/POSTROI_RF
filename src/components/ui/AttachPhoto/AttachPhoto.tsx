import React from 'react'
import delete_img from '../../../assets/images/other/delete_icon.svg'
import styles from './AttachPhoto.module.scss'
import AttachPhotoButton from './AttachPhotoButton'

interface IAttachPhoto {
	handleChangePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void,
	files?: File[] | null,
	handleDeletePhoto: (fileToDelete: File) => void
}
const AttachPhoto: React.FC<IAttachPhoto> = ({ handleChangePhoto, files, handleDeletePhoto }) => {

	return (
		<div>
			<AttachPhotoButton handleChangePhoto={handleChangePhoto} />
			<section className={styles['attachPhoto_section']}>
				{files?.map(file => (
					<div style={{ position: 'relative' }}>
						<img style={{ width: 120, height: 120 }} src={URL.createObjectURL(file)} alt={file.name} />
						<img onClick={() => handleDeletePhoto(file)} style={{ position: 'absolute', cursor: 'pointer' }} src={delete_img} alt="delete" />
					</div>
				))}
			</section>
		</div>
	)
}

export default AttachPhoto
