import React from 'react'
import CreateOrderTextArea from '../../../ui/CreateOrderTextArea/CreateOrderTextArea'
import Field from '../../../ui/Field/Field'
import InputCalendar from '../../../ui/InputCalendar/InputCalendar'
import PageNameArrow from '../../../ui/PageName&Arrow/PageNameArrow'
import styles from './CardOrderEditCard.module.scss'
import BuildingDynamicFields from './dynamicFields/BuildingDynamicFields'


const CardOrderEditCard: React.FC = () => {
	return (
		<div className={styles['overlay_cardorder']}>
			<div>
				<PageNameArrow style={{ paddingBottom: 32 }} pageName='Редактирование заказа' />
				<div className={styles['cardorderEditCard']}>
					<div className='flex-column gap-small'>
						<span className='textSizeL'>Название заказа</span>
						<Field style={{ width: "100%" }} />
					</div>
					<div className='flex-column gap-small'>
						<span className='textSizeL'>Опишите задачу</span>
						<CreateOrderTextArea style={{ width: "100%", height: 200 }} />
					</div>
					<div className='flex-column gap-small'>
						<span className='textSizeL'>Когда нужна услуга?</span>
						<InputCalendar />
					</div>
					<div className='flex-column gap-small'>
						<span className='textSizeL'>Адрес</span>
						<Field style={{ width: "100%" }} />
					</div>
					<div>
						<span className='textSizeL'>Фото и файлы</span>
					</div>
					<BuildingDynamicFields />
				</div>
			</div>
		</div>
	)
}

export default CardOrderEditCard
