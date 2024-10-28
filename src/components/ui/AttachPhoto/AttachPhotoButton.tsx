import React from 'react'
import styles from './AttachPhoto.module.scss'

const AttachPhotoButton: React.FC<{ handleChangePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ handleChangePhoto }) => {
	return (
		<label className={styles.attachPhoto} htmlFor='fileupload'>
			<input onChange={handleChangePhoto} id='fileupload' type='file' />
			<span >Прикрепить фото</span>
		</label>
	)
}

export default AttachPhotoButton
