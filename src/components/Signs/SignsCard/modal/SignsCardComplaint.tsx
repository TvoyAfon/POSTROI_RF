import React from 'react'
import { IDefaultModal } from '../../../../interface/modal.props'
import Button from '../../../ui/Button/Button'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import CreateOrderTextArea from '../../../ui/CreateOrderTextArea/CreateOrderTextArea'
import ModalContainer from '../../../ui/Modal/ModalContainer'

const SignsCardComplaint: React.FC<IDefaultModal> = ({ onClose }) => {
	return (
		<ModalContainer zIndex={13} style={{ width: 560, border: '1px solid rgba(0,0,0,0.1)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 10px 14px 0px, rgba(0, 0, 0, 0.05) 0px 2px 2px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px' }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span className='textSizeL'>Жалоба на объявление</span>
					<CloseButton onClick={onClose} />
				</div>
				<CreateOrderTextArea style={{ height: 204 }} placeholder='Опишите ситуацию' />
				<Button>Отправить</Button>
			</div>
		</ModalContainer>
	)
}

export default SignsCardComplaint
