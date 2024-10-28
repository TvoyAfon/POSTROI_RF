import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import arrow_img from '../../../../../assets/images/createOrder_img/arrow-left-02.svg'
import circle from '../../../../../assets/images/other/add-circle.svg'
import { ROUTES_CATEGORY, ROUTES_NAVBAR } from '../../../../../routes/routes'
import { changeCategoryName } from '../../../../../store/slices/CreateOrderCategoriesSlice'
import UserLocation from '../../../../Navbar/UserLocation/UserLocation'
import CityAndRadius from '../../../../SearchOrder/SearchOrderHeader/CityAndRadius/CityAndRadius'
import Button from '../../../../ui/Button/Button'
import Field from '../../../../ui/Field/Field'
import styles from '../../WorkersAndMaterials.module.scss'
import CheckBoxGroup from '../ui/CheckBoxGroup'
import FindWorkersList from './FindWorkersList/FindWorkersList'
import MyOrderList from './MyOrdersList/MyOrderList'


const FindWorkers: React.FC = () => {

	const navigate = useNavigate()
	const [openMap, setOpenMap] = useState(false)
	const [nav, setNav] = useState<string>('workers')
	const [openMyOrder, setOpenMyOrder] = useState(false)
	const [currentButton, setCurrentButton] = useState('Список')
	const dispatch = useDispatch()

	const handleOpenMyOrder = () => {
		setOpenMyOrder(true)
		setNav('my')
	}
	const handleOpenOrders = () => {
		setOpenMyOrder(false)
		setNav('workers')
	}

	const handleCreateOrder = () => {
		navigate(ROUTES_NAVBAR.createOrder)
		dispatch(changeCategoryName('Разнорабочие'))
	}

	return (
		<>
			{openMap && <UserLocation isOpenMap={openMap} handleCloseMap={() => setOpenMap(false)} />}
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div className={styles.findWorkers}>
					<div style={{ display: 'flex', gap: 32, position: 'absolute', top: -100, left: 0 }}>
						<img onClick={() => navigate(`${ROUTES_CATEGORY.workersAndMasters}`)} style={{ cursor: 'pointer' }} src={arrow_img} alt="arrow" />
						<span className='textSizeL'>БИРЖА РАЗНОРАБОЧИХ</span>
					</div>
					<div className={styles.findWorkers_section}>
						<div onClick={handleOpenOrders} style={{ display: 'flex', gap: 16, backgroundColor: nav === 'workers' ? "#7099ED" : 'transparent', borderRadius: '8px 8px 0px 0px', padding: '16px 24px 16px 24px', alignItems: 'center', cursor: 'pointer', }}>
							<span className='textSizeL' style={{ color: nav === 'workers' ? 'white' : '#8E8E93' }}>Анкеты разнорабочих</span>
							<span style={{ color: nav === 'workers' ? 'white' : '#8E8E93' }}>10</span>
						</div>
						<div onClick={handleOpenMyOrder} style={{ display: 'flex', gap: 16, padding: '16px 24px  16px 24px', alignItems: 'center', cursor: 'pointer', backgroundColor: nav === 'my' ? "#7099ED" : 'transparent', borderRadius: '8px 8px 0px 0px' }}>
							<span className='textSizeL' style={{ color: nav === 'my' ? 'white' : '#8E8E93' }}>Мои заказы</span>
							<span style={{ color: nav === 'my' ? 'white' : '#8E8E93' }}>9</span>
						</div>
					</div>
					<div style={{ display: 'flex', gap: !openMyOrder ? 24 : 0, alignItems: 'center' }}>

						<CityAndRadius
							style={{ width: 240 }}
							setOpenSearchOrderMap={setOpenMap} />
						{!openMyOrder ? <>
							<Button onClick={() => setCurrentButton('Список')} style={{ width: 77, height: 34, fontSize: 14, fontWeight: 400, backgroundColor: currentButton === 'Список' ? '#383940' : '#F4F3F1', color: currentButton === 'Список' ? 'white' : 'black' }}>Список</Button>
							<Button onClick={() => setCurrentButton('Карта')} style={{ width: 77, height: 34, fontSize: 14, fontWeight: 400, backgroundColor: currentButton === 'Карта' ? '#383940' : '#F4F3F1', color: currentButton === 'Карта' ? 'white' : 'black' }}>Карта</Button>
							<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
								<span style={{ fontWeight: 800 }}>Цена за час</span>
								<Field style={{ width: 100 }} />
							</div>
							<CheckBoxGroup label1='Разнорабочие' label2='Грузчики' />
						</> : null}
						{openMyOrder && <Button onClick={handleCreateOrder}>
							<img src={circle} alt="circle" />
							<span style={{ fontWeight: 800 }}>Создать заказ</span>
						</Button>}
					</div>
					{!openMyOrder ? <FindWorkersList /> : <MyOrderList />}
				</div>
			</div >
		</>
	)
}

export default FindWorkers
