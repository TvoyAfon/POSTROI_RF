import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderWorkersData } from '../../../store/slices/data/OrderDataWorkers'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import Tooltip from '../../ui/Tooltip/Tooltip'

const CreateOrderWorkersSettings: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)
	const dispatch = useDispatch()

	const handleClickApp = () => {
		dispatch(addOrderWorkersData({
			...dataWorkers, settings: {
				...dataWorkers.settings,
				notice: !dataWorkers.settings.notice
			}
		}))
	}
	const handleClickChat = () => {
		dispatch(addOrderWorkersData({
			...dataWorkers, settings: {
				...dataWorkers.settings,
				chat: !dataWorkers.settings.chat
			}
		}))
	}
	const handleClickCalls = () => {
		dispatch(addOrderWorkersData({
			...dataWorkers, settings: {
				...dataWorkers.settings,
				calls: !dataWorkers.settings.calls
			}
		}))
	}

	return (
		<div className='flex-column gap-medium'>
			<span style={{ fontSize: '16px', fontWeight: '700' }}>Настройки</span>
			<div style={{ whiteSpace: 'nowrap', display: 'flex', gap: 12 }}>
				<CheckboxButton
					checked={dataWorkers.settings.calls}
					onClick={() => handleClickCalls()}
					label='Получать звонки от исполнителей' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton
					checked={dataWorkers.settings.chat}
					onClick={() => handleClickChat()}
					label='Общаться с исполнителем в чате' /><Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton checked={dataWorkers.settings.notice}
					onClick={() => handleClickApp()}
					label='Получать уведомления об откликах на ваш заказ?' /><Tooltip>Всплывающая подсказка</Tooltip>
			</div>
		</div>
	)


}
export default CreateOrderWorkersSettings
