import React, { useState } from 'react'
import img_card from '../../../../../assets/images/signs/img_signs.png'
import { IOrderCardWorkers } from '../../../../../interface/categoryCard.props'
import CardOrderUser from '../../../../SearchOrder/CardOrderInfo/CardOrderUser/CardOrderUser'
import Button from '../../../../ui/Button/Button'
import styles from './CardWorkers.module.scss'

import { useNavigate } from 'react-router-dom'
import { ROUTES_CATEGORY } from '../../../../../routes/routes'
import MyCardOrderWorkerDetail from './CardDetailWorkers/MyCardOrderWorkerDetail'


const MyCardOrderWorker: React.FC<IOrderCardWorkers> = ({ date = '15 августа', address = 'Кемеровская область, СНТ Денисовский, участок 544.', img = img_card, task = 'Lorem  blanditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor sit amet consecteturquas numquam illo aspernatur, provident possimus fugit acditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor sditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor sditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor sditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor s', taskName = 'Погрузка шкафа', userProfile = <CardOrderUser />, categoryType = 'Разнорабочие' }) => {
	const navigate = useNavigate()
	const [isOpenDetail, setIsOpenDetail] = useState(false)
	const handleCloseDetail = () => {
		setIsOpenDetail(false)
	}

	const handleOpenEdit = () => {
		navigate(ROUTES_CATEGORY.cardWorkersEditCard)
	}
	return (
		<>
			{isOpenDetail && <MyCardOrderWorkerDetail onClose={handleCloseDetail} />}
			<div className={styles.defaultOrderCard}>
				<div style={{ display: 'flex', gap: 32 }}>
					<img style={{ width: 250, height: 230 }} src={img} alt="img_card" />
					<div className='flex-column gap-small' onClick={() => setIsOpenDetail(true)} style={{ width: 575, height: 250, cursor: 'pointer' }}>
						<span className='textSizeL'>{taskName.toUpperCase()}</span>
						<span style={{ height: 120, overflowY: 'hidden' }}>{task}</span>
						<span style={{ fontWeight: 800 }}>{date}</span>
						<span style={{ fontWeight: 800 }}>{address}</span>
						<span style={{ fontWeight: 800, color: '#8E8E93' }}>{categoryType}</span>
					</div>
					<div className='flex-column gap-medium-large'>
						{userProfile}
						<Button onClick={handleOpenEdit} style={{ width: '145px', fontSize: 14, fontWeight: 400 }}>Редактировать</Button>
						<Button style={{ backgroundColor: '#8E8E93', width: 145, fontSize: 14, fontWeight: 400 }}>Удалить</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default MyCardOrderWorker
