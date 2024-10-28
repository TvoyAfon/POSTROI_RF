import { IUserInfo } from "../../../../../services/auth/common/types"

export interface IMessage {
	message_id: number
	chat_id: number
	sender_id: number
	destination_id?: number
	reply_id?: number | null
	forward_message?: IMessage | null
	message_text: string
	docs_url: string
	sent_time: string
	is_read?: boolean
	read_time?: string | null

}

export interface IMessageWithSenderUser extends IMessage {
	sender_user?: IUserInfo
}

export interface IAttachment {
	filename: string
}