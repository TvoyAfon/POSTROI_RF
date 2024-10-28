import { CSSProperties, FC, ReactNode } from 'react'
import styles from './Tabs.module.scss'

interface ITab {
	isSelected?: boolean
	children: ReactNode
	style?: CSSProperties
	onClick?: () => void
	variant?: string
}

const Tab: FC<ITab> = ({ isSelected = false, children, style = {}, onClick, variant = 'classic' }) => {
	return (
		<div className={`${styles.tab} ${styles[`tab__${variant}`]} ${isSelected ? styles[`tab__${variant}-selected`] : ''}`} style={style} onClick={onClick}>
			{children}
		</div>
	)
}

export default Tab