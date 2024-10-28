import React from 'react'
import { IDefaultModal } from '../../../../../../../interface/modal.props'
import CloseButton from '../../../../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../../../../ui/Modal/ModalContainer'
import RadioButton from '../../../../../../ui/RadioButton/RadioButton'
import PriceforService from './ui/PriceForService/PriceforService'

const alerts = ['Электронная почта', 'Мессенджер', 'На сайте', 'Вконтакте']

const SettingsServicesModal: React.FC<IDefaultModal> = ({ onClose }) => {
	return (
		<ModalContainer style={{ width: 975 }} zIndex={11} isOnOverlay={true}>
			<div className='flex-column'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span className='textSizeL'>Настройка услуги</span>
					<CloseButton onClick={onClose} />
				</div>
				<PriceforService />
				<div className='flex-column gap-medium'>
					<span className='textSizeL'>Оповещения</span>
					<div style={{ display: 'flex', gap: 16 }}>{alerts.map((alert) => (
						<RadioButton label={alert} />
					))}
					</div>
				</div>
				<div>
					<span className='textSizeL'>Локация</span>
				</div>
			</div>
		</ModalContainer>
	)
}

export default SettingsServicesModal
