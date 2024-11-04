import React, { useState } from 'react'
import chat_icon from '../../assets/images/mainpage_images/chat_icon.png'
import Chat from './ChatHelp'
import styles from './ChatIcon.module.scss'

const ChatHelp: React.FC = () => {

  const [showChat, setShowChat] = useState(false)
  const [showText, setShowText] = useState(false)

  const handleOpenChat = () => {
    setShowChat(true)
  }

  const handleCloseChat = () => {
    setShowChat(false)
    setShowText(false)

  }

  return (
    <>
      {!showChat &&
        <div className={styles.chat_container}>
          {showText && <span className={styles.chat_container_text}>Есть вопросы? Пишите нам.</span>}
          <img
            onClick={handleOpenChat}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
            style={{ cursor: 'pointer', borderRadius: '32px', boxShadow: 'rgba(0, 0, 0, 0.34) 6px 6px 10px' }}
            src={chat_icon}
            alt="question" />
        </div>}
      {showChat && <Chat handleCloseChat={handleCloseChat} />}

    </>
  )
}

export default ChatHelp
