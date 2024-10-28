import React from 'react'
import Button from '../../../../ui/Button/Button'
import CloseButton from '../../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../../ui/Modal/ModalContainer'

const AddPeople: React.FC<{ handleClose?: () => void }> = ({ handleClose }) => {
	return (
		<ModalContainer zIndex={11} isOnOverlay={true} style={{ width: 400, height: 600, position: 'fixed', top: '50%' }}>
			<div className='flex-column gap-large'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span className='textSizeL'>ДОБАВИТЬ УЧАСТНИКА</span>
					<CloseButton onClick={handleClose} />
				</div>
				<Button>Продолжить</Button>
			</div>
		</ModalContainer>
	)
}

export default AddPeople
