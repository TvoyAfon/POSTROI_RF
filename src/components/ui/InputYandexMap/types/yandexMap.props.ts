import { CSSProperties } from 'react'
import { IOrderFullInfo } from '../../../../services/order/types/types'

export interface IYandexMap {
	styleContainer?: CSSProperties,
	isYandexMapForOrders?: boolean,
	handleClickMarker?: (order: IOrderFullInfo, orderId: number) => void,
	selectedId?: number
}