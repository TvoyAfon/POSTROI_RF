import { CSSProperties, Dispatch, FC, SetStateAction } from 'react'
import IconButton from '../../../../ui/IconButton/IconButton'
import smileIcon from '../../../../../assets/images/chat_images/smile.svg'

interface IEmojiButton {
    setIsEmojiOpen: Dispatch<SetStateAction<boolean>>
    isEmojiOpen: boolean;
    style?: CSSProperties
}

const EmojiButton: FC<IEmojiButton> = ({ setIsEmojiOpen, isEmojiOpen, style = {} }) => {
    return (
        <IconButton onClick={() => setIsEmojiOpen(!isEmojiOpen)} type='button' icon={smileIcon} style={{
            position: 'absolute',
            top: '9px',
            right: '15px',
            ...style
        }} />
    )
}

export default EmojiButton