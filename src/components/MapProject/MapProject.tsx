import React from 'react'
import Line from '../ui/Line/Line'
import styles from './MapProject.module.scss'
import MapChapter from './sections/MapChapter'
import MapMainSection from './sections/MapMainSection'

const MapProject: React.FC = () => {
	return (
		<div className={styles['mapProject_overlay']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 115 }}>
			<div className={styles['mapProject']}>
				<MapMainSection />
				<Line lineWidth='100%' />
				<MapChapter />
			</div>
		</div>
	)
}

export default MapProject
