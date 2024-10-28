import { FC } from 'react'
import ReactCodeInput, { ReactCodeInputProps } from 'react-code-input'
import styles from './CodeInput.module.scss'

const CodeInput: FC<ReactCodeInputProps> = ({ inputStyle,onChange,placeholder, fields = 6, ...props }) => {
	return (
		<div className={styles.authRegisterPhone_input} >
			<ReactCodeInput onChange={onChange} placeholder={placeholder} type='number' fields={fields} inputStyle={{
				width: '66px',
				height: '80px',
				borderRadius: '8px',
				backgroundColor: '#F4F3F1',
				fontSize: '28px',
				marginLeft: '10px',
				justifyContent: 'center',
				...inputStyle
			}} {...props} />
		</div>
	)
}

export default CodeInput