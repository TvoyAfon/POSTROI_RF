import React from 'react'
import img_svg from '../../../../../../assets/images/newCategories/cleaningImg.svg'
import Button from '../../../../../ui/Button/Button'
import styles from '../../CategoryCardDetail.module.scss'
import { buttonPosition2, styleButtonBlue, styleButtonDark } from '../../styles/stylesCategoryCard'

const CleaningCardDetailRight: React.FC = () => {
	return (
		<div className={styles['cardDetail_mainContent_rightSide']}>
			<img src={img_svg}
				alt="right_svg" />
			<div style={{...buttonPosition2,top:100}}>
				<Button
					style={styleButtonDark}>Регистрация исполнителя</Button>
				<Button
					style={styleButtonBlue}>Просмотр заказов</Button>
					</div>
			<span className={styles['text']}>Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены Выберите лучшего и заключите сделку.</span>
		</div>
	)
}

export default CleaningCardDetailRight
