import React, { SetStateAction } from 'react'
import solid_bottom from '../../../assets/images/other/caret-bottom-solid.svg'
import EducationalPopUp from './EducationalPopUp'


const EducationalList: React.FC<{
	isOpenPopup: boolean,
	setIsOpenPopup: any,
	updateData?: 'user' | 'userWorkerProfile',
	currentDegree?: string,
	setCurrentDegree: React.Dispatch<SetStateAction<string>>
}> = ({ isOpenPopup, setIsOpenPopup, setCurrentDegree, currentDegree }) => {


	const handleClosePopup = () => {
		setIsOpenPopup(false)
	}

	return (
		<div style={{ display: "flex", gap: 10, position: 'relative', cursor: "pointer" }}>
			<span className='textSizeM' onClick={() => setIsOpenPopup(true)}>Выберите из списка</span>
			<img onClick={() => setIsOpenPopup(true)} src={solid_bottom} alt="solid" />
			<EducationalPopUp
				currentDegree={currentDegree}
				setCurrentDegree={setCurrentDegree}
				stateValue={isOpenPopup}
				onClose={handleClosePopup} />
		</div>
	)
}

export default EducationalList
