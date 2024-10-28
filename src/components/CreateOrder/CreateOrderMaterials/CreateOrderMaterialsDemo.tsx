import React from 'react'
import { useSelector } from 'react-redux'
import location_svg from '../../../assets/images/createOrder_img/location.svg'
import { getCurrentDateTime } from '../../../common/commonTime'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import Line from '../../ui/Line/Line'

const CreateOrderMaterialsDemo: React.FC = () => {

	const { dataMaterials } = useSelector((state: RootState) => state.createOrderMaterialsData)

	return (
		<div className='flex-column' style={{ position: 'relative' }}>
			<section className='flex-column gap-medium'>
				<span className='textSizeL'>{dataMaterials.taskName}</span>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Категории</span>
				<span style={{ fontWeight: 300, fontSize: 16 }}>
					Отделочные материалы: Керамическая плитка и керамогранит, Сыпучие материалы, Строительные материалы: Металлопрокат, Цемент и сыпучие материалы, Сантехника: Сан фаянс, Внутренний водопровод и канализация, Кровля и фасад: Профлист, Фасадная подсистема
				</span>
			</section>
			<Line lineWidth='100%' />
			<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
				<span style={{ fontSize: 16, fontWeight: 300 }}>Адрес:</span>
				<span style={{ fontWeight: 700, fontSize: 16 }}>{dataMaterials.address}
				</span>
				<img src={location_svg} alt="location" />
			</div>
			<section className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Газоблок, гипсокартон, песок</span>
				<FilesUploader />
			</section>
			<div style={{ display: 'flex', gap: 10, fontSize: 16, fontWeight: 300 }}>
				Замена строительных материалов на аналогичные: <span style={{ fontWeight: 700, fontSize: 16 }}>{dataMaterials.similarItem ? 'Да' : 'Нет'}</span>
			</div>
			<Line lineWidth='100%' />
			<span style={{ fontWeight: 700, fontSize: 16 }}>{dataMaterials.delivery === 'yes' ? 'Нужна доставка' : 'Доставка не нужна'}</span>
			<span style={{ fontWeight: 700, fontSize: 16 }}>{dataMaterials.settings.contract ? 'Нужен договор' : 'Договор не нужен'}</span>
			<span style={{ display: 'flex', gap: 10, fontSize: 16, fontWeight: 300 }}>
				Когда нужны строительные материалы:{dataMaterials.personally ?
					<span style={{ fontWeight: 700, fontSize: 16 }} >
						Обсудим с поставщиком лично
					</span> : <span style={{ fontWeight: 700, fontSize: 16 }}>{dataMaterials.date}</span>}
			</span>
			<span style={{ display: 'flex', gap: 10, fontSize: 16, fontWeight: 300 }}>
				Способ оплаты:<span style={{ fontWeight: 700, fontSize: 16 }}>{dataMaterials.payMethod === 'cards' && 'Наличными или переводом на карту после получения товара'}
					{dataMaterials.payMethod === 'directly' && 'Напрямую поставщику на расчетный счет в предоплату.'}
					{dataMaterials.payMethod === 'fromApp' && 'Через приложение в предоплату. Поставщик получит оплату после того, как вы получите товар.'}
					{dataMaterials.payMethod === 'receipt' && 'При получении банковской картой через терминал'}
					{dataMaterials.payMethod === 'terminal' && 'У поставщика банковской картой через терминал'}
				</span>
			</span>
			<Line lineWidth='100%' />
			<section style={{ display: 'flex', gap: 10 }}>
				<span style={{ fontSize: 16, color: '#8E8E93' }}>
					№ 65625944
				</span>
				<span style={{ fontSize: 16, color: '#8E8E93' }}>
					{getCurrentDateTime()}
				</span>
			</section>
		</div>
	)
}

export default CreateOrderMaterialsDemo
