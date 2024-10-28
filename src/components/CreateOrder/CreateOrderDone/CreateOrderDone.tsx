import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import human_svg from '../../../assets/images/createOrder_img/human_bannerDone (1).svg'
import styles from './CreateOrderDone.module.scss'

import ellipse_svg from '../../../assets/images/createOrder_img/Ellipse 36.svg'
import { clearOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { resetAllSteps } from '../../../store/slices/CreateOrder/form/CreateOrderForm'
import { setSelectedHierarchy } from '../../../store/slices/other/categoriesList'
import { setColorNav } from '../../../store/slices/SetNavColorSlice'
import Button from '../../ui/Button/Button'
import CreateOrderRecomCard from './CreateOrderRecomCard/CreateOrderRecomCard'

const CreateOrderDone: React.FC<{ signsOrOrder: 'signs' | 'order' }> = ({ signsOrOrder }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(setColorNav('resetColor'))
		dispatch(clearOrderData())
		navigate('/')
		dispatch(resetAllSteps())
		dispatch(setSelectedHierarchy({
			category: '',
			subCategories: [],
			subsubCategories: [],
		}))
	}

	return (
		<div className={styles.underContent} style={{ display: 'flex', justifyContent: 'center', paddingTop: 140, paddingBottom: 32 }}>
			<div className={styles.createOrder_overlay}>
				<div className={styles.createOrderDone}>
					<div className={styles.createOrderDone_text}>
						<span style={{ fontSize: 60, fontWeight: 600 }}>Спасибо</span>
						<span style={{ fontSize: 60, fontWeight: 600 }}>за размещение</span>
						<span style={{ fontSize: 60, fontWeight: 600 }}>{signsOrOrder === 'order' ? 'заказа' : 'объявления'}</span>
					</div>
					<Button onClick={handleClick}>Вернуться на главную</Button>
					<img src={ellipse_svg} alt="ellipseDone" />
					<img src={human_svg} alt="human" />
					{/*<img style={{position:'relative'}} src={shadow_svg} alt="shadow" />*/}
				</div>
				<section className={styles['recom_section']} >
					<span className={styles.text} >ЭТО МОЖЕТ ВАС ЗАИНТЕРЕСОВАТЬ</span>
					<CreateOrderRecomCard />
					<CreateOrderRecomCard />
					<CreateOrderRecomCard />
				</section>
			</div>
		</div>
	)
}

export default CreateOrderDone
