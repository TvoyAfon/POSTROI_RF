import { ChangeEvent, FC, useState } from 'react'
import Field from '../../../ui/Field/Field'
import { isValidPhoneNumber } from '../../utils/validation'
import { IField } from './field.props'

const PhoneField: FC<IField> = ({ onChangeValue, onFormatError, autoComplete, onKeyDown, ...props }) => {

	const [phoneNumber, setPhoneNumber] = useState<string>('+7')

	const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
		let valuePhone = e.target.value.replace(/\D/g, '')
		if (valuePhone.length >= 1) { if (valuePhone.slice(0, 2) !== "+7") { valuePhone = "+7" + valuePhone.slice(1) } }

		const isValid = isValidPhoneNumber(valuePhone)

		if (!isValid && valuePhone.length !== 13) {

			onFormatError && onFormatError(true)
		}

		else {

			onFormatError && onFormatError(false)
		}

		if (valuePhone.length < 13)
			setPhoneNumber(valuePhone)
		onChangeValue && onChangeValue(valuePhone)
	}

	return (
		<>
			<Field autoComplete={autoComplete} onKeyDown={onKeyDown} onChange={handleChangePhone} value={phoneNumber} placeholder='Номер телефона' {...props} />
		</>
	)
}

export default PhoneField