import { CSSProperties } from 'react'

export interface ICategory {
	name: string
	className: string
	divWidth?: string
	images: IImage[]
}

export interface IImage {
	className?: string
	source: string
	style?: CSSProperties
}