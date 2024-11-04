import React, { useState } from 'react'
import get_file from '../../assets/images/chat_images/attachment-01.png'
import human_help from '../../assets/images/chat_images/human_chat.svg'
import sent from '../../assets/images/chat_images/sent.png'
import smile from '../../assets/images/chat_images/smile.png'
import glass_img from '../../assets/images/mainpage_images/magnifying-glass-solid.png'
import { IChat } from '../../interface/chat.props'
import Button from '../ui/Button/Button'
import CloseButton from '../ui/CloseButton/CloseButton'
import styles from './Chat.module.scss'


const ChatHelp: React.FC<IChat> = ({ handleCloseChat }) => {

  const [isHiddenGlass, setIsHiddenGlass] = useState<boolean>(true)

  const hiddenGlass = () => {
    setIsHiddenGlass(false)
  }
  const handleChange = () => {
    setIsHiddenGlass(false)
  }

  return (
    <div className={styles.overlay}>

      <div className={styles.chat}>
        <div className={styles.chat_header}>
          <h3 className='textSizeL'>Поддержка</h3>
          <CloseButton onClick={handleCloseChat} />
        </div>
        <div className={styles.chat_input}>
          <input
            onChange={handleChange}
            onFocus={hiddenGlass}
            type="text"
            style={{ backgroundImage: isHiddenGlass ? `url(${glass_img})` : '' }} placeholder='' />
        </div>
        <div className={styles.chat_boxMessage}>
          <img src={human_help} alt="human_help" />
          <div className={styles.chat_boxMessage_text}>
            <span>Здравствуйте!</span>
            <span>Здесь Вам всегда ответит <br /> служба поддержки.</span>
          </div>
        </div>
        <div className={styles.chat_userFooter}>
          <button className={styles.chat_userFooter_button}>
            <img src={get_file} alt="getFile" />
          </button>
          <input
            style={{
              backgroundImage: `url(${smile})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '94%',
              backgroundColor: '#F4F3F1'
            }} type="text" />
          <Button><img src={sent} alt="sent" /></Button>
        </div>
      </div>
    </div>
  )
}

export default ChatHelp
