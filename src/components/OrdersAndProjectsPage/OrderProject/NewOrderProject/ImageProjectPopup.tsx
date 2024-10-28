import React, { useRef } from 'react'
import { useOutsideClick } from '../../../../hooks/useOutside'
import styles from '../OrderProject.module.scss'

const ImageProjectPopup: React.FC<{
	handleAddPhoto: () => void,
	handleDeletePhoto: () => void,
	handleClose: () => void
}> = ({ handleAddPhoto, handleDeletePhoto, handleClose }) => {
	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)
	const settingsType = [
		{
			name: 'Добавить обложку',
			onClick: handleAddPhoto
		},
		{
			name: 'Удалить обложку',
			onClick: handleDeletePhoto
		}
	]

	return (
		<div ref={ref} className={styles['imgProjectPopup']}>
			{settingsType.map((el, index) => (
				<span style={{ cursor: 'pointer' }} onClick={el.onClick} key={index}>{el.name}</span>
			))}
		</div>
	)
}

export default ImageProjectPopup
