import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentDateTime } from '../../../common/commonTime'
import { addSignsData } from '../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import Line from '../../ui/Line/Line'


const SignsDemo: React.FC = () => {
	const dispatch = useDispatch()
	const { categoryName } = useSelector((state: RootState) => state.createOrderCategories)

	const { dataSigns } = useSelector((state: RootState) => state.signsData)
	useEffect(() => {
		dispatch(addClickFlag(false))
		dispatch(addSignsData({
			...dataSigns,
			categoryType: categoryName
		}))
	}, [])

	return (
		<div className='flex-column'>
			<h1 className='textSizeL'>{dataSigns.taskName.toUpperCase()}</h1>
			<FilesUploader />
			<div>
				<span style={{ fontSize: 16, fontWeight: 300 }}>Адрес: </span>
				<span style={{ fontSize: 16, fontWeight: 700 }}>{dataSigns.address}</span>
			</div>
			<h2 style={{ fontSize: 16, fontWeight: 700 }}>Подробности:</h2>
			<div style={{ display: 'flex', gap: 6 }}>
				<div style={{ display: 'flex', gap: 3 }}>
					<span style={{ fontSize: 16, fontWeight: 300 }}>Опыт:</span>
					<span style={{ fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap' }}>{dataSigns.experience} лет</span>
				</div>
				<div style={{ display: 'flex', gap: 3 }}>
					<span style={{ fontSize: 16, fontWeight: 300, whiteSpace: 'nowrap' }}>Гарантия на работу:</span>
					<span style={{ fontSize: 16, fontWeight: 700 }}>{dataSigns.additionally.warranty ? 'Да' : 'Нет'}</span>
				</div>
				<div style={{ display: 'flex', gap: 3 }}>
					<span style={{ fontSize: 16, fontWeight: 300, whiteSpace: 'nowrap' }}>Работа по договору:</span>
					<span style={{ fontSize: 16, fontWeight: 700 }}>{dataSigns.additionally.contract ? 'Да' : 'Нет'}</span>
				</div>
				<div style={{ display: 'flex', gap: 3 }}>
					<span style={{ fontSize: 16, fontWeight: 300, whiteSpace: 'nowrap' }}>Исполнитель покупает материалы:</span>
					<span style={{ fontSize: 16, fontWeight: 700 }}>{dataSigns.additionally.materials ? 'Да' : 'Нет'}</span>
				</div>
			</div>
			<div style={{ display: 'flex', gap: 5 }}>
				<span style={{ fontSize: 16, fontWeight: 300 }}>Минимальная сумма заказа:</span>
				<span style={{ fontSize: 16, fontWeight: 700 }}>{dataSigns.price} ₽</span>
			</div>
			<Line lineWidth='100%' />
			<div style={{ fontSize: 16, fontWeight: 300, height: 150, overflowY: 'scroll' }}>{dataSigns.description}
			</div>
			<div>
				<span>Способ связи :</span>
				<span style={{ fontSize: 16, fontWeight: 700 }}>{dataSigns.communication.calls && ' Звонки.'}</span>
				<span style={{ fontSize: 16, fontWeight: 700 }}>{dataSigns.communication.messages && '  Сообщения'}</span>
			</div>
			<Line lineWidth='100%' />
			<div style={{ display: 'flex', gap: 12 }}>
				<span style={{ color: '#8E8E93', fontSize: 16 }}>Заказ № 65625944</span>
				<span style={{ color: '#8E8E93', fontSize: 16 }}>{getCurrentDateTime()}</span>
			</div>
		</div>

	)
}

export default SignsDemo
