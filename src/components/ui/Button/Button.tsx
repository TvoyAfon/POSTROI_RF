import { FC, forwardRef, HTMLAttributes, LegacyRef } from 'react'
import styles from './Button.module.scss'

export interface IButton extends HTMLAttributes<HTMLButtonElement> {
	icon?: string
	variant?: string
	type?: "submit" | "button" | "reset"
	disabled?: boolean,
	rightIcon?: string,
	ref?: LegacyRef<HTMLButtonElement>,
}

const Button: FC<IButton> = forwardRef<HTMLButtonElement, IButton>(({
	className = '',
	type = 'submit',
	style = {},
	onClick,
	children,
	icon,
	variant = 'classic',
	disabled,
	rightIcon,
	...props
}, ref) => {
	return (
		<button
			disabled={disabled}
			ref={ref}
			type={type}
			className={`${className} ${styles.button} ${styles[`button__${variant}`]}`} style={style}
			onClick={onClick} {...props}>
			{icon && <img src={icon} alt="" className={styles['button__icon']} />}
			{children}
			{rightIcon && <img src={rightIcon} alt="" className={styles['button__icon']} />}
		</button>
	)
})

export default Button