import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import left_svg from '../../../../../../assets/images/newCategories/zakaschikam.svg'
import { Categories } from '../../../../../../common/categories'
import { ROUTES_NAVBAR } from '../../../../../../routes/routes'
import { changeCategoryName } from '../../../../../../store/slices/CreateOrderCategoriesSlice'
import Button from '../../../../../ui/Button/Button'
import styles from '../../CategoryCardDetail.module.scss'
import { IProjectAndDesignProps } from '../../interface/projectAndDesignProps'
import { buttonPosition, styleButtonDark, styleButtonOrange } from '../../styles/stylesCategoryCard'



const ProjectAndDesignLeft: React.FC<IProjectAndDesignProps> = ({ currentType }) => {
	const dispatch = useDispatch()
	const nav = useNavigate()
	const handleCreateOrder = () => {
		nav(ROUTES_NAVBAR.createOrder)
		dispatch(changeCategoryName(Categories.ProjectAndDesign))
	}

	return (
		<div className={styles['cardDetail_mainContent_leftSide']}>
			<img src={left_svg} alt="left_svg" />
			<div
				style={buttonPosition}>
				<Button
					onClick={handleCreateOrder}
					style={styleButtonOrange}>Создать заказ</Button>
				<Button
					style={styleButtonDark}>{currentType === 'Проектирование' ? 'Просмотр проектировщиков' : 'Просмотр Дизайнеров'}</Button>
			</div>
			<span className={styles['text']}>Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены Выберите лучшего и заключите сделку.</span>
		</div>
	)
}

export default ProjectAndDesignLeft
