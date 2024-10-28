import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../../../assets/images/createOrder_img/arrow-left-02.svg'
import { ROUTES_CATEGORY } from '../../../../../routes/routes'
import UserLocation from '../../../../Navbar/UserLocation/UserLocation'
import CityAndRadius from '../../../../SearchOrder/SearchOrderHeader/CityAndRadius/CityAndRadius'
import Button from '../../../../ui/Button/Button'
import MyCardOrder from '../CardWorkers/MyCardOrderWorkerDetail'
import CheckBoxGroup from '../ui/CheckBoxGroup'
import UserProfileIcon from '../UserProfile/UserProfileIcon/UserProfileIcon'
import styles from './ShowWorkersOrders.module.scss'

const ShowWorkersOrders: React.FC = () => {

	const [currentButton, setCurrentButton] = useState('Список')
	const [openMap, setOpenMap] = useState(false)
	const navigate = useNavigate()
	return (
		<>
			{openMap && <UserLocation isOpenMap={openMap} handleCloseMap={() => setOpenMap(false)} />}
			<div className={styles['overlay_showWorkersOrders']} style={{ paddingTop: 120, display: 'flex', justifyContent: 'center' }}>
				<div className={styles.showWorkersOrders}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
						<span style={{ fontWeight: 800, color: '#8E8E93' }}>Биржа разнорабочих</span>
						<div style={{ display: "flex", gap: 20 }}>
							<img style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES_CATEGORY.workersAndMasters)} src={arrow} alt="arrow" />
							<span className='textSizeL'>ПРОСМОТР ЗАКАЗОВ</span>
						</div>
						<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
							<UserProfileIcon />
							<CityAndRadius setOpenSearchOrderMap={setOpenMap} />
							<Button onClick={() => setCurrentButton('Список')}
								style={{ width: 77, fontSize: 14, fontWeight: 400, backgroundColor: currentButton === 'Список' ? '#383940' : '#F4F3F1', color: currentButton === 'Список' ? 'white' : 'black' }}>Список</Button>
							<Button onClick={() => setCurrentButton('Карта')}
								style={{ width: 77, fontSize: 14, fontWeight: 400, backgroundColor: currentButton === 'Карта' ? '#383940' : '#F4F3F1', color: currentButton === 'Карта' ? 'white' : '#383940' }}>Карта</Button>
							<CheckBoxGroup label1='Разнорабочие' label2='Грузчики' />
						</div>
						<section className='flex-column gap-medium' style={{ height: 550, overflowY: 'scroll' }}>
							<MyCardOrder />
							<MyCardOrder />
							<MyCardOrder />
							<MyCardOrder />
						</section>
					</div>
				</div>
			</div>
		</>
	)
}

export default ShowWorkersOrders
