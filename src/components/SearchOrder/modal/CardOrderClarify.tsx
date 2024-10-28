import React from 'react'
import sent from '../../../assets/images/other/sent.svg'
import attachment_svg from '../../../assets/images/other/white_skrepka.svg'
import { IDefaultModal } from '../../../interface/modal.props'
import Button from '../../ui/Button/Button'
import CloseButton from '../../ui/CloseButton/CloseButton'
import CreateOrderTextArea from '../../ui/CreateOrderTextArea/CreateOrderTextArea'
import ModalContainer from '../../ui/Modal/ModalContainer'

const CardOrderClarify: React.FC<IDefaultModal> = ({ onClose }) => {
	return (
		<ModalContainer style={{ width: 800, top: 365 }} isOnOverlay={true} zIndex={11}>
			<div className='flex-column gap-large'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span className='textSizeL'>ГРУЗОВАЯ ГАЗЕЛЬ 001</span>
					<CloseButton onClick={onClose} />
				</div>
				<section style={{ height: 282, overflowY: 'scroll', backgroundColor: '#F4F3F1', borderRadius: 24 }} >

				</section>
				<section className='flex-column gap-medium'>
					<span className='textSizeL'>Вопросы</span>
					<div style={{ height: 165, overflowY: 'scroll', backgroundColor: '#F4F3F1', borderRadius: 24 }}>

					</div>
				</section>
				<section style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
					<Button style={{ width: 40, height: 40 }}>
						<img src={attachment_svg} alt="" />
					</Button>
					<CreateOrderTextArea style={{ height: 150 }} />
					<Button style={{ width: 40, height: 40 }}>
						<img src={sent} alt="" />
					</Button>
				</section>
			</div>
		</ModalContainer>
	)
}

export default CardOrderClarify
