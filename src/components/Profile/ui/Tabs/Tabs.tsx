import { CSSProperties, FC, ReactNode } from 'react'
import styles from './Tabs.module.scss'

interface ITabs {
	children: ReactNode
	style?: CSSProperties
}

const Tabs: FC<ITabs> = ({ children, style = {} }) => {
	return (
		<div className={styles.tabs} style={style}>
			{children}
		</div>
	)
}

export default Tabs