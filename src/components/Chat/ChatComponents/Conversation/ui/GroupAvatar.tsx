import { CSSProperties, FC } from 'react';
import styles from '../Conversation.module.scss';

interface IGroupAvatar {
    color: string;
    style?: CSSProperties
}

const GroupAvatar: FC<IGroupAvatar> = ({
    color,
    style = {}
}) => {
    return (
        <div style={{
            width: '44px',
            height: '44px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 18px)',
            gap: '10px',
            ...style
        }}>
            <div className={styles['conversation__group-avatar__item']} style={{
                background: color
            }}></div>
            <div className={styles['conversation__group-avatar__item']} style={{
                background: color
            }}></div>
            <div className={styles['conversation__group-avatar__item']} style={{
                background: color
            }}></div>
            <div className={styles['conversation__group-avatar__item']} style={{
                background: color
            }}></div>
        </div>
    )
}

export default GroupAvatar