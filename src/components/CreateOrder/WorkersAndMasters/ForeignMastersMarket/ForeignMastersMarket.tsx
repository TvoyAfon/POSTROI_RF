import React from 'react'
import foreign_svg from '../../../../assets/images/createOrder_img/foreign_special.svg'
import Button from '../../../ui/Button/Button'
import styles from '../WorkersAndMaterials.module.scss'

const ForeignMastersMarket: React.FC = () => {
	return (
		<div className={styles.overlayCard}>
			<div className='flex-column gap-medium'>
				<img src={foreign_svg} alt="foreign_svg" />
				<span className='textSizeL' style={{ color: '#FFFFFF' }}>БИРЖА ИНОСТРАННЫХ СПЕЦИАЛИСТОВ</span>
				<div style={{ display: 'flex', gap: 11 }}>
					<Button style={{ color: '#231F20', backgroundColor: 'white' }}>Найти специалиста</Button>
					<Button style={{ color: 'white', backgroundColor: '#231F20' }}>Заполнить анкету специалиста</Button>
				</div>
				<span style={{ fontWeight: 300, color: 'white' }}>Биржа разнорабочих — это современный способ поиска работников. Работодатель, может разместить объявление о поиске работника и просматривать анкеты рабочх. Разнорабочие, могут заполнить анкету, чтобы привлечь внимание потенциальных работодателей и просматривать объявления работодателей.</span>
			</div>
		</div>
	)
}

export default ForeignMastersMarket
