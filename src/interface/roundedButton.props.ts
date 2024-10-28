import { CSSProperties, LegacyRef } from 'react'

export interface IRoundedButton {
	style?: CSSProperties,
	label?: string,
	handleContinue?: () => void,
	disabled?: boolean,
	onKeyDown?: (e: React.KeyboardEvent) => void,
	ref?: LegacyRef<HTMLButtonElement> | undefined
}