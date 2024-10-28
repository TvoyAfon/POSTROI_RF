import { useDispatch, useSelector } from 'react-redux'
import { SendMessageSchema } from '../../../../../services/chat/common/types'
import { messageService } from '../../../../../services/chat/message'
import { addMessages, addPendingMessages, addReplyId } from '../../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../../store/store'
import { convertDate } from '../../../../../utils/date'
import { IMessage } from '../../Conversation/Messages/types'

export const useSendMessage = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)
	const { replyId, messages, pendingMessages } = useSelector((state: RootState) => state.chat)

	return async (schema: SendMessageSchema, addPendingMessage: boolean = true, onClearField?: () => void, forwardMessagePayload?: IMessage) => {
		if (!user || !user.id) return

		const pendingId = Date.now()
		const { files, ...baseData } = schema

		let docsUrl = ''

		if (files) {
			docsUrl = files.map(file => `${URL.createObjectURL(file)}~${file.name}`).join('|')
		}

		const replyMessageId = replyId || schema.reply_id
		const pendingMessageSentTime = convertDate(new Date().toUTCString())

		const data: IMessage = {
			...baseData,
			sender_id: user.id,
			message_id: pendingId,
			docs_url: docsUrl,
			forward_message: forwardMessagePayload,
			reply_id: replyMessageId,
			sent_time: pendingMessageSentTime
		}

		if (addPendingMessage) {
			dispatch(addMessages([...messages, data]))
			dispatch(addPendingMessages([
				...pendingMessages, {
					messageId: pendingId,
					hasError: false
				}
			]))
		}

		try {
			onClearField && onClearField()
			dispatch(addReplyId(null))

			await messageService.sendMessage({
				...baseData,
				reply_id: replyMessageId,
				client_message_pending_id: pendingId,
				files: schema.files
			})
		}
		catch (error) {
			console.log('has send message error', error)
			dispatch(addPendingMessages([
				...pendingMessages, {
					messageId: pendingId,
					hasError: true
				}
			]))
		}
	}
}