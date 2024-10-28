import React, { FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../../hooks/useModal'
import { useOutsideClick } from '../../../../hooks/useOutside'
import { userService } from '../../../../services/user/user.service'
import { changeUser } from '../../../../store/slices/AuthSlice/AuthSlice'
import { RootState } from '../../../../store/store'
import ErrorSignature from '../../../Auth/ui/ErrorSignature'
import Button from '../../../ui/Button/Button'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import Field from '../../../ui/Field/Field'
import Loader from '../../../ui/Loader/Loader'
import BaseModal from '../../../ui/Modal/BaseModal'
import ModalHeader from '../../../ui/Modal/ModalHeader'

const ExperienceModal: FC<{ children: JSX.Element; updateData: 'user' | 'userWorkerProfileData' }> = ({ children }) => {
	const { isOpen, handleClose, handleOpen } = useModal()
	const { user } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)

	const [errorMessage, setErrorMessage] = useState('')
	const [formData, setFormData] = useState({
		company_name: '',
		company_specialization: '',
		region: '',
		vacation: '',
		work_responsibility: '',
		work_start: '',
		work_end: '',
		till_time: false,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))

	}

	const dispatch = useDispatch()

	const isValidDate = (dateString: string) => {
		const date = new Date(dateString)
		return !isNaN(date.getTime()) && dateString !== ''
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(false)
		setErrorMessage('')

		if (!isValidDate(formData.work_start) || !isValidDate(formData.work_end)) {
			setError(true)
			setErrorMessage('Пожалуйста, введите действительные даты.')
			return
		}

		if (new Date(formData.work_start) > new Date(formData.work_end)) {
			setError(true)
			setErrorMessage('Начальная дата должна быть раньше конечной даты.')
			return
		}

		try {
			setLoading(true)
			if (user?.id) {
				await userService.createWorkExperience({
					...formData,
					client_id: user.id,
					work_start: formData.work_start,
					work_end: formData.work_end // no need for optional chaining if we're checking user?.id
				})

				dispatch(changeUser({
					...user,
					work_experience: {
						...formData,
						work_start: formData.work_start,
						work_end: formData.work_end
					},
				}))

				handleClose() // Close the modal only if submission is successful
			}
		} catch (error) {
			console.log('Не удалось изменить опыт работы', error)
			setError(true)
			setErrorMessage('Не удалось изменить опыт работы.')
		} finally {
			setLoading(false)
		}
		console.log(formData)
	}

	return (
		<>
			<children.type {...children.props} onEdit={handleOpen} />
			<BaseModal ref={ref} style={{ width: 899 }} isOpen={isOpen}>
				<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
					<ModalHeader text='Опыт работы' onClose={handleClose} />

					<span className='textSizeM'>В какой компании вы работали?</span>
					<Field style={{ width: 830 }} name="company_name" value={formData.company_name} onChange={handleChange} />

					<span className='textSizeM'>Специальность</span>
					<Field style={{ width: 830 }} name="company_specialization" value={formData.company_specialization} onChange={handleChange} />

					<span className='textSizeM'>Регион</span>
					<Field style={{ width: 830 }} name="region" value={formData.region} onChange={handleChange} />

					<span className='textSizeM'>На какой должности?</span>
					<Field style={{ width: 830 }} name="vacation" value={formData.vacation} onChange={handleChange} />

					<span className='textSizeM'>Расскажите о ваших обязанностях и достижениях</span>
					<Field style={{ width: 830 }} name="work_responsibility" value={formData.work_responsibility} onChange={handleChange} />

					<div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
						<div className='flex-column gap-small'>
							<span className='textSizeM'>Начало работы</span>
							<Field style={{ width: 250 }} name="work_start" value={formData.work_start} onChange={handleChange} type="date" />
						</div>
						<div className='flex-column gap-small'>
							<span className='textSizeM'>Окончание работы</span>
							<Field name="work_end" value={formData.work_end} onChange={handleChange} style={{ width: 250 }} type="date" />
						</div>
						<CheckboxButton
							onClick={() => setFormData(prev => ({
								...prev,
								till_time: !prev.till_time
							}))}
							checked={formData.till_time}
							labelStyle={{ fontWeight: 600, fontSize: 16 }} label='Сейчас трудоустроен' />
					</div>
					<Button type="submit">{loading ? <Loader color='white' /> : 'Подтвердить'}</Button>
					{error && <ErrorSignature style={{ textAlign: 'center', paddingTop: 10 }}>{errorMessage}</ErrorSignature>}
				</form>
			</BaseModal>
		</>
	)
}

export default ExperienceModal