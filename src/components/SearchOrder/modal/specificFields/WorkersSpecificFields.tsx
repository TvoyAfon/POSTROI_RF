import React from 'react'
import address_icon from '../../../../assets/images/other/calendar-03.png'
import { formatDate } from '../../../../common/common'
import { IOrderFullInfo } from '../../../../services/order/types/types'
import styles from './BuildingSpecificFields.module.scss'

const WorkersSpecificFields: React.FC<{ card: IOrderFullInfo }> = ({ card }) => {
	return (
		<div className={styles['workersfields']}>
			<div className={styles['flexRow']}>
				<span>Адрес:</span>
				<span style={{ fontWeight: 800 }}>{card.address}</span>
				<img src={address_icon} alt="address" />
			</div>
			<div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
				<div className={styles['flexRow']}>
					<span>Кто вам требуется:</span>
					<span style={{ fontWeight: 800 }}>
						{card.work_specialization === 'LOADER' && 'Грузчики'}
						{card.work_specialization === 'HANDYMAN' && 'Разнорабочие'}
					</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Когда нужна услуга:</span>
					<span style={{ fontWeight: 800 }}>
						{card.start_date && card.end_date
							? `${formatDate(card.start_date as string)} - ${formatDate(card.end_date as string)}`
							: '-'}</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Способ оплаты:</span>

				</div>
				<div className={styles['flexRow']}>
					<span>Контактный телефон:</span>
					<span style={{ fontWeight: 800 }}>{card.contact_phone}</span>
				</div>
			</div>
		</div>
	)
}

export default WorkersSpecificFields
