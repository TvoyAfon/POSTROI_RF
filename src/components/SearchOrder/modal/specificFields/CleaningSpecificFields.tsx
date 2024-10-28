import React from 'react'
import address_icon from '../../../../assets/images/other/calendar-03.png'
import { formatDate } from '../../../../common/common'
import { DegreeContamination } from '../../../../services/order/types/enums'
import { IOrderFullInfo } from '../../../../services/order/types/types'
import styles from './BuildingSpecificFields.module.scss'

export enum TYPEROOM {
	APARTAMENT = 'Аппартаменты',
	HOUSE = 'Дом',
	OFFICE = 'Офис',
	OTHER = 'Другое'
}

const CleaningSpecificFields: React.FC<{ card: IOrderFullInfo }> = ({ card }) => {
	return (
		<div className={styles['cleaningfields']}>
			<div className={styles['flexRow']}>
				<span>Адрес:</span>
				<span style={{ fontWeight: 800 }}>{card.address}</span>
				<img src={address_icon} alt="address" />
			</div>
			<div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
				<div className={styles['flexRow']}>
					<span>Где выполнить уборку:</span>
					<span style={{ fontWeight: 800 }}>
						{card.type_room === 'APARTAMENT' && TYPEROOM.APARTAMENT}
						{card.type_room === 'HOUSE' && TYPEROOM.HOUSE}
						{card.type_room === 'OFFICE' && TYPEROOM.OFFICE}
						{card.type_room === 'OTHER' && card.cleaning_type_other}
					</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Площадь помещения:</span>
					<span style={{ fontWeight: 800 }}>{card.square}м²</span>
				</div>
				<div className={styles['flexRow']}>
					<span>Степень загрязнения:</span>
					<span style={{ fontWeight: 800 }}>
						{card.type_cleaning === DegreeContamination.AFTER_REPAIR && 'После ремонта'}
						{card.type_cleaning === DegreeContamination.REGULAR && 'Ежедневная уборка'}
						{card.type_cleaning === DegreeContamination.DIRTY && 'Очень грязно'}
						{card.type_cleaning === DegreeContamination.GENERAL && 'Генеральная уборка'}
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
				<div className={styles['flexRow']}>
					<span>Работа по договору:</span>
					<span style={{ fontWeight: 800 }}>{card.is_contract ? 'Да' : 'Нет'}</span>
				</div>
			</div>
		</div>
	)
}

export default CleaningSpecificFields
