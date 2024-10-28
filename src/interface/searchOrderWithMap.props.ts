import { CSSProperties, Dispatch, SetStateAction } from 'react'

export interface ISearchOrderWithMap {
	handleOpenMap: () => void,
	setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>,
	setOpenMap: React.Dispatch<React.SetStateAction<boolean>>,
	setOpenSearchOrderMap: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISearchOrderHeader {
	openMap: boolean,
	searchRadius: number,
	city: string,
	setOpenSearchOrderMap: Dispatch<SetStateAction<boolean>>,
	setOpenMap: Dispatch<SetStateAction<boolean>>,
	handleOpenMap: () => void,
}

export interface ICityAndRadius {
	openMap?: boolean,
	setOpenSearchOrderMap?: Dispatch<React.SetStateAction<boolean>>
	style?: CSSProperties
}