import React, { useState } from 'react'
import { PropsWithJsxElement } from '../../../../../../interface/modal.props'
import Button from '../../../../../ui/Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../../../../hooks/useModal'
import { addFormWorkerData } from '../../../../../../store/slices/FormWorker/formWorkerSlice'
import { RootState } from '../../../../../../store/store'
import Field from '../../../../../ui/Field/Field'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../../ui/Modal/ModalHeader'

const AboutWorkerModal: React.FC<PropsWithJsxElement> = ({ children }) => {

	const { isOpen, handleClose, handleOpen } = useModal()


	const dispatch = useDispatch()
	const { userWorkerFormData } = useSelector((state: RootState) => state.formWorkerReducer)
	const [about, setAbout] = useState('')

	const handleChangeAbout = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (about.length < 150) setAbout(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(addFormWorkerData({ ...userWorkerFormData, about }))
		handleClose()
	}

	return (
		<>
			<children.type {...children.props} onEdit={handleOpen} />
			<BaseModal isOpen={isOpen}>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: 'column', gap: '32px'
				}}>
					<ModalHeader text='О себе' onClose={handleClose} />
					<Field textUnderInput='Не более 150 символов' style={{ height: 200 }} value={about} onChange={handleChangeAbout} />
					<Button>Подтвердить</Button>
				</form>
			</BaseModal>
		</>
	)
}


export default AboutWorkerModal
