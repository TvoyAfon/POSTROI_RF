import { FC, ReactNode } from "react"
import { useSelector } from "react-redux"
import moreVertIcon from '../../../../../../../assets/images/chat_images/more-vertical.svg'
import { RootState } from "../../../../../../../store/store"
import CloseButton from "../../../../../../ui/CloseButton/CloseButton"
import IconButton from "../../../../../../ui/IconButton/IconButton"
import BaseModal from "../../../../../../ui/Modal/BaseModal"
import SearchField from "../../SearchField"
import ChatItemElement from './ChatItem'

interface IChatMultiSelection {
    onChange: (chatId: number) => void
    isOpen: boolean
    onClose?: () => void
    children?: ReactNode
}

const ChatMultiSelection: FC<IChatMultiSelection> = ({
    onChange,
    isOpen,
    onClose,
    children
}) => {
    const { chatList } = useSelector((state: RootState) => state.chat)

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '400px',
                textAlign: 'center'
            }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#231F20'
                    }}>Переслать сообщение</span>
                    <div style={{
                        display: 'flex',
                        gap: '16px'
                    }}>
                        <IconButton
                            icon={moreVertIcon}
                        />
                        <CloseButton onClick={onClose} style={{
                            marginTop: '-4px'
                        }} />
                    </div>
                </header>
                <SearchField style={{
                    width: '100%'
                }} />
                {
                    chatList.map(chat => (
                        <ChatItemElement
                            key={chat.chat_id}
                            {...chat}
                            onChange={onChange}
                        />
                    ))
                }
                {children}
            </div>
        </BaseModal>
    )
}

export default ChatMultiSelection