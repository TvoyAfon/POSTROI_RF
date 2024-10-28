import { CSSProperties, FC, HTMLAttributes } from 'react'
import styles from './IconButton.module.scss'

interface IIconButton extends HTMLAttributes<HTMLButtonElement> {
	icon: string
	imgClassName?: string
	imgStyle?: CSSProperties
	type?: "button" | 'submit'
	style?: CSSProperties
}

const IconButton: FC<IIconButton> = ({ icon, className, imgClassName = '', imgStyle = {}, ...props }) => {
	return (
		<button className={`${styles.button} ${className}`} {...props}>
			<img src={icon} alt="" className={imgClassName} style={imgStyle} />
		</button>
	)
}

export default IconButton