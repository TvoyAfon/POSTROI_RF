import { IMessage } from "../Conversation/Messages/types"

export interface IChatItem {
	id?: number
	avatar?: string
	name?: string
	category?: UserCategory
	lastMessage?: IMessage | null,
	unreadCount?: number
}

export type Group = Omit<IChatItem, 'category'>

export type UserCategory = 'client' | 'executor' | 'ads'

export type UserCategoryFilter = 'all' | UserCategory

export const userCategories = {
	'all': {
		key: 'all',
		name: "",
		color: "",
		full: "Все контакты"
	},
	'client': {
		key: 'client',
		name: 'З',
		color: '#40B889',
		full: "Заказчики"
	},
	'executor': {
		key: 'executor',
		name: 'И',
		color: '#7099ED',
		full: "Исполнители"
	},
	'ads': {
		key: 'ads',
		name: "О",
		color: '#8E8E93',
		full: "Объявления"
	}
}