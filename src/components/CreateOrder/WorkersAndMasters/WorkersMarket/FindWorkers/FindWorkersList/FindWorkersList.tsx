import React from 'react'
import FindWorkersCard from './FindWorkersCard'

const FindWorkersList: React.FC = () => {
	return (
		<div className='flex-column gap-medium-large' style={{ height: 450, overflowY: 'scroll' }}>
			<FindWorkersCard />
			<FindWorkersCard />
			<FindWorkersCard />
			<FindWorkersCard />
			<FindWorkersCard />
			<FindWorkersCard />
		</div>
	)
}

export default FindWorkersList
