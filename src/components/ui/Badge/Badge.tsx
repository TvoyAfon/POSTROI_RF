import { CSSProperties, FC } from 'react'
import styles from './Badge.module.scss'

interface IBadge {
	content?: string
	style?: CSSProperties
	className?: string
	title?: string
	isDisabled?: boolean
	contentStyle?: CSSProperties
}

const Badge: FC<IBadge> = ({ content = '', style = {}, className = '', title, isDisabled, contentStyle }) => {
	return (
		<div
			title={title}
			className={`${styles.badge} ${isDisabled ? styles['badge__disabled'] : ''} ${className}`}
			style={style}
		>
			<span
				className={styles['badge__content']}
				style={contentStyle}
			>
				{content}
			</span>
		</div>
	)
}

export default Badge