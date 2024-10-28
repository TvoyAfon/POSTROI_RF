import AllContactsPopup from './AllContactsPopup'
import { FiltersNotificationsKeys, FiltersTypes } from './filters.enum'

export const filters = [
	{
		name: "Все контакты",
		key: FiltersTypes.ALL_CONTACTS,
		rightComponent: AllContactsPopup,
		notificationKey: FiltersNotificationsKeys.CHATS
	},
	{
		name: "Группы",
		key: FiltersTypes.GROUPS,
		notificationKey: FiltersNotificationsKeys.GROUPS
	},
	{
		name: "Проекты",
		key: FiltersTypes.PROJECTS,
		notificationKey: FiltersNotificationsKeys.PROJECTS
	},
	{
		name: "Архив",
		key: FiltersTypes.ARCHIVES,
		notificationKey: FiltersNotificationsKeys.ARCHIVES
	}
]