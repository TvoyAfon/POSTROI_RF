import React, { useRef } from 'react'
import { useOutsideClick } from '../../../../../hooks/useOutside'
import styles from '../../OrderProject.module.scss'
import { IProjectCardPopup } from '../../types/projectTypes'



const ProjectCardPopup: React.FC<IProjectCardPopup> = ({ onOpenModalConfirm, onClose }) => {

	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, onClose)

	const settingsType = [
		{
			name: 'Удалить',
			onClick: onOpenModalConfirm
		}
	]

	return (
		<div ref={ref} className={styles['projectCardPopup']}>
			{settingsType.map((el, index) => (
				<span
					onClick={el.onClick}
					key={index}>{el.name}
				</span>
			))}
		</div>
	)
}

export default ProjectCardPopup
