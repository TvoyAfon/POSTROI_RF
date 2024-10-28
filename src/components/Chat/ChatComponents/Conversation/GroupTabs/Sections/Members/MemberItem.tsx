import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { IUserInfo } from "../../../../../../../services/auth/common/types";
import { ChatItem } from "../../../../../../../services/chat/common/types";
import { RootState } from "../../../../../../../store/store";
import ChatListItem from "../../../../ChatList/ChatListItem";

interface IMemberItem {
    member: IUserInfo;
    chatData: ChatItem;
}

const MemberItem: FC<IMemberItem> = ({
    member,
    chatData
}) => {
    const { chatList } = useSelector((state: RootState) => state.chat);

    const isMemberOnline = useMemo(() => {
        return chatList.find(chat => chat.chat_members.includes(member.id) && chat.chat_type !== 'group')?.is_online
    }, [chatList, member]);

    return (
        <ChatListItem
            noLastMessageText={isMemberOnline ? 'На сайте' : 'Был недавно'}
            lastMessage={null}
            isClickable={false}
            avatar={member.profile_photo}
            name={`${member.first_name}`}
            unreadCount={0}
            isOnline={isMemberOnline}
            id={0}
            rightComponent={
                <span style={{
                    marginTop: '5px',
                    color: member.id === chatData.member_owner_id ? '#7099ED' : '#262626',
                    fontWeight: 300
                }}>{member.id === chatData.member_owner_id ? 'Владелец' : 'Участник'}
                </span>
            } />
    )
}

export default MemberItem