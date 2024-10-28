import { CSSProperties } from 'react'

export interface ITextArea {
	placeholder?: string,
	style?: CSSProperties,
	value?: string,
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	disabled?: boolean
	name?: string
}

export interface ITextAreaProps {
	placeholder?: string,
	style?: CSSProperties,
	value?: string,
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
	disabled?: boolean,
	name?: string
}