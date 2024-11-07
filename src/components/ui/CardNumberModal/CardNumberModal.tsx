import React from 'react'
import { IDefaultModal } from '../../../interface/modal.props'
import IconSignature from '../../Profile/ui/IconSignature'
import SignsCardReviews from '../../Signs/SignsCard/modal/user/SignsCardReviews'
import CloseButton from '../CloseButton/CloseButton'
import ModalContainer from '../Modal/ModalContainer'

interface ICardNumberModal {
	phone: string,
	userProfile: React.ReactNode,

}

const CardNumberModal: React.FC<IDefaultModal & ICardNumberModal> = ({ onClose, phone, userProfile }) => {
	return (
		<ModalContainer
			zIndex={13}
			isOnOverlay={true}
			style={{
				width: 466,
				position: 'fixed',
				top: '50%',
				left: '50%'
			}}>
			<div
				style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 12 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
						<span>Номер телефона:</span>
						<span className='textSizeL'>{phone}</span>
					</div>
					<CloseButton onClick={onClose} />
				</div>
				{userProfile}
				<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
					<IconSignature >
						<span className='textSizeL'> 4,3</span>
					</IconSignature>
					<SignsCardReviews reviewsCount='45' />
					<span>Размещено заказов: 5</span>
				</div>
			</div>
		</ModalContainer >
	)
}

export default CardNumberModal
