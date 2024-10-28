import React from 'react'
import CardWorker from '../../CardWorkers/MyCardOrderWorkerDetail'

const MyOrderList: React.FC = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 556, overflowY: 'scroll' }}>
			<CardWorker />
			<CardWorker />
			<CardWorker />
		</div>
	)
}

export default MyOrderList
