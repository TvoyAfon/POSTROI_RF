import React from 'react'
import { IOnlyTextField } from '../../../interface/onlyTextField.props'

const OnlyTextField: React.FC<IOnlyTextField> = ({ onChange, value, placeholder, name }) => {
	return (
		<input placeholder={placeholder} name={name} onChange={onChange} value={value} type="text" />
	)
}

export default OnlyTextField
