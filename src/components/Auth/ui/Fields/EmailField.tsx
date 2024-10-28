import { ChangeEvent, FC, useState } from 'react'
import Field from '../../../ui/Field/Field'
import { isValidEmailAddress } from '../../utils/validation'
import { IField } from './field.props'

const EmailField: FC<IField> = ({ onChangeValue, onFormatError, setIsExistUser, onKeyDown, autoComplete, ...props }) => {
	const [email, setEmail] = useState<string>('')


	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		const addr = e.target.value
		setEmail(addr)
		onChangeValue && onChangeValue(addr)
		setIsExistUser && setIsExistUser(false)
		if (!isValidEmailAddress(addr)) {

			onFormatError && onFormatError(true)
		} else {

			onFormatError && onFormatError(false)
		}
	}

	return (
		<>
			<Field autoComplete={autoComplete} onKeyDown={onKeyDown} onChange={handleEmailChange} value={email} placeholder='@' {...props} />
		</>
	)
}

export default EmailField