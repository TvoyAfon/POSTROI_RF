import React, { useState } from 'react'
import { useModal } from '../../../../../../../../hooks/useModal'
import Button from '../../../../../../../ui/Button/Button'
import BaseModal from '../../../../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../../../../ui/Modal/ModalHeader'
import RadioButton from '../../../../../../../ui/RadioButton/RadioButton'

interface NameModalProps {
	onSubmit?: (relocate: string) => void
	children: React.ReactElement
}

const RelocationModal: React.FC<NameModalProps> = ({
	children, onSubmit
}) => {
	const [currentReloc, setCurrentReloc] = useState('')
	const { handleClose, handleOpen, isOpen } = useModal()

	const handleSubmit = () => {
		handleClose()
		onSubmit && onSubmit(currentReloc)
	}
	return (
		<>
			{React.cloneElement(children, { onEdit: handleOpen })}
			<BaseModal isOpen={isOpen}>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: 'column', gap: '32px'
				}}>
					<ModalHeader text='Выберите один из вариантов' />
					<RadioButton onClick={() => setCurrentReloc('Готов')}
						label='Готов к переезду'
						checked={currentReloc === 'Готов'}
					/>
					<RadioButton onClick={() => setCurrentReloc('Возможен')} label='Возможен переезд'
						checked={currentReloc === 'Возможен'} />
					<RadioButton onClick={() => setCurrentReloc('Не готов')} label='Не готов к  переезду'
						checked={currentReloc === 'Не готов'} />
					<Button>Подтвердить</Button>
				</form>
			</BaseModal>
		</>
	)
}

export default RelocationModal