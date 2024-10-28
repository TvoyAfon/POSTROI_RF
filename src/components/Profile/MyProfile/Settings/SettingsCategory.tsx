import { FC, ReactNode } from 'react'

interface ISettingsCategory {
	categoryName?: string
	children: ReactNode
}

const SettingsCategory: FC<ISettingsCategory> = ({ categoryName, children }) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '32px'
		}}>
			{
				categoryName
				&&
				<span style={{
					color: '#262626',
					fontSize: '20px',
					fontWeight: 600
				}}>{categoryName}</span>
			}
			{children}
			<div style={{
				border: '1px solid #d4d4d7',
				borderRadius: '8px'
			}}></div>
		</div>
	)
}

export default SettingsCategory