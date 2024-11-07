import { CHAT_SERVICE_URL } from "../../config/config"
import { sendAsync } from "../send-async"
import { URLConstructor } from "../url"
import { ChatItem, ChatsListSchema, CreateChatResponse, IChatExistSchema, ICreateChatSchema } from "./common/types"

class ChatService {
    url = new URLConstructor(`${CHAT_SERVICE_URL}/chat`)

    async getChat(chatId: number): Promise<ChatItem | undefined> {
        return await sendAsync('get', this.url.constructURL('', { chat_id: chatId }), {}, { useAuthorization: true })
    }

    async getUserChatsList(schema?: ChatsListSchema): Promise<ChatItem[] | undefined> {
        return await sendAsync('get', this.url.constructURL('get_user_chats_list', schema), {}, { useAuthorization: true })
    }

    async createChat(schema: ICreateChatSchema): Promise<CreateChatResponse | undefined> {
        return await sendAsync('post', this.url.constructURL('create_chat'), schema, {
            useAuthorization: true
        })
    }

    async chatExist(schema: IChatExistSchema): Promise<CreateChatResponse | undefined> {
        return await sendAsync('get', this.url.constructURL('chat_exist', schema), {}, {
            useAuthorization: true
        })
    }

    async deleteChat(chatId: number): Promise<CreateChatResponse | undefined> {
        return await sendAsync('delete', this.url.constructURL('', { chat_id: chatId }), {}, { useAuthorization: true })
    }
}

export const chatService = new ChatService()