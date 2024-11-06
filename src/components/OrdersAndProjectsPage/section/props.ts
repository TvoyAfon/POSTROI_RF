import { RefObject } from 'react'
import { IOrderFullInfo } from '../../../services/order/types/types'

export interface ICardOrderInfo extends IOrderFullInfo {
	openMap: boolean
}

export interface IOrderSectionProps {
	sectionRef: RefObject<HTMLDivElement>
	searchQuery: string,
	isMyLoading?: boolean,
	isLoading?: boolean
}