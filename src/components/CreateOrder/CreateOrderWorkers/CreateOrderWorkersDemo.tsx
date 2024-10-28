import React from 'react'
import { useSelector } from 'react-redux'
import location_svg from '../../../assets/images/createOrder_img/location.svg'
import { getCurrentDateTime } from '../../../common/commonTime.ts'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import Line from '../../ui/Line/Line.tsx'
import styles from './CreateOrderWorkers.module.scss'

const CreateOrderWorkersDemo: React.FC = () => {

	const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)

	return (
		<div className={styles.demo_container} style={{ display: 'flex', gap: 32, flexDirection: 'column', position: 'relative' }}>
			<div className='flex-column gap-small'>
				<span style={{ fontWeight: 800 }}>{dataWorkers.workersType.loader && 'Грузчики (от 2-x часов)'}</span>
				<span style={{ fontWeight: 800 }}>{dataWorkers.workersType.worker && 'Разнорабочие (от 8 часов + 1час обед) '}</span>
			</div>
			<div style={{ fontSize: '20px', fontWeight: '700' }}>{dataWorkers.taskName}</div>
			<span style={{ fontSize: '16px', fontWeight: '300', wordWrap: 'break-word' }}>{dataWorkers.description}</span>
			<FilesUploader />
			<Line lineWidth='100%' />
			<section style={{ display: 'flex', gap: 24 }}>
				<div style={{ marginBottom: '6px', fontSize: 16, fontWeight: 300 }}>Когда нужно приступить:</div>
				<span style={{ fontSize: '16px', fontWeight: '700' }}>{dataWorkers.when}</span>
				<div>
					<span style={{ fontSize: 16 }}>Время:</span>
					<span style={{ fontSize: '16px', fontWeight: '700' }}> {dataWorkers.time}</span>
				</div>
			</section>
			<section style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
				<div style={{ fontSize: 16, fontWeight: 300 }}>Адрес:</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '400' }}>
					<span style={{ fontSize: '16px', fontWeight: '700' }}>
						{dataWorkers.where}
					</span>
					<img src={location_svg} alt="location" /></div>
			</section>
			<Line lineWidth='100%' />
			<section style={{ display: 'flex', gap: 12 }}>
				<div style={{ marginBottom: '6px', fontWeight: 300, fontSize: 16 }}>Оплата:</div>
				{dataWorkers.payMethod === 'cash' && <span style={{ fontSize: '16px', fontWeight: '700' }}>На карту,напрямую к исполнителю</span>}
				{dataWorkers.payMethod === 'fromApp' && <span style={{ fontSize: '16px', fontWeight: '700' }}>Через приложение после выполнения работы исполнителем</span>}
				{dataWorkers.payMethod === 'cards' && <span style={{ fontSize: '16px', fontWeight: '700' }}>На расчетный счет исполнителя</span>}
			</section>
			<Line lineWidth='100%' />
			<section style={{ color: '#7099ED', fontWeight: '300', display: 'flex', gap: '8px' }}>
				<span style={{ fontSize: '16px', fontWeight: '300', color: '#8E8E93' }}> № 65625944</span>
				<span style={{ fontSize: '16px', fontWeight: '300', color: '#8E8E93' }}>{getCurrentDateTime()}</span>
			</section>
		</div>
	)
}

export default CreateOrderWorkersDemo
