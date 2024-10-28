import { FC, HTMLAttributes } from 'react'
import styles from './PopupMenu.module.scss'

const MenuItem: FC<HTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => {
	return (
		<button className={`${styles['menu-item']} ${className}`} {...props}>
			{children}
		</button>
	)
}

export default MenuItem