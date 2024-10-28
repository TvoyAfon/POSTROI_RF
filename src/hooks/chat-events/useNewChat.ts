import { useDispatch, useSelector } from "react-redux"
import { IUserInfo } from "../../services/auth/common/types"
import { ChatItem } from "../../services/chat/common/types"
import { userService } from "../../services/user/user"
import { addChatList } from "../../store/slices/ChatSlice/ChatSlice"
import { RootState } from "../../store/store"

export const useNewChat = () => {
    const { chatList, lastUpdate } = useSelector((state: RootState) => state.chat)
    const dispatch = useDispatch()

    return async () => {
        if (!lastUpdate) return

        const data = lastUpdate.chat_data
        const { member_owner_id, member_id, chat_type, chat_members, members_ids } = data

        const userOwner = await userService.getInfo(member_owner_id)
        const chatMembers: IUserInfo[] = []
        let userMember: IUserInfo | undefined = undefined

        if (member_id) {
            userMember = await userService.getInfo(member_id)
        }

        if (!userOwner || (!userMember && chat_type === 'personal')) {
            return
        }

        const ids = chat_members || members_ids

        for (let i = 0; i < ids.length; i++) {
            const memberId = ids[i]
            const memberData = await userService.getInfo(memberId)

            if (!memberData) continue

            chatMembers.push(memberData)
        }

        const item: ChatItem = {
            ...data,
            user_owner: {
                ...userOwner,
                id: member_owner_id
            },
            user_member: member_id && userMember ? {
                ...userMember,
                id: member_id
            } : undefined,
            members: chatMembers
        }

        dispatch(addChatList([...chatList, item]))
    }
}