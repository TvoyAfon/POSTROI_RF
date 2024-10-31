import React from 'react'
import right_svg from '../../../../../../assets/images/newCategories/Frame 1341.svg'
import right2_svg from '../../../../../../assets/images/newCategories/Frame 1402.svg'
import Button from '../../../../../ui/Button/Button'
import styles from '../../CategoryCardDetail.module.scss'
import { IProjectAndDesignProps } from '../../interface/projectAndDesignProps'
import { buttonPosition2, styleButtonBlue, styleButtonDark } from '../../styles/stylesCategoryCard'



const ProjectAndDesignRight: React.FC<IProjectAndDesignProps> = ({ currentType }) => {
	return (
		<div className={styles['cardDetail_mainContent_rightSide']}>
			<img src={currentType === 'Дизайн' && right2_svg || currentType === 'Проектирование' ? right_svg : undefined}
				alt="right_svg" />
			<div style={buttonPosition2}>
				<Button
					style={styleButtonBlue}>Просмотр заказов</Button>
				<Button
					style={styleButtonDark}>{currentType === 'Дизайн' ? 'Регистрация дизайнера' : 'Регистрация поставщика'}</Button>
			</div>
			<span className={styles['text']}>Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены Выберите лучшего и заключите сделку.</span>
		</div>
	)
}

export default ProjectAndDesignRight
