import React, { ReactElement, useState } from 'react'
import { useModal } from '../../../../../../hooks/useModal'
import Button from '../../../../../ui/Button/Button'
import Field from '../../../../../ui/Field/Field'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../../ui/Modal/ModalHeader'



interface IPriceModalProps {
	children: ReactElement,
	onSubmit?: (price: string) => void
}

const PriceModal: React.FC<IPriceModalProps> = ({ children, onSubmit }) => {
	const { isOpen, handleClose, handleOpen } = useModal()
	const [price, setPrice] = useState('')

	const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (/^\d*$/.test(value) && value.length <= 5) {
			setPrice(value)
		}
	}
	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit && onSubmit(price)
		handleClose()
	}

	return (
		<>
			<children.type {...children.props} onEdit={handleOpen} />
			<BaseModal isOpen={isOpen}>
				<form onSubmit={handleSubmit} className='flex-column gap-large'>
					<ModalHeader text='Цена за час' onClose={handleClose} />
					<Field onChange={handleChangePrice} value={price} />
					<Button >Подтвердить</Button>
				</form>
			</BaseModal>
		</>
	)
}

export default PriceModal
