import { CSSProperties } from 'react'


export interface IUserLocationMap {
	isOpenSearchOrderMap?: boolean
	height?: number | string,
	style?: CSSProperties,
	width?: number | string,
	onCitiesChange: (citiesByCoords: string) => void
}