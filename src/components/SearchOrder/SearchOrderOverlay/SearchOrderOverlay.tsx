import React from 'react'
import { ISearchOrderOverlay } from '../../../interface/searchOrderOverlay.props'
import styles from './SearchOrderOverlay.module.scss'

const SearchOrderOverlay: React.FC<ISearchOrderOverlay> = ({ children, style }) => {
	return (
		<div style={style} className={styles.overlay_container}
		>
			{children}
		</div>
	)
}

export default SearchOrderOverlay
