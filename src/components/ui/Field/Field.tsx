import { ChangeEventHandler, CSSProperties, FC, HTMLAttributes } from 'react'
import styles from '../../Auth/ui/Fields/PasswordField/PasswordField.module.scss'

export interface IFieldProps extends HTMLAttributes<HTMLInputElement> {
	placeholder?: string
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	name?: string
	label?: string
	variant?: 'square' | 'rounded',
	inputStyle?: CSSProperties,
	disabled?: boolean,
	textUnderInput?: string,
	gap?: string,
	autoComplete?: string,
	validationPhone?: boolean,
	validationOnlyText?: boolean,
	type?: string

}

const Field: FC<IFieldProps> = ({ className,
	placeholder,
	value,
	label = '',
	variant = 'square',
	inputStyle,
	onChange,
	validationPhone = false,
	validationOnlyText = false,
	disabled,
	name,
	textUnderInput,
	autoComplete,
	gap = 10,
	type,
	...props }) => {

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: gap,
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
			<>
				<input type={type} autoComplete={autoComplete} name={name} disabled={disabled} onChange={onChange} style={inputStyle} value={value} placeholder={placeholder} className={`${className} ${styles.field} ${styles[`field__${variant}`]}`} {...props} />
				<span style={{ fontSize: 14, color: 'gray' }}>{textUnderInput}</span>
			</>
		</div>
	)
}

export default Field