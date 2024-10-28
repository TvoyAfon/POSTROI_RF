import React from 'react'
import address_icon from '../../../../assets/images/other/calendar-03.png'
import { formatDate } from '../../../../common/common'
import { IOrderFullInfo } from '../../../../services/order/types/types'
import styles from './BuildingSpecificFields.module.scss'

const MaterialsSpecificFields: React.FC<{ card: IOrderFullInfo }> = ({ card }) => {
	return (
		<div className={styles['materialsfields']}>
			<div className={styles['flexRow']}>
				<span>Адрес:</span>
				<span style={{ fontWeight: 800 }}>{card.address}</span>
				<img src={address_icon} alt="address" />
			</div>
			<div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
				<div className={styles['flexRow']}>
					<span>Строительные материалы:</span>
					<span style={{ fontWeight: 800 }}>/* в разработке */</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Заменить товар на аналогичный:</span>
					<span style={{ fontWeight: 800 }}>{card.is_analog ? 'Да' : 'Нет'}</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Нужна доставка:</span>
					<span style={{ fontWeight: 800 }}>{card.is_delivery ? 'Да' : 'Нет'}</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Когда нужна услуга:</span>
					<span style={{ fontWeight: 800 }}> {card.start_date && card.end_date
						? `${formatDate(card.start_date as string)} - ${formatDate(card.end_date as string)}`
						: 'Обсудим с поставщиком лично'}</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Способ оплаты:</span>

				</div>
				<div className={styles['flexRow']}>
					<span>Контактный телефон:</span>
					<span style={{ fontWeight: 800 }}>{card.contact_phone}</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Работа по договору:</span>
					<span style={{ fontWeight: 800 }}>{card.is_contract ? 'Да' : 'Нет'}</span>
				</div>
			</div>
		</div>
	)
}

export default MaterialsSpecificFields
