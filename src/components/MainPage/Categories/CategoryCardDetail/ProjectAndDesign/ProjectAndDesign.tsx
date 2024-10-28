import React, { useState } from 'react'
import PageNameArrow from '../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../CategoryCardDetail.module.scss'
import { focusType, nofocusType } from '../styles/stylesCategoryCard'
import ProjectAndDesignLeft from './sides/ProjectAndDesignLeft'
import ProjectAndDesignRight from './sides/ProjectAndDesignRight'

const ProjectAndDesign: React.FC = () => {

	const [currentType, setCurrentType] = useState < 'Проектирование'| 'Дизайн'> ('Проектирование')


	return (
		<div className={styles['cardDetail_overlay']}>
			<div className={styles['cardDetail']}>
				<PageNameArrow
					style={{ position: 'absolute', left: 0, top: -50 }}
					pageName='ПРОЕКТИРОВАНИЕ И ДИЗАЙН'
					routeBack={'/'} />
				<div className={styles['cardDetail_type']}>
					<div
						style={currentType === 'Проектирование' ? focusType : nofocusType}
						onClick={() => setCurrentType('Проектирование')}
						className={styles['cardDetail_type_1']}>
						<span>Проектирование</span>
					</div>
					<div
						style={currentType === 'Дизайн' ? focusType : nofocusType}
						onClick={() => setCurrentType('Дизайн')}
						className={styles['cardDetail_type_2']}>
						<span>Дизайн</span>
					</div>
				</div>
				<div className={styles['cardDetail_mainContent']}>
					<ProjectAndDesignLeft currentType={currentType} />
					<ProjectAndDesignRight currentType={currentType} />
				</div>
			</div>
		</div>
	)
}

export default ProjectAndDesign
