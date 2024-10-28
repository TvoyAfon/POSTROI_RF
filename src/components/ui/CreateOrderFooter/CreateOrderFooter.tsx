import React from 'react'
import { useSelector } from 'react-redux'
import arrow_back from '../../../assets/images/createOrder_img/arrow-left-white.svg'
import arrowRightIcon from '../../../assets/images/createOrder_img/arrow-right-black.svg'
import { IOrderFooter } from '../../../interface/createOrderFooter.props'
import { RootState } from '../../../store/store'
import { flexRow, stylesButtonOrder } from '../../CreateOrder/forms/styles/stylesCreateOrder'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'
import styles from './CreateOrderFooter.module.scss'

const CreateOrderFooter: React.FC<IOrderFooter> = ({ style, handleBack, handleContinue, loading }) => {

	const { data } = useSelector((state: RootState) => state.createOrderData)

	return (
		<div style={style} className={styles.footer_container}>
			<span style={{ color: 'white' }} className='textSizeM'>Информация ниже не отобразится в заказе</span>
			<span style={{ color: '#fff' }}>Не получать отклики от специалистов с рейтингом ниже {data.settings.rating ? data.offersRating : '-'}</span>
			<div style={flexRow}>
				<span style={{ color: '#fff' }}>Получать уведомления об откликах на заказ:</span>
				{data.is_send ? data.currentSocials.map((social, index) => (
					<span
						style={{ color: 'white' }}
						className='textSizeM'
						key={index}>{social}</span>
				)) : <span style={{ color: 'white' }}>-</span>}
			</div>
			<div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingTop: 16 }}>
				<Button
					style={{ ...stylesButtonOrder, backgroundColor: '#7099ED', color: 'white' }}
					onClick={handleBack}>
					<div style={flexRow}>
						<img src={arrow_back} alt="back" />
						<span>Назад</span>
					</div>
				</Button>
				<Button
					style={{ width: 165, borderRadius: 6, backgroundColor: '#fff', color: '#231F20' }}
					onClick={handleContinue} >
					<div style={{ ...flexRow, padding: 6 }}>
						<span style={{ fontWeight: 500 }}>{loading ? <Loader
							textStyle={{ fontSize: 14 }}
							text='Подождите' /> : 'Опубликовать'}</span>
						<img src={arrowRightIcon} alt="continue" />
					</div>
				</Button>
			</div>
		</div>
	)
}

export default CreateOrderFooter
