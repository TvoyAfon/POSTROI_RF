import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Categories } from '../../../../../common/categories'
import { ROUTES_NAVBAR } from '../../../../../routes/routes'
import { addOrderData } from '../../../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { setSelectedHierarchy } from '../../../../../store/slices/other/categoriesList'
import { RootState } from '../../../../../store/store'
import PageNameArrow from '../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../CategoryCardDetail.module.scss'
import { overlayStyle, stylesForArrow } from '../styles/stylesCategoryCard'
import { categoryImg } from './categoryImg/categoryImg'

const BuildingAndRepair: React.FC = () => {
	const nav = useNavigate()
	const dispatch = useDispatch()
	const { data } = useSelector((state: RootState) => state.createOrderData)
	const handlaNavOrder = (subCategory: string) => {
		nav(ROUTES_NAVBAR.createOrder)
		dispatch(addOrderData({
			...data,
			categoryType: Categories.Building,
			subCategoryType: subCategory
		}))
		dispatch(setSelectedHierarchy({
			category: Categories.Building,
			subCategories: [subCategory],
			subsubCategories: []
		}))
	}

	return (
		<div className={styles['overlay']} style={overlayStyle}>
			<div className={styles['building']}>
				<PageNameArrow
					style={stylesForArrow}
					pageName='Cтроительство и ремонт'
					routeBack={'/'} />
				{categoryImg.map((cat, index) => (
					<img
						onClick={() => handlaNavOrder(cat.sub_category)}
						key={index}
						alt={cat.sub_category}
						src={cat.img} />
				))}
			</div>
		</div>
	)
}

export default BuildingAndRepair
