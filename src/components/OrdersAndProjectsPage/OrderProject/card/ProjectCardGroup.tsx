import React from 'react'
import img_group from '../../../../assets/images/other/img_group.png'
import settings from '../../../../assets/images/other/settings-dark.svg'
import { getHoursMin } from '../../../../common/commonTime'
import styles from '../OrderProject.module.scss'

const ProjectCardGroup: React.FC = () => {
	return (
		<div className={styles['projectCardGroup']}>
			<img style={{ width: 76, height: 76 }} src={img_group} alt="img" />
			<div style={{ padding: '16px 16px 16px 8px', display: 'flex', gap: 55 }}>
				<div className='flex-column gap-small'>
					<span style={{ fontWeight: 600 }}>Основной</span>
					<span style={{ whiteSpace: 'nowrap' }}>7 участников</span>
				</div>
				<div style={{ justifyContent: 'center' }} className='flex-column gap-small'>
					<span style={{ fontSize: 10 }}>{getHoursMin()}</span>
					<div className={styles['projectCardGroup_count']}>
						2
					</div>
				</div>
				<img style={{ cursor: 'pointer' }} src={settings} alt="" />
			</div>
		</div>
	)
}

export default ProjectCardGroup
