import { CSSProperties } from 'react'

export interface IButtonDefault {
	onClick: () => void,
	children: React.ReactNode,
	style?: CSSProperties
}

export interface IShowContacts {
	telephone?: 'string',
	email?: 'string'
}