import { CSSProperties, FC } from 'react'
import CloseButton from '../CloseButton/CloseButton'

interface IModalHeader {
	text: string
	onClose?: () => void,
	style?:CSSProperties
}

const ModalHeader: FC<IModalHeader> = ({ text, onClose }) => {
	return (
		<header style={{
			display: 'flex',
			justifyContent: 'space-between',
			width: '100%'
		}}>
			<span style={{
				fontSize: '20px',
				fontWeight: 600,
				color: '#262626',
				textTransform: 'uppercase'
			}}>{text}</span>
			<CloseButton onClick={onClose} style={{
				marginTop: '2px'
			}} />
		</header>
	)
}

export default ModalHeader