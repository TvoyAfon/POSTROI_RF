import { FC, HTMLAttributes } from 'react'
import styles from './Textarea.module.scss'

interface ITextarea extends HTMLAttributes<HTMLTextAreaElement> {
	placeholder?: string
	label?: string
	subLabel?: string
	name?: string,
	value?: string
}

const Textarea: FC<ITextarea> = ({
	className = '',
	children,
	label = '',
	subLabel = '',
	...props
}) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '32px',
		}}>
			{
				label
				&&
				<label style={{
					fontWeight: '700',
					fontSize: '16px',
					color: '#262626',
					marginRight: 'auto'
				}}>{label}</label>
			}
			{
				subLabel
				&&
				<label style={{
					fontSize: '16px',
					color: '#262626',
					marginRight: 'auto',
					marginTop: '16px'
				}}>{subLabel}</label>
			}
			<textarea className={`${styles.textarea} ${className}`} {...props}>
				{children}
			</textarea>
		</div>
	)
}

export default Textarea