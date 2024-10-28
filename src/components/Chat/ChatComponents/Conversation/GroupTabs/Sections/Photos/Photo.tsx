import { CSSProperties, FC } from 'react'

interface IPhoto {
	src: string
	style?: CSSProperties
	onClick?: () => void
}

const Photo: FC<IPhoto> = ({ src, style = {}, onClick }) => {
	return (
		<img onClick={onClick} src={src} alt="" style={{
			width: '160px',
			height: '112px',
			borderRadius: '16px',
			padding: '6px',
			display: 'flex',
			gap: '8px',
			cursor: 'pointer',
			...style
		}} />
	)
}

export default Photo