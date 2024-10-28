import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import ChatsListController from './chats-list.controller'
import MessagesController from './messages.controller'

export const useChatControllers = () => {
	const chat = useSelector((state: RootState) => state.chat)
	const dispatch = useDispatch()

	return {
		chatsListController: new ChatsListController(dispatch, chat),
		messagesController: new MessagesController(dispatch, chat)
	}
}