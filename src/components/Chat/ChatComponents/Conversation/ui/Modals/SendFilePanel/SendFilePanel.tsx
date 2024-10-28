import { ChangeEvent, Dispatch, FC, SetStateAction, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FILES_FORMATS_ACCEPT, MAX_FILES_LENGTH } from '../../../../../../../config/config'
import { RootState } from '../../../../../../../store/store'
import Button from '../../../../../../ui/Button/Button'
import Field from '../../../../../../ui/Field/Field'
import BaseModal from '../../../../../../ui/Modal/BaseModal'
import { getDestinationId } from '../../../../../utils/utils'
import { useSendMessage } from '../../../../ChatList/hooks/useSendMessage'
import EmojiButton from '../../EmojiButton'
import EmojiPopup from '../../EmojiPopup'
import FileItem from './FileItem'

interface ISendFilePanel {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
  isOpen: boolean
  onClose?: () => void
}

const SendFilePanel: FC<ISendFilePanel> = ({ files, setFiles, isOpen, onClose }) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const filesInputRef = useRef<HTMLInputElement>(null)
  const { user } = useSelector((state: RootState) => state.auth)
  const { selectedChatId, chatList } = useSelector((state: RootState) => state.chat)
  const send = useSendMessage()

  const isAddButtonDisabled = files.length >= MAX_FILES_LENGTH

  const chatData = useMemo(() => chatList.find(item => item.chat_id === selectedChatId), [selectedChatId])

  const handleClose = () => {
    setComment('')
    onClose && onClose()
  }

  const handleUpdateFiles = (targetFilename: string, newFile: File) => {
    setFiles(prev => prev.map(file => {
      if (file.name !== targetFilename) {
        return file
      }

      return newFile
    }))
  }

  const handleDelete = (filename: string) => {
    setFiles(prev => prev.filter(file => file.name !== filename))
  }

  const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    let newFiles = Array.from(e.target.files || [])

    if (!newFiles) {
      return
    }

    newFiles = [...files, ...newFiles]
    const len = newFiles.length

    if (len > MAX_FILES_LENGTH) {
      const different = len - MAX_FILES_LENGTH
      newFiles = newFiles.slice(0, len - different) // обрезаем массив с файлами так, чтобы было максимум 10 обьектов
    }

    setFiles(newFiles)
  }

  const handleSend = async () => {
    if (!user) return

    const destinationId = getDestinationId(Number(user?.id), chatData?.user_owner, chatData?.user_member)

    await send({
      chat_id: Number(selectedChatId),
      destination_id: !destinationId ? undefined : destinationId,
      message_text: comment,
      files
    }, true, handleClose)
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      style={{
        width: '400px'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <span style={{
          fontWeight: 600,
          fontSize: '20px'
        }}>
          Выбрано {files.length} файлов
        </span>
        {
          files.map(file => (
            <FileItem
              key={file.name}
              file={file}
              onChange={handleUpdateFiles}
              onDelete={handleDelete}
            />
          ))
        }
        <div style={{
          position: 'relative'
        }}>
          {isEmojiOpen && <EmojiPopup setMessageText={setComment} onClose={() => setIsEmojiOpen(false)} />}
          <Field value={comment} onChange={e => setComment(e.target.value)} placeholder='Комментарий' style={{
            maxWidth: '335px'
          }} />
          <EmojiButton setIsEmojiOpen={setIsEmojiOpen} isEmojiOpen={isEmojiOpen} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '46px'
        }}>
          <input onChange={handleAddFiles} ref={filesInputRef} type="file" style={{ display: 'none' }} multiple accept={FILES_FORMATS_ACCEPT} />
          <Button type='button' onClick={() => filesInputRef.current?.click()} variant={isAddButtonDisabled ? 'disabled' : 'classic'} style={{
            width: '94px',
            fontSize: '14px',
            fontWeight: '400'
          }}>
            Добавить
          </Button>
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            <Button type='button' onClick={handleClose} style={{
              width: '79px',
              fontSize: '14px',
              fontWeight: '400'
            }}>
              Отмена
            </Button>
            <Button onClick={handleSend} style={{
              width: '101px',
              fontSize: '14px',
              fontWeight: '400'
            }}>
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

export default SendFilePanel