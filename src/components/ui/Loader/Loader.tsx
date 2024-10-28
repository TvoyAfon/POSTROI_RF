import React, { CSSProperties } from 'react'
import loader_png from '../../../assets/images/other/Loader.png'
import styles from './Loader.module.scss'

interface ILoader {
	color?: string
	useOnlyIcon?: boolean
	style?: CSSProperties
	text?: string,
	textStyle?: CSSProperties
}

const Loader: React.FC<ILoader> = ({ color = '#262626', style, useOnlyIcon = false, text = 'Подождите...', textStyle }) => {
	return (
		<div className={styles.loader} style={style}>
			{
				!useOnlyIcon
				&&
				<span style={{ fontSize: 16, fontWeight: 500, color, ...textStyle }}>
					{text}
				</span>
			}
			<img className={styles.loader_img} src={loader_png} alt="loader" />
		</div>
	)
}

export default Loader
