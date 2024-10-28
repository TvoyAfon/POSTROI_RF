import React from 'react'
import useStopScrolling from '../../../../../../hooks/useStopScrolling'
import { IDefaultModal } from '../../../../../../interface/modal.props'
import Button from '../../../../../ui/Button/Button'
import CheckboxButton from '../../../../../ui/CheckboxButton/CheckboxButton'
import CloseButton from '../../../../../ui/CloseButton/CloseButton'
import OverLay from '../../../../../ui/OverLay'
import RadioButton from '../../../../../ui/RadioButton/RadioButton'
import ToggleButton from '../../../../../ui/ToggleButton/ToggleButton'
import RadiusButton from '../ui/RadiusButton'
import styles from './NotifSet.module.scss'

const socials = ['E-mail', 'Вконтакте', 'WhatsApp', 'Telegram']

const NotificationSettings: React.FC<IDefaultModal> = ({ stateValue, onClose, }) => {

	useStopScrolling(stateValue!)

	return (
		<>
			{stateValue && <>
				<OverLay />
				<div className={styles.notificationSettings}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span className='textSizeL'>НАСТРОЙКА УВЕДОМЛЕНИЙ</span>
						<CloseButton onClick={onClose} />
					</div>
					<span style={{ fontWeight: 800 }}>Кременчуг-Константиновское</span>
					<ToggleButton label='Получать уведомления о заказах' />
					<div className='flex-column gap-medium'>
						<RadioButton label='Вся область' />
						<RadiusButton />
					</div>
					<div className='flex-column gap-medium'>
						<span style={{ fontWeight: 800 }}>Уведомления о заказах</span>
						<div style={{ display: 'flex', gap: 32 }}>
							{socials.map((el, index) => (
								<CheckboxButton key={index} label={el} />
							))}
						</div>
					</div>
					<Button>Подтвердить</Button>
				</div>
			</>}
		</>

	)
}

export default NotificationSettings
