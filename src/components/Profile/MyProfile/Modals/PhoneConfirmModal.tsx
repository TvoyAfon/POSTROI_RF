import { FC, FormEvent, useRef, useState } from 'react'
import { useModal } from '../../../../hooks/useModal'
import { useOutsideClick } from '../../../../hooks/useOutside'
import { PropsWithJsxElement } from '../../../../interface/modal.props'
import { infoService } from '../../../../services/auth/info.service'
import AuthRegisterPhone from '../../../Auth/AuthRegister/AuthRegisterPhone/AuthRegisterPhone'
import ErrorSignature from '../../../Auth/ui/ErrorSignature'
import PhoneField from '../../../Auth/ui/Fields/PhoneField'
import Button from '../../../ui/Button/Button'
import Loader from '../../../ui/Loader/Loader'
import Logo from '../../../ui/Logo'
import BaseModal from '../../../ui/Modal/BaseModal'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import ModalHeader from '../../../ui/Modal/ModalHeader'

const PhoneConfirmModal: FC<PropsWithJsxElement> = ({ children }) => {
	const { isOpen, handleClose, handleOpen } = useModal()

	const [phone, setPhone] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)


	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setError(false)
		e.preventDefault()
		try {
			setLoading(true)
			await infoService.sendCodeSms(phone)
			setOpenModal(true)
			handleClose()
		} catch (error) {
			setError(true)
			setLoading(false)
			console.log('Не удалось отправить код', error)
		}
		finally {
			setLoading(false)
		}
	}
	const handleChangePhone = (val: string) => {
		setPhone(val)
	}




	return (
		<>
			{openModal &&
				<ModalContainer zIndex={11} isOnOverlay style={{ padding: 10 }}>
					<span style={{ marginBottom: 32, paddingLeft: 20 }} className='textSizeL'>Подтверждение телефона</span>
					<AuthRegisterPhone setOpenModal={setOpenModal} phone={phone} isRegister={false} />
				</ModalContainer>
			}
			<children.type {...children.props} onEdit={handleOpen} />
			<BaseModal ref={ref} style={{ display: 'flex', flexDirection: 'column' }} isOpen={isOpen}>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: 'column', gap: '32px',
					textAlign: 'center',
					color: '#262626',
					width: '365px',
					fontSize: '12px'
				}}>
					<ModalHeader text='Телефон' onClose={handleClose} />
					<PhoneField onChangeValue={handleChangePhone} variant='rounded' label='Телефон' style={{
						width: '100%'
					}} />
					<span>Если Вы измените номер телефона, то Вам нужно будет пройти верификацию нового номера телефона.</span>
					<span>На указанный телефон будет отправлен код.</span>
					<Button>{loading ? <Loader color='white' /> : 'Подтвердить'}</Button>
					<div style={{ textAlign: 'center', paddingTop: 5 }}>
						{error && <ErrorSignature>Не удалось отправить код.</ErrorSignature>}
					</div>
				</form>
				<Logo />
			</BaseModal>
		</>
	)
}

export default PhoneConfirmModal