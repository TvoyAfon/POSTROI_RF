import React, { useState } from 'react'
import indikator_svg from '../../../../../assets/images/other/indikator_zakas.svg'
import settings from '../../../../../assets/images/other/settings-dark.svg'
import CardOrderUser from '../../../../SearchOrder/CardOrderInfo/CardOrderUser/CardOrderUser'
import styles from '../../OrderProject.module.scss'
import ParticipantPopup from './ParticipantPopup'

const ProjectParticipantCard: React.FC = () => {

	const [openPopup, setOpenPopup] = useState(false)

	return (
		<div className={styles['participantCard']}>
			<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
				<img src={indikator_svg} alt="indik" />
				<CardOrderUser  />
			</div>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<span style={{ color: "#7099ED" }}>Штукатур</span>
				<img onClick={() => setOpenPopup(!openPopup)} style={{ cursor: 'pointer' }} src={settings} alt="" />
			</div>
			{openPopup && <ParticipantPopup />}
		</div>
	)
}

export default ProjectParticipantCard
