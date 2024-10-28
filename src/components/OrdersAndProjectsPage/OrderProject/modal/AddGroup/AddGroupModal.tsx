import React, { useState } from 'react'
import useStopScrolling from '../../../../../hooks/useStopScrolling'
import { IDefaultModal } from '../../../../../interface/modal.props'
import Button from '../../../../ui/Button/Button'
import CloseButton from '../../../../ui/CloseButton/CloseButton'
import Field from '../../../../ui/Field/Field'
import ModalContainer from '../../../../ui/Modal/ModalContainer'
import InviteToGroupModal from './InviteToGroupModal'

const AddGroupModal: React.FC<IDefaultModal> = ({ stateValue, onClose }) => {

	useStopScrolling(stateValue!)

	const [openModal, setOpenModal] = useState(false)

	return (
		<>
			{openModal && <InviteToGroupModal handleClose={() => setOpenModal(false)} />}
			{stateValue && !openModal && <ModalContainer isOnOverlay={true} zIndex={11} style={{ width: 820, position: 'fixed', top: '50%' }}>
				<div className='flex-column gap-large'>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span className='textSizeL'>НОВАЯ ГРУППА</span>
						<CloseButton onClick={onClose} />
					</div>
					<div className='flex-column gap-medium'>
						<span className='textSizeL'>Название группы</span>
						<Field style={{ width: '100%' }} placeholder='Название' />
					</div>
					<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 3fr', gap: 32 }}>
						<Button onClick={() => setOpenModal(true)} style={{ backgroundColor: '#8E8E93', fontSize: 14 }}>Пригласить в группу</Button>
						<Button style={{ fontSize: 14 }}>Создать</Button>
					</div>
				</div>
			</ModalContainer>}
		</>
	)
}

export default AddGroupModal
