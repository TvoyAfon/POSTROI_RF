import { CSSProperties } from 'react'


export interface ISearchInput {
	inputRef?: React.MutableRefObject<HTMLInputElement | null>,
	placeholder?: string
}

export interface ISearchOrderInput {
	placeholder?: string,
	value?: string,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	width?: number,
	style?: CSSProperties
}