import React from 'react'
import { useModal } from '../../../hooks/useModal'
import ForeignMastersMarket from './ForeignMastersMarket/ForeignMastersMarket'
import MastersMarket from './MastersMarket/MastersMarket'
import styles from './WorkersAndMaterials.module.scss'
import WorkersForm from './WorkersMarket/WorkersForm'
import WorkersMarket from './WorkersMarket/WorkersMarket'

const WorkersAndMasters: React.FC = () => {
	const { handleClose, handleOpen, isOpen } = useModal()
	return (
		<>
			{isOpen && <WorkersForm onClose={handleClose} />}
			<div className={styles.workersAndMasters}>
				<div className={styles.workersAndMasters_container}>
					<WorkersMarket onOpen={handleOpen} />
					<MastersMarket />
					<ForeignMastersMarket />
				</div>
			</div>
		</>
	)
}

export default WorkersAndMasters
