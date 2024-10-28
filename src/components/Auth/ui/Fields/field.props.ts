import { Dispatch, SetStateAction } from 'react'
import { IFieldProps } from '../../../ui/Field/Field'

export interface IField extends IFieldProps {
	onChangeValue?: (value: string) => void
	onFormatError?: (isError: boolean) => void
	placeholder?: string,
	autoComplete?: string,
	setIsExistUser?: Dispatch<SetStateAction<boolean>>
}