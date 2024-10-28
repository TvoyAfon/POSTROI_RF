import { CSSProperties, FC } from 'react'

interface IProperty {
	header: string
	text: string
	headerStyle?: CSSProperties
	textStyle?: CSSProperties
}

const Property: FC<IProperty> = ({ header, text, headerStyle = {}, textStyle = {} }) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '8px'
		}}>
			<span style={{
				fontWeight: 700,
				fontSize: '20px',
				...headerStyle
			}}>{header}</span>
			<span style={{
				fontWeight: 300,
				fontSize: '16px',
				color: '#262626',
				...textStyle
			}}>{text}</span>
		</div>
	)
}

export default Property