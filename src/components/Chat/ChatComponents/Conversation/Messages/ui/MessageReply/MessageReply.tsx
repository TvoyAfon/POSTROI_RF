import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IUserInfo } from "../../../../../../../services/auth/common/types"
import { userService } from "../../../../../../../services/user/user.service"
import { RootState } from "../../../../../../../store/store"
import conversationStyles from '../../../Conversation.module.scss'
import Files from '../../Files/Files'
import { IMessageWithSenderUser } from "../../types"
import styles from './MessageReply.module.scss'

interface IMessageReply {
    isForward?: boolean
    messageData: IMessageWithSenderUser
}

const MessageReply: FC<IMessageReply> = ({
    isForward = false,
    messageData
}) => {
    const nav = useNavigate()
    const [senderUser, setSenderUser] = useState<IUserInfo | null>(null)
    const { messagesRefsMap } = useSelector((state: RootState) => state.chat)

    const toProfile = () => {
        if (!senderUser) return
        nav(`/profile/${messageData.sender_id}`)
    }

    const handleNavigateToMessage = () => {
        const messageRef = messagesRefsMap.find(ref => ref.messageId === messageData.message_id)

        if (!messageRef || !messageRef.ref.current) {
            return
        }

        messageRef.ref.current.scrollIntoView({ behavior: 'smooth' })

        const _class = conversationStyles['conversation__message-item__selected']

        messageRef.ref.current.classList.add(_class)

        setTimeout(() => {
            messageRef.ref.current?.classList.remove(_class)
        }, 3000)
    }

    useEffect(() => {
        if (!isForward) return;

        (async () => {
            try {
                const result = await userService.getInfo(messageData.sender_id)
                if (!result) return

                setSenderUser(result)
            } catch (error) { }
        })()

    }, [messageData, isForward])

    return (
        <>
            {
                isForward
                &&
                <span
                    style={{
                        color: '#7099ED',
                        fontWeight: 700,
                        cursor: senderUser ? 'pointer' : 'default'
                    }}
                    onClick={toProfile}
                >
                    Переслано от {senderUser?.first_name || 'Удалённый аккаунт'}
                </span>
            }
            <div className={styles.reply} onClick={handleNavigateToMessage}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginLeft: '16px'
                }}>
                    <span
                        onClick={toProfile}
                        style={{
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        {messageData.sender_user?.first_name}
                    </span>
                    {
                        messageData.docs_url
                        &&
                        <Files filesLinks={messageData.docs_url.split('|')} />
                    }
                    <span style={isForward ? {} : {
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        width: '100%',
                        display: 'block'
                    }}>
                        {messageData.message_text}
                    </span>
                </div>

            </div>
        </>

    )
}

export default MessageReply