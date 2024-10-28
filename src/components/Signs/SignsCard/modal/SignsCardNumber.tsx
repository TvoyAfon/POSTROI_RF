import React from 'react'
import { IDefaultModal } from '../../../../interface/modal.props'
import IconSignature from '../../../Profile/ui/IconSignature'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import SignsCardReviews from './user/SignsCardReviews'
import SignsCardUser from './user/SignsCardUser'

const SignsCardNumber: React.FC<IDefaultModal> = ({ onClose }) => {
	return (
		<ModalContainer zIndex={13} style={{ width: 466, border: '1px solid rgba(0,0,0,0.33)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 10px 14px 0px, rgba(0, 0, 0, 0.05) 0px 2px 2px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px' }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 12 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
						<span>Номер телефона:</span>
						<span className='textSizeL'>8 123 456 789 0</span>
					</div>
					<CloseButton onClick={onClose} />
				</div>
				<SignsCardUser />
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

export default SignsCardNumber
