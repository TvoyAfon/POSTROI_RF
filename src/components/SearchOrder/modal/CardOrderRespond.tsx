import React from 'react'
import { IDefaultModal } from '../../../interface/modal.props'
import { IOrderFullInfo } from '../../../services/order/types/types'
import { flexRow } from '../../CreateOrder/forms/styles/stylesCreateOrder'
import Button from '../../ui/Button/Button'
import CloseButton from '../../ui/CloseButton/CloseButton'
import ModalContainer from '../../ui/Modal/ModalContainer'

interface ICardOrderRespond extends IDefaultModal {
	order: IOrderFullInfo
}

const CardOrderRespond: React.FC<ICardOrderRespond> = ({ onClose, order }) => {
	return (
		<ModalContainer style={{ width: 800, position: 'fixed', top: '50%', left: '50%' }} isOnOverlay={true} zIndex={11}>
			<div className='flex-column gap-large'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span className='textSizeL'>{order.name}</span>
					<CloseButton onClick={onClose} />
				</div>
				<section
					className='flex-column'
					style={{ height: 222, overflowY: 'scroll', backgroundColor: '#F4F3F1', borderRadius: 24, padding: 12 }} >
					<span>{order.description}</span>
					<div>
						{order.files.map(file => (
							<img
								style={{ width: 140, height: 140, borderRadius: 16 }}
								src={file.file}
								alt={file.filename} />
						))}
					</div>
				</section>
				<section className='flex-column gap-medium'>
					<span className='textSizeL'>Вопросы</span>
					<div style={{ height: 165, overflowY: 'scroll', backgroundColor: '#F4F3F1', borderRadius: 24 }}>

					</div>
				</section>
				<section style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={flexRow}>
						<Button>Откликнуться</Button>
						<Button>Уточнить детали</Button>
					</div>
					<Button>Пожаловаться</Button>
				</section>
			</div>
		</ModalContainer>
	)
}

export default CardOrderRespond
