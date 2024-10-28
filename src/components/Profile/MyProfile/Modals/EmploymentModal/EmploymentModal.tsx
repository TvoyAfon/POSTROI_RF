import { FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../../../hooks/useModal'
import { useOutsideClick } from '../../../../../hooks/useOutside'
import { PropsWithJsxElement } from '../../../../../interface/modal.props'
import { userService } from '../../../../../services/user/user.service'
import { changeUser } from '../../../../../store/slices/AuthSlice/AuthSlice'
import { RootState } from '../../../../../store/store'
import Button from '../../../../ui/Button/Button'
import Loader from '../../../../ui/Loader/Loader'
import BaseModal from '../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../ui/Modal/ModalHeader'
import RadioButton from '../../../../ui/RadioButton/RadioButton'
import { employments } from './types'

const EmploymentModal: FC<PropsWithJsxElement> = ({ children }) => {
	const { isOpen, handleClose, handleOpen } = useModal()
	const [selectedEmployment, setSelectedEmployment] = useState<string>('')
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState(false)


	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)

	const handleChange = (employment: string) => setSelectedEmployment(employment)

	const handleConfirm = async () => {
		if (!user?.id) return

		setLoading(true) // Начинаем загрузку

		try {
			await userService.editclientType(user.id, selectedEmployment)
			dispatch(changeUser({
				...user,
				category_person: selectedEmployment,
			}))
		} catch (error) {
			console.error('Ошибка смена типа клиента', error)
			alert('Произошла ошибка при смене типа клиента. Пожалуйста, попробуйте еще раз.') // Изменить на ваш компонент уведомлений
		} finally {
			setLoading(false) // Завершаем загрузку
			handleClose() // Закрываем модальное окно
		}
	}

	return (
		<>
			<children.type {...children.props} onEdit={handleOpen} />
			<BaseModal ref={ref} isOpen={isOpen}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '504px' }}>
					<ModalHeader text='Занятость' onClose={handleClose} />
					{employments.map((employment, index) => (
						<RadioButton key={index} onClick={() => handleChange(employment.key)} label={employment.name} checked={selectedEmployment === employment.key} />
					))}
					<Button onClick={handleConfirm}>
						{loading ? <Loader color='white' /> : 'Подтвердить'}
					</Button>
				</div>
			</BaseModal>
		</>
	)
}

export default EmploymentModal