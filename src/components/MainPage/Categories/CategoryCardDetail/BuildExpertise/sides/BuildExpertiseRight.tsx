import React from 'react'
import img_svg from '../../../../../../assets/images/newCategories/Frame 1409.svg'
import img_svg2 from '../../../../../../assets/images/newCategories/Frame 1410.svg'
import Button from '../../../../../ui/Button/Button'
import styles from '../../CategoryCardDetail.module.scss'
import { IProjectAndDesignProps } from '../../interface/projectAndDesignProps'
import { buttonPosition2, styleButtonBlue, styleButtonDark } from '../../styles/stylesCategoryCard'

const BuildExpertiseRight: React.FC<IProjectAndDesignProps> = ({ currentType }) => {
	return (
		<div className={styles['cardDetail_mainContent_rightSide']}>
			<img src={
				currentType === '2' && img_svg2 ||
					currentType === '1' ? img_svg : undefined}
				alt="right_svg" />
			<div style={{ ...buttonPosition2, top: 210, left: 660 }}>	<Button
				style={styleButtonBlue}>Просмотр заказов</Button>
				<Button
					style={styleButtonDark}>{currentType === '1' ? 'Регистрация эксперта' : 'Регистрация исполнителя'}</Button></div>
			<span className={styles['text']}>Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены Выберите лучшего и заключите сделку.</span>
		</div>
	)
}

export default BuildExpertiseRight
