
import { CSSProperties, SetStateAction } from 'react'
import { IOrderData } from './createOrder.props'

export interface IInputCalendar {
	value?: string,
	onChange?: (date: string, dateObjStart: Date, dateObjEnd: Date) => void,
	currentData?: IOrderData,
	dataValue?: string,
	style?: CSSProperties
}

export interface IInputAddress {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	value?: string,
	style?: CSSProperties,
	name?: string,
	setCurrentAddress?: React.Dispatch<SetStateAction<string>>
}
