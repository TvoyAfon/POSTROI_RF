import { ChangeEvent, FC, HTMLAttributes, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moreVertIcon from '../../../../../../assets/images/chat_images/more-vertical.svg'
import { usePopup } from '../../../../../../hooks/usePopup'
import { addReplyId } from '../../../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../../../store/store'
import ErrorSignature from '../../../../../Auth/ui/ErrorSignature'
import Field from '../../../../../ui/Field/Field'
import IconButton from "../../../../../ui/IconButton/IconButton"
import MenuItem from '../../../../../ui/PopupMenu/MenuItem'
import PopupMenu from '../../../../../ui/PopupMenu/PopupMenu'
import { getDestinationId } from '../../../../utils/utils'
import { useSendMessage } from '../../../ChatList/hooks/useSendMessage'
import EmojiButton from '../../ui/EmojiButton'
import EmojiPopup from '../../ui/EmojiPopup'
import ChatMultiSelection from '../../ui/Modals/ChatMultiSelection/ChatMultiSelection'
import DeleteMessage from '../../ui/Modals/DeleteMessage'

interface IActionProps extends HTMLAttributes<HTMLDivElement> {
    isMessageOwner: boolean
    messageId: number
}

const Actions: FC<IActionProps> = ({ isMessageOwner, messageId, ...props }) => {
    const { anchorEl, handleToggle, triggerClassName, isOpen, handleClose } = usePopup()
    const { messages, isFullScreen, chatList, selectedChatId } = useSelector((state: RootState) => state.chat)
    const { user } = useSelector((state: RootState) => state.auth)
    const [quote, setQuote] = useState<string>('')
    const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false)
    const [isQuoteEmpty, setIsQuoteEmpty] = useState<boolean>(false)
    const [isForwardModalOpen, setIsForwardModalOpen] = useState<boolean>(false)
    const [isMessageDeleteOpen, setIsMessageDeleteOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const send = useSendMessage()

    const message = useMemo(() => messages.find(msg => msg.message_id === messageId), [messages, messageId])

    const handleClick = (callback: () => void) => {
        callback()
        handleClose()
    }

    const handleCopyMessageText = () => {
        if (!message) {
            return
        }

        return window.navigator.clipboard.writeText(message.message_text)
    }

    const items = useMemo(() => {
        const baseItems = [
            {
                name: "Ответить",
                onClick: () => handleClick(() => dispatch(addReplyId(messageId)))
            },
            {
                name: "Скопировать",
                onClick: () => handleClick(handleCopyMessageText)
            },
            {
                name: "Переслать",
                onClick: () => handleClick(() => setIsForwardModalOpen(true))
            }
        ]

        if (isMessageOwner) {
            baseItems.push({
                name: "Удалить",
                onClick: () => handleClick(() => setIsMessageDeleteOpen(true))
            })
        }

        return baseItems
    }, [isMessageOwner])

    const top = useMemo(() => {
        const resultTop = anchorEl?.getClientRects().item(0)?.top || 0
        return `${isFullScreen ? resultTop : resultTop - 400}px`
    }, [anchorEl])

    const handleForwardMessage = async (chatId: number) => {
        if (!user?.id) return
        if (!quote.trim()) {
            return setIsQuoteEmpty(true)
        }

        const chatInfo = chatList.find(chat => chat.chat_id === chatId)
        if (!chatInfo) return

        const destinationId = getDestinationId(user?.id, chatInfo?.user_owner, chatInfo?.user_member)

        await send(
            {
                chat_id: chatId,
                destination_id: destinationId || undefined,
                message_text: quote,
                forward_id: messageId
            },
            selectedChatId === chatId,
            () => {
                setQuote('')
                setIsForwardModalOpen(false)
            },
            message
        )
    }

    const handleChangeQuote = (e: ChangeEvent<HTMLInputElement>) => {
        setQuote(e.target.value)
        setIsQuoteEmpty(false)
    }

    return (
        <div style={{
            position: 'relative'
        }} {...props}>
            {
                isForwardModalOpen
                &&
                <ChatMultiSelection
                    isOpen={isForwardModalOpen}
                    onClose={() => setIsForwardModalOpen(false)}
                    onChange={handleForwardMessage}
                >
                    <>
                        <div style={{
                            width: '100%',
                            position: 'relative'
                        }}>
                            <Field
                                placeholder='Цитировать'
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: '1px solid #8E8E93',
                                    fontSize: '16px'
                                }}
                                value={quote}
                                onChange={handleChangeQuote}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                {
                                    isEmojiOpen && <EmojiPopup setMessageText={setQuote} onClose={() => setIsEmojiOpen(false)} />
                                }
                            </div>
                            <EmojiButton
                                setIsEmojiOpen={setIsEmojiOpen}
                                isEmojiOpen={isEmojiOpen}
                            />
                        </div>
                        {
                            isQuoteEmpty
                            &&
                            <ErrorSignature style={{
                                marginTop: '15px'
                            }}>
                                Пожалуйста, процитируйте сообщение
                            </ErrorSignature>
                        }
                    </>

                </ChatMultiSelection>
            }
            <DeleteMessage
                messageId={message?.message_id}
                isOpen={isMessageDeleteOpen}
                onClose={() => setIsMessageDeleteOpen(false)}
            />
            <IconButton
                className={triggerClassName}
                onClick={handleToggle}
                title='Открыть меню действий с сообщением'
                icon={moreVertIcon}
                style={{
                    background: '#F4F3F1',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                imgStyle={{
                    width: '15px',
                    height: '15px',
                    marginTop: '1px'
                }}
            />
            <PopupMenu
                onClose={handleClose}
                useOutsideClose
                isOpen={isOpen}
                anchorEl={anchorEl}
                triggerClassName={triggerClassName}
                left={150}
                style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    top,
                    padding: '20px',
                    borderRadius: '8px'
                }}
            >
                {
                    items.map((item, index) => (
                        <MenuItem key={index} onClick={item.onClick}>
                            {item.name}
                        </MenuItem>
                    ))
                }
            </PopupMenu>

        </div>
    )
}

export default Actions