import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import img from '../../../../../assets/images/signs/img_signs.png'
import { IOrderCardEdit } from '../../../../../interface/categoryCard.props'
import { addClickEditFlag } from '../../../../../store/slices/EditModalFlag/EditModalFlagSlice'
import Button from '../../../../ui/Button/Button'
import CreateOrderTextArea from '../../../../ui/CreateOrderTextArea/CreateOrderTextArea'
import Field from '../../../../ui/Field/Field'
import InputAddress from '../../../../ui/InputAddress/InputAddress'
import InputCalendar from '../../../../ui/InputCalendar/InputCalendar'
import styles from '../CardWorkers/CardWorkers.module.scss'
import arrow from './../../../../../assets/images/createOrder_img/arrow-left-02.svg'
const MyCardOrdersWorkerEdit: React.FC<IOrderCardEdit> = ({ categoryType = 'Грузчики' }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addClickEditFlag(true))
	}, [])

	return (
		<div className={styles['overlay_cardWorkersEdit']} style={{ display: "flex", justifyContent: 'center', paddingTop: 145 }}>
			<div className={styles.cardWorkersEdit}>
				<div style={{ display: 'flex', gap: 32, position: 'absolute', top: -45, left: 0 }}>
					<img onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} src={arrow} alt="arrow" />
					<span className='textSizeL'>Редактирование заказа</span>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span style={{ color: "gray", fontWeight: 600 }}>{categoryType}</span>
				</div>
				<div className='flex-column gap-medium'>
					<span style={{ fontSize: 18, fontWeight: 600 }}>Название объявления</span>
					<Field style={{ width: '100%' }} />
				</div>
				<div className='flex-column gap-medium'>
					<span style={{ fontSize: 18, fontWeight: 600 }}>Текст объявления</span>
					<CreateOrderTextArea />
				</div>
				<div className='flex-column gap-medium'>
					<span style={{ fontSize: 18, fontWeight: 600 }}>Место оказания услуг</span>
					<span>Укажите, где вы оказываете услуги, например адрес, район или город </span>
					<InputAddress style={{ width: '93.5%' }} />
				</div>
				<div className='flex-column gap-medium'>
					<span style={{ fontSize: 18, fontWeight: 600 }}>Когда нужна услуга</span>
					<InputCalendar style={{ width: '100%' }} />
				</div>
				<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
					<span style={{ fontSize: 18, fontWeight: 600 }}>Способ оплаты:</span>
					<span>Наличными</span>
				</div>
				<div className={styles.cardWorkersEdit_img_container} style={{ display: 'flex', flexWrap: 'wrap', gap: 14, height: 160, overflowY: 'scroll', scrollbarWidth: 'none' }}>
					<img src={img} alt="img" />
					<img src={img} alt="img" />
					<img src={img} alt="img" />
					<img src={img} alt="img" />
					<img src={img} alt="img" />
					<img src={img} alt="img" />
				</div>
				<Button style={{ width: '23%' }}>Сохранить изменения</Button>
			</div>
		</div>
	)
}

export default MyCardOrdersWorkerEdit
