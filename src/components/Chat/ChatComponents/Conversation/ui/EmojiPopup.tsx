import { Dispatch, FC, SetStateAction, useRef } from 'react'
import { useOutsideClick } from '../../../../../hooks/useOutside'
import emojies from '../../../../../resources/emojies.json'
import ModalHeader from '../../../../ui/Modal/ModalHeader'

interface IEmojiPopup {
    setMessageText: Dispatch<SetStateAction<string>>
    onClose: () => void
}

const EmojiPopup: FC<IEmojiPopup> = ({ setMessageText, onClose }) => {
    const ref = useRef<HTMLDivElement>(null)
    useOutsideClick(ref, onClose)

    const renderCategory = (category: {
        category_name: string,
        emojies_str: string
    }) => {
        const { category_name, emojies_str } = category

        return (
            <div key={category_name} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <i style={{
                    color: 'gray'
                }}>{category_name}</i>
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}>
                    {
                        emojies_str.split(' ').map(emoji => (
                            <span key={emoji} onClick={() => setMessageText(prev => `${prev}${emoji}`)} style={{
                                fontSize: '24px',
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}>{emoji}</span>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div ref={ref} style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: '350px',
            height: '276px',
            padding: '24px',
            borderRadius: '32px',
            background: '#fff',
            boxShadow: '10px 10px 10.4px 10px #00000026',
            marginBottom: '10px',
            zIndex: 999,
            top: '-280px'
        }}>
            <ModalHeader onClose={onClose} text='' />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                overflowY: 'scroll'
            }}>
                {
                    emojies.map(category => renderCategory(category))
                }
            </div>
        </div>
    )
}

export default EmojiPopup