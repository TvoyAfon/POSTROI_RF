import { CSSProperties } from 'react'
import { AllOrderCards } from './categoryCard.props'


export interface ISearchOrderOverlay {
	children: React.ReactNode,
	style?: CSSProperties,
	className?: string,
	openMap?: boolean
}

export interface ICardOrderInfo {
	openMap?: boolean,
	onOpen?: () => void,
	style?: CSSProperties,
	userName?: string,
	lastVisit?: string,
	photoImg?: string,
	isShowType?: boolean,
	isMyCard?: boolean  /* Определяет моя это карточка или чужая */
	card?: AllOrderCards,
	img?: string,
	orderName?: string,
	task?: string,
	address?: string,
	category?: string,
	user_img?: string
}