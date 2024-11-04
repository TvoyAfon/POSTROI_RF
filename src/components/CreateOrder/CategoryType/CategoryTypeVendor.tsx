import React from 'react'
import { useNavigate } from 'react-router-dom'
import zakashickam from '../../../assets/images/newCategories/zakaschikam.svg'
import { ICategoryType } from '../../../interface/modal.props'
import { ROUTES_CATEGORY } from '../../../routes/routes'
import { buttonPosition, styleButtonOrange } from '../../MainPage/Categories/CategoryCardDetail/styles/stylesCategoryCard'
import Button from '../../ui/Button/Button'
import PageNameArrow from '../../ui/PageName&Arrow/PageNameArrow'
import styles from './CategoryType.module.scss'


const CategoryTypeVendor: React.FC<ICategoryType> = ({ handleRegisterVendor }) => {

	const navigate = useNavigate()

	return (
		<div>
			<div className={styles.vendor}>
				<PageNameArrow
					routeBack={'/'}
					style={{ position: 'absolute', top: -75, left: -30 }}
					pageName='ПОСТАВЩИКИ И СТРОИТЕЛЬНЫЕ МАТЕРИАЛЫ' />
				<img
					style={{ marginBottom: 32 }}
					src={zakashickam}
					alt="vendor" />
				<div style={{ ...buttonPosition, top: 75, left: 30 }}>
					<Button
						onClick={() => navigate(ROUTES_CATEGORY.vendors)}
						style={styleButtonOrange}>Просмотр поставщиков</Button>
					<Button
						onClick={handleRegisterVendor}
						style={{ width: 182, height: 56, borderRadius: 58, fontSize: 14, fontWeight: 600, backgroundColor: '#383940' }}>Регистрация поставщика</Button>
				</div>
				<span style={{ fontSize: 16, fontWeight: 300 }}>
					Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены Выберите лучшего и заключите сделку.
				</span>
			</div>
		</div>
	)
}

export default CategoryTypeVendor
