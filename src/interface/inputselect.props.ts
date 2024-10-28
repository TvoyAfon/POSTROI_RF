export interface IInputSelect {
	value?: string,
	placeholder?: string,
	onChange?: () => void,
	width?: string,
	children?: React.ReactNode,
	bg?: string
}

export interface IInputSelectPopup extends IInputSelect {
	children?: React.ReactNode
}