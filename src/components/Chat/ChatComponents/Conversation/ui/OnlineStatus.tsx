import { CSSProperties, FC, ReactNode } from 'react'

interface IOnlineStatus {
    isOnline: boolean;
    children: ReactNode
    style?: CSSProperties
}

const OnlineStatus: FC<IOnlineStatus> = ({ isOnline, children, style = {} }) => {
    return (
        <div style={{
            position: 'relative'
        }}>
            { children }
            <div style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isOnline ? '#40B889' : '#FFB31D',
                bottom: '10px',
                right: '0px',
                ...style
            }}>

            </div>
        </div>
    )
}

export default OnlineStatus