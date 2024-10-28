import { IUserInfo } from "../../../services/auth/common/types"
import { chatService } from "../../../services/chat/chat"
import { ChatItem, ChatsListSchema } from "../../../services/chat/common/types"
import { userService } from "../../../services/user/user"

export function getChatApponentFromData(owner: IUserInfo, userId: number, member?: IUserInfo) {
    return member?.id === userId ? owner : member
}

export function getChatApponentFromIDs(memberId: number, ownerId: number, userId: number) {
    return memberId === userId ? ownerId : memberId
}

export async function getChats(schema: ChatsListSchema) {
    const chats = await chatService.getUserChatsList(schema)
    if (!chats) return

    const membersMapping: Record<number, IUserInfo> = {}
    const resultChats: ChatItem[] = []

    for (const chat of chats) {
        const members: IUserInfo[] = []

        for (const memberId of chat.chat_members) {
            const member = membersMapping[memberId]
            if (member) {
                members.push(membersMapping[memberId])
                continue
            }

            try {
                const response = await userService.getInfo(memberId)
                if (!response) continue
                membersMapping[memberId] = response
                members.push(response)
            } catch (error) {
                chat.chat_members = chat.chat_members.filter(id => id !== memberId)
                continue
            }
        }

        const chatItem: ChatItem = {
            ...chat,
            user_owner: {
                ...membersMapping[chat.member_owner_id],
                id: chat.member_owner_id
            },
            user_member: chat.member_id ? {
                ...membersMapping[chat.member_id],
                id: chat.member_id
            } : undefined,
            members
        }

        resultChats.push(chatItem)
    }

    return resultChats
}

export function getProjectGroupName(projectName?: string, groupName?: string) {
    return `${projectName} > ${groupName}`
}