import React from 'react'
import useStopScrolling from '../../../hooks/useStopScrolling'
import { IDefaultModal } from '../../../interface/modal.props'
import Button from '../Button/Button'
import CloseButton from '../CloseButton/CloseButton'
import CreateOrderTextArea from '../CreateOrderTextArea/CreateOrderTextArea'
import ModalContainer from './ModalContainer'

const ReplyModal: React.FC<IDefaultModal> = ({ stateValue, onClose }) => {

	useStopScrolling(stateValue!)

	return (
		<>
			{stateValue &&
				<ModalContainer style={{ position: 'fixed', top: '50%', left: '50%', width: 848 }} isOnOverlay={true} zIndex={11}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='textSizeL'>Ответ на отзыв</span>
							<CloseButton onClick={onClose} />
						</div>
						<CreateOrderTextArea style={{ height: 165 }} />
						<Button>Отправить</Button>
					</div>
				</ModalContainer>}
		</>
	)
}

export default ReplyModal