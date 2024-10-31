import React from 'react'
import img1_svg from '../../../../../../assets/images/newCategories/Frame 1412.svg'
import img2_svg from '../../../../../../assets/images/newCategories/Frame 1413.svg'
import img3_svg from '../../../../../../assets/images/newCategories/Frame 1414.svg'
import Button from '../../../../../ui/Button/Button'
import styles from '../../CategoryCardDetail.module.scss'
import { IProjectAndDesignProps } from '../../interface/projectAndDesignProps'
import { buttonPosition2, styleButtonBlue, styleButtonDark } from '../../styles/stylesCategoryCard'

const RentCardDetailRight: React.FC<IProjectAndDesignProps> = ({ currentType }) => {
	return (
		<div className={styles['cardDetail_mainContent_rightSide']}>
			<img src={currentType === '1' && img1_svg || currentType === '2' && img2_svg || currentType === '3' ? img3_svg : undefined}
				alt="right_svg" />
			<div style={{ ...buttonPosition2, top: 200 }}>	<Button
				style={styleButtonBlue}>Просмотр заказов</Button>
				<Button
					style={styleButtonDark}>Регистрация арендодателя</Button></div>
			<span className={styles['text']}>Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены Выберите лучшего и заключите сделку.</span>
		</div>
	)
}

export default RentCardDetailRight
