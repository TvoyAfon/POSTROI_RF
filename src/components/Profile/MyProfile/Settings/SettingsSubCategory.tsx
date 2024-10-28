import { CSSProperties, FC, ReactNode } from 'react'

interface ISettingsSubCategory {
	name: string
	linkName: ReactNode
	linkStyle?: CSSProperties
	children?: ReactNode
}

const SettingsSubCategory: FC<ISettingsSubCategory> = ({ name, linkName, children, linkStyle = {} }) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '5px'
		}}>
			<b 	style={{fontWeight:600}}>{name}</b>
			<span style={{
				color: '#8bacf0',
				fontSize: '14px',
				fontWeight:600,
				...linkStyle
			}}>{linkName}</span>
			{children}
		</div>
	)
}

export default SettingsSubCategory