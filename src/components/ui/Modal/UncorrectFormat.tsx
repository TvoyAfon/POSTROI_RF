import React, { CSSProperties } from 'react'
import Button from '../Button/Button'
import ModalContainer from './ModalContainer'

const UncorrectFormat: React.FC<{ text: string, onClose: () => void, style?: CSSProperties }> = ({ text, onClose, style = {} }) => {

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation()
		onClose()
	}
	return (
		<ModalContainer
			style={{ width:'auto', height: 'auto', position: 'fixed', top: '10%', ...style }}
			zIndex={12}
			isOnOverlay>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 32, justifyContent: 'center', alignItems: 'center' }} >
				<span className='textSizeL'>{text}</span>
				<Button style={{ width: '33%' }} onClick={handleClose}>Ок</Button>
			</div>
		</ModalContainer>
	)
}

export default UncorrectFormat