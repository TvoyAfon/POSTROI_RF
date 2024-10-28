import React, { CSSProperties } from 'react'
import styles from './PhotoLoader.module.scss'
const PhotoLoader: React.FC<{ style?: CSSProperties, handleAddFiles: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ style, handleAddFiles }) => {
	return (
		<label style={style} htmlFor='photoLoader' className={styles.photoLoader}>
			<input onChange={handleAddFiles} id='photoLoader' type="file" />
		</label>
	)
}

export default PhotoLoader
