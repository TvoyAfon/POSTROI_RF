import { CSSProperties, Dispatch, SetStateAction } from 'react'

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