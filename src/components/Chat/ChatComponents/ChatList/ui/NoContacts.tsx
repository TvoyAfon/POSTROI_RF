import { CSSProperties, FC } from "react"

interface INoContacts {
    defaultText?: string
    spanStyle?: CSSProperties,
    mainStyle?: CSSProperties
}

const NoContacts: FC<INoContacts> = ({
    defaultText = 'У вас пока нет контактов.',
    spanStyle = {},
    mainStyle = {}
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            ...mainStyle
        }}>
            <span style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#7099ED',
                width: '171px',
                textAlign: 'center',
                ...spanStyle
            }}>
                {defaultText}
            </span>
        </div>
    )
}

export default NoContacts