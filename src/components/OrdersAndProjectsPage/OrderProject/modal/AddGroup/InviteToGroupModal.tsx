import React from 'react'
import Button from '../../../../ui/Button/Button'
import CloseButton from '../../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../../ui/Modal/ModalContainer'

const InviteToGroupModal: React.FC<{ handleClose?: () => void }> = ({ handleClose }) => {
	return (
		<ModalContainer zIndex={11} isOnOverlay={true} style={{ widows: 400, height: 500, position: 'fixed', top: '50%' }}>
			<div className='flex-column gap-large'>
				<div style={{ display: "flex", justifyContent: 'space-between' }}>
					<span className='textSizeL'>ПРИГЛАСИТЬ В ГРУППУ</span>
					<CloseButton onClick={handleClose} />
				</div>
				<Button>Подтвердить</Button>
			</div>
		</ModalContainer>
	)
}

export default InviteToGroupModal
