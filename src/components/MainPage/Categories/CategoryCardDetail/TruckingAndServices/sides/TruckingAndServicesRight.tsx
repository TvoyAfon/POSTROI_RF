import React from 'react'
import img_svg from '../../../../../../assets/images/newCategories/perevoshcikam.svg'
import img_svg2 from '../../../../../../assets/images/newCategories/spectexnika.svg'
import Button from '../../../../../ui/Button/Button'
import styles from '../../CategoryCardDetail.module.scss'
import { IProjectAndDesignProps } from '../../interface/projectAndDesignProps'
import { buttonPosition2, styleButtonBlue, styleButtonDark } from '../../styles/stylesCategoryCard'


const TruckingAndServicesRight: React.FC<IProjectAndDesignProps> = ({ currentType }) => {
	return (
		<div className={styles['cardDetail_mainContent_rightSide']}>
			<img src={
				currentType === 'Грузоперевозки' ? img_svg : undefined ||
					currentType === 'Услуги спецтехники' ? img_svg2 : undefined}
				alt="right_svg" />
			<div style={{...buttonPosition2,right:350}}>
				<Button
					style={styleButtonBlue}>Просмотр заказов</Button>
				<Button
					style={styleButtonDark}>Регистрация перевозчика</Button>
			</div>
			<span className={styles['text']}>Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены Выберите лучшего и заключите сделку.</span>
		</div>
	)
}

export default TruckingAndServicesRight
