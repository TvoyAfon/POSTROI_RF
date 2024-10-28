import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import replyIcon from '../../../../../../assets/images/chat_images/arrow-move-up-left.svg'
import { addReplyId } from '../../../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../../../store/store'
import CloseButton from '../../../../../ui/CloseButton/CloseButton'
import styles from './ReplyPanel.module.scss'

const ReplyPanel = () => {
    const {
        replyId,
        selectedChatId,
        messages,
        chatList
    } = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();

    const messageData = useMemo(() => messages.find(m => m.message_id === replyId), [messages, replyId, selectedChatId]);
    const chatData = useMemo(() => chatList.find(c => c.chat_id === selectedChatId), [chatList, selectedChatId]);
    const senderData = useMemo(() => chatData?.members?.find(m => m.id === messageData?.sender_id), [chatData, messageData])

    return (
        <div className={styles.panel}>
            <div className={styles['panel__left-icon']}>
                <img
                    src={replyIcon}
                    alt=""
                    width='20'
                    height='20'
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '6px 8px 6px 0px',
                gap: '10px',
                width: '70%'
            }}>
                <span style={{
                    fontWeight: 700
                }}>Ответ {senderData?.first_name}</span>
                <span style={{
                    overflow: 'hidden',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }}>{
                        !messageData?.message_text && messageData?.docs_url
                            ? <i>Файл</i>
                            : messageData?.message_text
                    }
                </span>
            </div>
            <CloseButton onClick={() => dispatch(addReplyId(null))} style={{
                marginRight: '5px',
                marginTop: '5px',
                marginLeft: 'auto'
            }} />
        </div>
    )
}

export default ReplyPanel