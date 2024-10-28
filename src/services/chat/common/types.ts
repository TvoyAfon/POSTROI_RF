import { IMessage } from "../../../components/Chat/ChatComponents/Conversation/Messages/types"
import { IUserInfo } from "../../auth/common/types"

export type ChatType = 'personal' | 'group'

export type MemberStatusLink = 'open' | 'active' | 'done' | 'archive'

export interface ChatBase {
    type_n: 'orders' | 'services' | 'announce'
    type_number: number
    status: MemberStatusLink
    member_owner_id: number
    member_id?: number | null
    load_status: 'I' | 'U' | 'D'
}

export interface ChatItem extends ChatBase {
    is_online?: boolean
    chat_id: number
    chat_type: ChatType
    last_message: IMessage | null
    chat_members: number[]
    unread_count: number
    group_name?: string | null
    project_id?: number | null
    is_notifications_disabled: boolean
    status_link: MemberStatusLink
    members: IUserInfo[]
    user_owner: IUserInfo
    user_member?: IUserInfo
    chat_color?: string
}

export interface CreateGroupScheme extends Omit<ChatBase, 'member_id' | 'load_status'> {
    invited_users_ids: number[]
    group_name: string
    member_id?: null
    load_status?: null
    group_color: string
    project_id?: number
}

export interface ChatsIds {
    chats_ids: number[]
}

export interface CreateChatResponse {
    chat_id: number
}

export interface GetMyContactsResponse {
    contacts: IUserInfo[]
}

export interface AddToChatScheme {
    chat_id: number
    contact_ids: number[]
}

export interface UploadFileResponse {
    urls: string[]
}

export interface IGetMessagesResponse {
    messages: IMessage[]
}

export interface ChatsListSchema {
    limit?: number
    page?: number
}

export interface MessagesListSchema extends ChatsListSchema {
    chat_id: number
}

export interface SendMessageSchema {
    chat_id: number
    destination_id?: number
    message_text: string
    reply_id?: number
    forward_id?: number
    client_message_pending_id?: number
    files?: File[]
}

export interface SendMessageRequestOut {
    message_id: number

}