import React, { FC, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from '../../../../../hooks/useModal'
import { useOutsideClick } from '../../../../../hooks/useOutside'
import { IPassportModal } from '../../../../../interface/user.props'
import { userService } from '../../../../../services/user/user.service'
import { RootState } from '../../../../../store/store'
import ErrorSignature from '../../../../Auth/ui/ErrorSignature'
import Button from '../../../../ui/Button/Button'
import Field from '../../../../ui/Field/Field'
import Loader from '../../../../ui/Loader/Loader'
import BaseModal from '../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../ui/Modal/ModalHeader'
import PassportPhoto from './PassportPhoto'


const PassportConfirmModal: FC<IPassportModal> = ({ children }) => {
	const { isOpen, handleClose, handleOpen } = useModal()
	const { user } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)


	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)

	const [formValues, setFormValues] = useState({
		surname: '',
		name: '',
		middlename: '',
		dateOfBirth: "",
		seriesAndNumber: '',
		issue: '',
		issuedBy: "",
		code: "",
	})
	const [photo, setPhoto] = useState<File>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}))
		setError(false)
	}

	const handleChangeSeriesAndNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Получаем текущее значение из input
		const value = e.target.value
		setError(false)
		// Убираем все пробелы, чтобы облегчить обработку
		const strippedValue = value.replace(/\s/g, '')

		let formattedValue = ''

		if (/^\d{0,4}$/.test(strippedValue)) {

			formattedValue = strippedValue
		} else if (/^\d{4}\d{0,6}$/.test(strippedValue)) {
			// Если введены 4 цифры и больше, форматируем так, чтобы добавился пробел
			formattedValue = strippedValue.slice(0, 4) + ' ' + strippedValue.slice(4, 10)
		}

		if (formattedValue.length <= 11) { // 4 + 1 (пробел) + 6
			setFormValues(prev => ({
				...prev,
				seriesAndNumber: formattedValue
			}))
		}
	}
	const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const regex = /^\d{0,6}$/

		if (regex.test(value)) {
			setFormValues(prev => ({
				...prev,
				code: value
			}))
		}
		setError(false)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const isEmpty = Object.values(formValues).some(field => field === '') || !photo
		if (isEmpty) {
			console.log('click')
			setError(true) // Устанавливаем сообщение об ошибке
			return
		}

		try {

			if (!user?.id || !photo) return
			const [series, number] = formValues.seriesAndNumber.split(' ')
			const formData = new FormData()
			formData.append('files', photo!)
			setLoading(true)
			await userService.editPassport(user?.id, {
				last_name: formValues.surname,
				first_name: formValues.name,
				patronymic: formValues.middlename,
				date_birth: formValues.dateOfBirth,
				series,
				number,
				date_give: formValues.issue,
				entity_give: formValues.issuedBy,
				code: formValues.code
			}, formData)
			handleClose()
		} catch (error) {
			console.log(error)
		}
		finally {
			setLoading(false)
		}
	}

	return (
		<>
			<children.type {...children.props} s onEdit={handleOpen} />
			<BaseModal ref={ref} isOpen={isOpen} style={{
				height: 750,
				marginTop: 100
			}}>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: 'column', gap: '32px',
				}}>
					<ModalHeader text='Паспорт' onClose={handleClose} />
					<div style={{
						display: 'flex',
						flexDirection: 'column', gap: '32px',
						overflowY: 'scroll',
						height: '100%',
					}}>
						<Field
							onChange={handleChange}
							value={formValues.surname}
							name='surname'
							label='Фамилия'
							placeholder='Фамилия'
							style={{ width: '97%' }} />
						<Field
							onChange={handleChange}
							value={formValues.name}
							name='name'
							label='Имя'
							placeholder='Имя'
							style={{ width: '97%' }} />
						<Field
							onChange={handleChange}
							value={formValues.middlename}
							name='middlename'
							label='Отчество'
							placeholder='Отчество'
							style={{ width: '97%' }} />
						<Field
							type='date'
							onChange={handleChange}
							value={formValues.dateOfBirth}
							name='dateOfBirth'
							label='Дата рождения'
							style={{ width: '168px' }} />
						<div style={{
							width: '100%',
							display: 'flex',
							gap: '24px'
						}}>
							<Field
								onChange={handleChangeSeriesAndNumber}
								value={formValues.seriesAndNumber}
								label='Серия и номер паспорта'
								placeholder='1236 567890' style={{ width: '280px' }} />
							<Field
								type='date'
								onChange={handleChange}
								name='issue'
								value={formValues.issue}
								label='Дата выдачи'
								style={{ width: '152px' }} />
						</div>
						<Field
							onChange={handleChange}
							name='issuedBy'
							value={formValues.issuedBy}
							label='Кем выдан'
							placeholder='Кем выдан'
							style={{ width: '97%' }} />
						<Field
							onChange={handleChangeCode}
							value={formValues.code}
							label='Код подразделения'
							placeholder='Код подразделения'
							style={{ width: '97%' }} />
						{photo ? <img
							style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 16 }}
							src={URL.createObjectURL(photo)}
							alt="passport_photo" /> : null}
						<PassportPhoto setPhoto={setPhoto} />
						<Button
							style={{ width: "97%" }}>{loading ? <Loader textStyle={{ color: 'white' }} /> : 'Подтвердить'}</Button>
						{error && <ErrorSignature style={{ textAlign: 'center' }}>Заполните все поля</ErrorSignature>}
					</div>
				</form>
			</BaseModal>
		</>
	)
}

export default PassportConfirmModal