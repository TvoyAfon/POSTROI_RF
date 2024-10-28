import React, { useState } from 'react'
import PageNameArrow from '../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../CategoryCardDetail.module.scss'
import { focusType, nofocusType } from '../styles/stylesCategoryCard'
import BuildExpertiseLeft from './sides/BuildExpertiseLeft'
import BuildExpertiseRight from './sides/BuildExpertiseRight'

const BuildExpertise: React.FC = () => {
	const [currentType, setCurrentType] = useState('1')

	return (
		<div className={styles['cardDetail_overlay']}>
			<div className={styles['cardDetail']}>
				<PageNameArrow
					style={{ position: 'absolute', left: 0, top: -50 }}
					pageName={(`строительно-техническая экспертиза и строительный контроль`).toUpperCase()}
					routeBack={'/'} />
				<div className={styles['cardDetail_type']}>
					<div
						style={currentType === '1' ? focusType : nofocusType}
						onClick={() => setCurrentType('1')}
						className={styles['cardDetail_type_expertise']}>
						<span >Судебная и независимая<br />
							строительно-техническая<br />
							экспертиза</span>
					</div>
					<div
						style={currentType === '2' ? focusType : nofocusType}
						onClick={() => setCurrentType('2')}
						className={styles['cardDetail_type_control']}>
						<span>Строительный <br />контроль</span>
					</div>
				</div>
				<div className={styles['cardDetail_mainContent']}>
					<BuildExpertiseLeft />
					<BuildExpertiseRight currentType={currentType}/>
				</div>
			</div>
		</div>
	)
}

export default BuildExpertise
