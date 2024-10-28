import { CSSProperties } from 'react'

export interface IOrderFooter {
	children?: React.ReactNode,
	style?: CSSProperties,
	handleContinue: () => void,
	handleBack: () => void,
	loading: boolean
}