import React from 'react'
import { useSelector } from 'react-redux'
import location_svg from '../../../assets/images/createOrder_img/location.svg'
import { getCurrentDateTime } from '../../../common/commonTime'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import Line from '../../ui/Line/Line'

const CreateOrderUniversalDemo: React.FC = () => {

	const { dataUniversal } = useSelector((state: RootState) => state.createOrderUniversalData)


	return (
		<div className='flex-column ' style={{ position: 'relative' }}>
			<span style={{ fontSize: '20px', fontWeight: 600 }}>{dataUniversal.taskName}</span>
			<span style={{ fontSize: 16, fontWeight: 300, wordWrap: 'break-word' }}>{dataUniversal.description}</span>
			<FilesUploader />
			<Line lineWidth='100%' />
			<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
				<span style={{ fontSize: 16, fontWeight: 300 }}>Адрес:</span>
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<span style={{ fontSize: '16px', fontWeight: 700 }}>
						{dataUniversal.address}
					</span>
					<img src={location_svg} alt="" />
				</div>
			</div>
			<div>
				<span style={{ paddingRight: 12, fontSize: 16, fontWeight: 300 }}>Когда нужно приступить:</span>
				<span style={{ fontSize: '16px', fontWeight: 700 }}>{dataUniversal.date}</span>
			</div>
			<Line lineWidth='100%' />
			<div style={{ display: 'flex' }}>
				<div style={{ fontSize: '16px', fontWeight: 700 }}>
					<span style={{ fontSize: '16px', fontWeight: 700 }}>{dataUniversal.paymethod === 'cards' && 'Наличными или переводом на карту, напрямую исполнителю'}</span>
					<span style={{ fontSize: '16px', fontWeight: 700 }}>{dataUniversal.paymethod === 'fromApp' && 'Через приложение по тарифам приложения'}</span>
					<span style={{ fontSize: '16px', fontWeight: 700 }}>{dataUniversal.paymethod === 'settlement' && 'На расчетный счет самозанятого, ИП или юридического лица. В этом случае на вашу заявку смогут откликаться самозанятые, ип или юридические лица.'}</span>
				</div>
			</div>
			<span className='flex-column gap-small' style={{ fontSize: '16px', fontWeight: 700 }}>
				<span style={{ fontSize: '16px', fontWeight: 700 }}>{dataUniversal.settings.contract ? 'Нужен договор' : 'Договор не нужен'}</span>
			</span>
			<Line lineWidth='100%' />
			<div style={{ display: 'flex', gap: 12 }}>
				<span style={{ fontSize: '16px', fontWeight: 300, color: '#8E8E93' }}>№ 65625944</span>
				<span style={{ fontSize: '16px', fontWeight: 300, color: '#8E8E93' }}>{getCurrentDateTime()}</span>
			</div>
		</div>
	)
}

export default CreateOrderUniversalDemo
