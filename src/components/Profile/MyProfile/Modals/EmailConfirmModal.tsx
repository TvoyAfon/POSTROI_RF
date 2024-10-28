import { FC, FormEvent, useRef, useState } from 'react'
import { useModal } from '../../../../hooks/useModal'
import { useOutsideClick } from '../../../../hooks/useOutside'
import { PropsWithJsxElement } from '../../../../interface/modal.props'
import { infoService } from '../../../../services/auth/info.service'
import AuthRegisterEmail from '../../../Auth/AuthRegister/AuthRegisterEmail/AuthRegisterEmail'
import ErrorSignature from '../../../Auth/ui/ErrorSignature'
import EmailField from '../../../Auth/ui/Fields/EmailField'
import Button from '../../../ui/Button/Button'
import Loader from '../../../ui/Loader/Loader'
import Logo from '../../../ui/Logo'
import BaseModal from '../../../ui/Modal/BaseModal'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import ModalHeader from '../../../ui/Modal/ModalHeader'

const EmailConfirmModal: FC<PropsWithJsxElement> = ({ children }) => {
	const { isOpen, handleClose, handleOpen } = useModal()
	const [email, setEmail] = useState<string>('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)



	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setError(false)
			setLoading(true)
			await infoService.sendCodeEmail(email)
			setOpenModal(true)
			handleClose()
		} catch (error) {
			setError(true)
			setLoading(false)
			console.log('Ошибка отправки на почту', error)
		}
		setLoading(false)
	}


	return (
		<>
			{openModal &&
				<ModalContainer zIndex={11} isOnOverlay>
					<span style={{ marginBottom: 32 }} className='textSizeL'>Подтверждение почты</span>
					<AuthRegisterEmail
						setOpenModal={setOpenModal}
						email={email}
						style={{ padding: 15 }}
						register={false} />
				</ModalContainer>
			}
			<children.type {...children.props} onEdit={handleOpen} />
			<BaseModal ref={ref} style={{ display: "flex", flexDirection: 'column' }} isOpen={isOpen}>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: 'column', gap: '32px',
					textAlign: 'center',
					color: '#262626',
					width: '365px',
					fontSize: '12px'
				}}>
					<ModalHeader text='Электронная почта' onClose={handleClose} />
					<EmailField value={email} onChangeValue={val => setEmail(val)} variant='rounded' label='Почта' style={{
						width: '100%'
					}} />
					<span>Если Вы измените электронную почту, то Вам нужно будет  пройти верификацию нового адреса электронной почты.</span>
					<span>На указаную электронную почту будет отправлен код.</span>
					<Button style={{ marginBottom: 32 }}>{loading ? <Loader /> : 'Подтвердить'}</Button>
					{error && <ErrorSignature>Не удалось отправить код на почту.</ErrorSignature>}
				</form>
				<Logo />
			</BaseModal>
		</>
	)
}

export default EmailConfirmModal