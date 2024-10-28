import React, { SetStateAction, useRef } from 'react'
import { educationalType } from '../../../common/categories'
import { useOutsideClick } from '../../../hooks/useOutside'
import RadioButton from '../RadioButton/RadioButton'
import styles from './Educational.module.scss'

const EducationalPopUp: React.FC<{
	onClose?: () => void,
	updateData?: 'user' | 'userWorkerProfileData',
	stateValue?: boolean,
	currentDegree?: string,
	setCurrentDegree?: React.Dispatch<SetStateAction<string>>
}> = ({ onClose, stateValue, currentDegree, setCurrentDegree }) => {

	const popupRef = useRef<HTMLDivElement | null>(null)
	useOutsideClick(popupRef, onClose!)
	const handleCurrentDegree = (el: string) => {
		setCurrentDegree && setCurrentDegree(el)
	}

	return (
		<>
			{stateValue && (
				<div ref={popupRef} className={styles.educationalPopUp}>
					{educationalType.map((el, index) => (
						<RadioButton
							onClick={() => handleCurrentDegree(el)}
							key={index}
							label={el}
							checked={currentDegree === el}
						/>
					))}
				</div>
			)}
		</>
	)
}

export default EducationalPopUp