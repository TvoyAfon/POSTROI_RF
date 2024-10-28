import React from 'react'
import { useModal } from '../../../../../hooks/useModal'
import useStopScrolling from '../../../../../hooks/useStopScrolling'
import { IDefaultModal } from '../../../../../interface/modal.props'
import Button from '../../../../ui/Button/Button'
import CloseButton from '../../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../../ui/Modal/ModalContainer'
import AddPeople from './AddPeople'

const AddParticipantModal: React.FC<IDefaultModal> = ({ stateValue, onClose }) => {

	useStopScrolling(stateValue!)

	const { handleClose, handleOpen, isOpen } = useModal()

	return (
		<>
			{isOpen && <AddPeople handleClose={handleClose} />}
			{stateValue && !isOpen && <ModalContainer zIndex={11} isOnOverlay={true} style={{ width: 420, top: '50%', position: 'fixed' }}>
				<div className='flex-column gap-large'>
					<div style={{ display: "flex", justifyContent: 'space-between' }}>
						<span className='textSizeL'>
							ДОБАВИТЬ УЧАСТНИКА
						</span>
						<CloseButton onClick={onClose} />
					</div>
					<div style={{ display: "flex", flexDirection: 'column', gap: 8 }}>
						<Button onClick={handleOpen} style={{ fontSize: 14 }}>Из контактов на сайте</Button>
						<Button style={{ fontSize: 14, backgroundColor: '#282930' }}>Скопировать ссылку на приглашение</Button>
						<span style={{ color: '#8E8E93', fontSize: 14 }}>Вы можете пригласить участника в проект<br /> по ссылке-приглашению</span>
					</div>
				</div>
			</ModalContainer>}
		</>
	)
}

export default AddParticipantModal
