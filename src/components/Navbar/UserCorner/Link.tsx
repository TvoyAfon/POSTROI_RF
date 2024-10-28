import { CSSProperties, FC, ReactNode } from 'react'

interface ILink {
	style?: CSSProperties
	children: ReactNode
	onClick?: () => void
}

const Link: FC<ILink> = ({ style = {}, children, onClick }) => {
	return (
		<div onClick={onClick} style={{
			height: '37px',
			padding: "9px 12px 9px 12px",
			gap: "11px",
			borderRadius: '8px 0px 0px 0px',
			cursor: 'pointer',
			...style
		}}>
			{children}
		</div>
	)
}

export default Link