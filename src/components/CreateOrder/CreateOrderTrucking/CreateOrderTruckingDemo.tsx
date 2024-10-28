import React from 'react'
import { useSelector } from 'react-redux'
import location_svg from '../../../assets/images/createOrder_img/location.svg'
import { getCurrentDateTime } from '../../../common/commonTime'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import Line from '../../ui/Line/Line'
import styles from './CreateOrderTrucking.module.scss'

const CreateOrderTruckingDemo: React.FC = () => {

	const { dataTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)



	return (
		<div style={{ position: 'relative' }} className={styles.truckingDemo}>
			<span style={{ fontSize: '20px', fontWeight: '600' }}>{dataTrucking.taskName}</span>
			<span style={{ fontSize: '16px', fontWeight: '700' }}>{dataTrucking.delivery === 'city' ? 'Город' : null}
				{dataTrucking.delivery === 'middlecity' ? 'Межгород' : null}
			</span>
			<span style={{ fontSize: '16px', fontWeight: '700' }}>Минимальный заказ 1.5ч</span>
			<div className={styles.truckingDemo_content}>
				<span style={{ fontSize: 16, fontWeight: 300, wordWrap: 'break-word' }}>{dataTrucking.description}</span>
				<FilesUploader />
				<div style={{ display: 'flex', gap: 12 }}>
					<span style={{ fontSize: '16px', fontWeight: '700' }}>Параметры груза:</span>
					<div style={{ display: 'flex', gap: '8px',alignItems:'center' }}>
					  <span>Длина:</span>
						<span>
							<span style={{ fontSize: '16px', fontWeight: '700' }}>{dataTrucking.inputParametres.length}
								{dataTrucking.inputParametres.diametr} м
							</span>
						</span>
						<span>Ширина:<span style={{ fontSize: '16px', fontWeight: '700', paddingLeft: 10 }}> {dataTrucking.inputParametres.width} м</span></span>
						<span>Высота:<span style={{ fontSize: '16px', fontWeight: '700', paddingLeft: 10 }}> {dataTrucking.inputParametres.height} м</span></span>
						<span>Объем:<span style={{ fontSize: '16px', fontWeight: '700', paddingLeft: 10 }}> {dataTrucking.inputParametres.size} м³ </span></span>
					</div>
				</div>
				<Line lineWidth='100%' />
			</div>
			<span style={{ fontSize: 16, fontWeight: 300 }}>Встать на погрузку: <span style={{ fontSize: '16px', fontWeight: '700' }}>{dataTrucking.when}</span></span>
			<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
				<span style={{ fontSize: 16, fontWeight: 300 }}>Адрес:</span>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ fontSize: '16px', fontWeight: '700' }}>{dataTrucking.where}
				</span><img src={location_svg} alt="location" /></div>
			</div>
			<Line lineWidth='100%' />
			<span style={{ fontSize: 16, fontWeight: 300 }}>Оплата: <span style={{ fontSize: '16px', fontWeight: '700' }}> {dataTrucking.payMethod === 'cards' ? 'Наличными или переводом на карту водителю (стоимость договорная)' : null}
				{dataTrucking.payMethod === 'fromApp' ? 'Через приложение по тарифам приложения' : null}
				{dataTrucking.payMethod === 'settlement' ? 'На расчетный счет самозанятого, ИП или юридического лица' : null}
			</span>
			</span>
			<div className='flex-column gap-medium' style={{ fontSize: '16px', fontWeight: '700' }}><span style={{ fontWeight: 700 }}>{dataTrucking.settings.contract ? 'Нужен договор' : 'Не нужен договор'}</span>
			</div>
			<Line lineWidth='100%' />
			<div style={{ display: 'flex', gap: '14px' }}>
				<span style={{ color: '#8E8E93', fontSize: 16 }}> № 65625944</span>
				<span style={{ color: '#8E8E93', fontSize: 16 }}>{getCurrentDateTime()}</span>
			</div>
		</div>
	)
}

export default CreateOrderTruckingDemo
