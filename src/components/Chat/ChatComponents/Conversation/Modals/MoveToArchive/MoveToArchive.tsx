import { FC, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { chatSettingsService } from '../../../../../../services/chat/chat-settings'
import { RootState } from "../../../../../../store/store"
import Button from "../../../../../ui/Button/Button"
import Loader from "../../../../../ui/Loader/Loader"
import BaseModal from "../../../../../ui/Modal/BaseModal"
import { IModalProps } from '../props'

const MoveToArchive: FC<IModalProps> = ({ isOpen, onClose }) => {
    const { selectedChatId, chatList } = useSelector((state: RootState) => state.chat)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const chatData = useMemo(() => chatList.find(chat => chat.chat_id === selectedChatId), [chatList])
    const isExtract = chatData?.status_link === 'archive'

    const handleMoveToArchive = async () => {
        if (!selectedChatId) return

        try {
            setIsLoading(true)

            await chatSettingsService.moveToArchive(selectedChatId)
        } catch (error) {

        } finally {
            setIsLoading(false)
            onClose && onClose()
        }
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column', gap: '32px',
                width: '436px',
                textAlign: 'center'
            }}>
                <span style={{
                    fontWeight: 600,
                    fontSize: '20px',
                    textTransform: 'uppercase'
                }}>
                    {
                        isExtract
                            ? 'Вернуть чат из архива?'
                            : 'Перенести чат в архив?'
                    }
                </span>
                <div style={{
                    display: 'flex',
                    gap: '32px',
                    justifyContent: 'center'
                }}>
                    <Button onClick={onClose} variant='orange' style={{
                        width: '170px',
                        fontSize: '14px',
                        fontWeight: 400
                    }}>
                        Отмена
                    </Button>
                    <Button onClick={handleMoveToArchive} style={{
                        width: '170px',
                        fontSize: '14px',
                        fontWeight: 400
                    }}>
                        {
                            isLoading
                                ?
                                <Loader color="#fff" />
                                : isExtract ? "Вернуть" : 'Перенести'
                        }
                    </Button>
                </div>
            </div>
        </BaseModal>
    )
}

export default MoveToArchive