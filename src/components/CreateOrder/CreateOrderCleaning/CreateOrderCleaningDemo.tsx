import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentDateTime } from '../../../common/commonTime'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import Line from '../../ui/Line/Line'

const CreateOrderCleaningDemo: React.FC = () => {

	const { dataCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)


	return (
		<div className='flex-column' style={{ position: 'relative' }}>
			<div className='flex-column gap-medium'>
				<span className='textSizeL'>{dataCleaning.taskName}</span>
				<div style={{ fontWeight: 300, fontSize: 16, display: 'flex', gap: 12 }}>Вид объекта:<span style={{ fontWeight: 700, fontSize: 16 }}>
					{dataCleaning.place === 'appartament' && 'Квартира'}
					{dataCleaning.place === 'house' && 'Дом'}
					{dataCleaning.place === 'office' && 'Офис или административное здание'}
					{dataCleaning.place === 'other' && dataCleaning.otherPlace}
				</span>
				</div>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<span style={{ fontWeight: 300, fontSize: 16 }}>Площадь:</span>
				<span style={{ fontWeight: 700, fontSize: 16 }}>{dataCleaning.square} м²</span>
			</div>
			<div style={{ fontWeight: 300, fontSize: 16, display: 'flex', gap: 12 }}> Вид уборки: <span style={{ fontWeight: 700, fontSize: 16 }}>
				{dataCleaning.pollution === 'daylyCleaning' && 'Повседневная влажная уборка'}
				{dataCleaning.pollution === 'generalCleaining' && 'Генеральная уборка'}
				{dataCleaning.pollution === 'veryDirty' && 'Очень грязно'}
				{dataCleaning.pollution === 'afterRepair' && 'После ремонта'}
			</span></div>
			<span style={{ fontWeight: 300, fontSize: 16, wordWrap: 'break-word' }}>{dataCleaning.description}</span>
			<Line lineWidth='100%' />
			<FilesUploader />
			<div style={{ display: 'flex', gap: 16 }} >
				<span style={{ fontWeight: 300, fontSize: 16 }}>Когда нужна услуга:</span>
				<span style={{ fontWeight: 700, fontSize: 16 }}>{dataCleaning.date}</span>
			</div>
			<div style={{ display: 'flex', gap: 16 }} >
				<span style={{ fontWeight: 300, fontSize: 16 }}>Адрес:</span>
				<span style={{ fontWeight: 700, fontSize: 16 }}>{dataCleaning.address}</span>
			</div>
			<Line lineWidth='100%' />
			<div style={{ display: 'flex', gap: 16 }}>
				<span style={{ fontWeight: 300, fontSize: 16 }}>Способ оплаты:</span>
				<span style={{ fontWeight: 700, fontSize: 16 }}>
					{dataCleaning.payMethod === 'cards' && 'Наличными или переводом на карту, напрямую исполнителю'}
					{dataCleaning.payMethod === 'fromApp' && 'Через приложением после выполнения работы исполнителем'}
					{dataCleaning.payMethod === 'settlement' && 'На расчетный счет самозанятого или организации'}
				</span>
			</div>
			<span className='flex-column gap-medium' style={{ fontWeight: 700, fontSize: 16 }}>
				<span style={{ fontWeight: 700 }}>{dataCleaning.settings.contract ? 'Нужен договор' : 'Договор не нужен'}</span>
			</span>
			<Line lineWidth='100%' />
			<div style={{ display: 'flex', gap: 16 }}>
				<span style={{ color: '#8E8E93', fontSize: 16, fontWeight: 300 }}>№ 65625944</span>
				<span style={{ color: '#8E8E93', fontSize: 16, fontWeight: 300 }}>{getCurrentDateTime()}</span>
			</div>
		</div>
	)
}

export default CreateOrderCleaningDemo
