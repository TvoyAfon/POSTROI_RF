import { CSSProperties, FC, useMemo } from 'react'
import { nameToColor } from '../../Chat/utils/utils'

interface INoAvatar {
    name: string,
    style?: CSSProperties
    photoURL?: string
}

const NoAvatar: FC<INoAvatar> = ({
    name,
    style = {},
    photoURL
}) => {
    const nameColor = useMemo(() => nameToColor(name), [name])

    return (
        <>
            {
                photoURL
                    ?
                    <img src={photoURL} alt='' style={{
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        ...style
                    }} />
                    :
                    <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '50%',
                        background: nameColor,
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                        ...style
                    }}>
                        <span style={{
                            color: '#fff', position: 'absolute',
                            top: '11px'
                        }}>{name[0]}</span>
                    </div>
            }
        </>

    )
}

export default NoAvatar