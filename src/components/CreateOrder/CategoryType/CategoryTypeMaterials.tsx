import React from 'react'
import vendor_banner from '../../../assets/images/newCategories/stroimaterials.svg'
import Button from '../../ui/Button/Button'
import styles from './CategoryType.module.scss'

import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES_NAVBAR } from '../../../routes/routes'
import { chooseAllSteps } from '../../../store/slices/CreateOrder/form/CreateOrderForm'
import { changeCategoryName } from '../../../store/slices/CreateOrderCategoriesSlice'
import { buttonPosition2, styleButtonBlue, styleButtonDark } from '../../MainPage/Categories/CategoryCardDetail/styles/stylesCategoryCard'

const CategoryTypeMaterials: React.FC = () => {
	const dispatch = useDispatch()
	const handleMaterialsClick = () => {
		dispatch(changeCategoryName('Стройматериалы'))
		dispatch(chooseAllSteps('/6'))
	}
	const nav = useNavigate()

	return (
		<div className={styles.vendor}>
			<img src={vendor_banner} alt="vendor" />
			<div className='flex-column '>
				<div style={{ ...buttonPosition2, top: 65, left: 40 }} className='flex-column'>
					<Link to={ROUTES_NAVBAR.createOrder}>
						<Button
							onClick={handleMaterialsClick}
							style={styleButtonBlue}>Просмотр заказов</Button>
					</Link>
					<Button
						onClick={() => nav(ROUTES_NAVBAR.searchOrder)}
						style={styleButtonDark}>Регистрация поставщика</Button>
				</div>
				<span style={{ fontSize: 16, fontWeight: 300, paddingTop: 32 }}>
					Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены Выберите лучшего и заключите сделку.
				</span>
			</div>
		</div>
	)
}

export default CategoryTypeMaterials
