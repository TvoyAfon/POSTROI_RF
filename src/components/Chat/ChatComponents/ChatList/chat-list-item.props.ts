import { CSSProperties, ReactNode } from 'react'
import { ChatType } from '../../../../services/chat/common/types'
import { IChatItem } from './types'

export interface IChatListItem extends IChatItem {
	avatarStyle?: CSSProperties
	rightComponent?: ReactNode
	chatType?: ChatType
	style?: CSSProperties
	isClickable?: boolean
	selected?: boolean
	isGroup?: boolean
	isOnline?: boolean
	noLastMessageText?: string
	onClick?: () => void
	isNotificationsDisabled?: boolean
	chatColor?: string
	hasSelection?: boolean
}