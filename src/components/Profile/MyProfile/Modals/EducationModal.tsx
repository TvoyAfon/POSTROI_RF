import { FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetEducation } from '../../../../hooks/getEducation/useGetEducation'
import { useModal } from '../../../../hooks/useModal'
import { useOutsideClick } from '../../../../hooks/useOutside'
import { userService } from '../../../../services/user/user.service'
import { changeUser } from '../../../../store/slices/AuthSlice/AuthSlice'
import { addUserProfileData } from '../../../../store/slices/FormWorker/formWorkerSlice'
import { RootState } from '../../../../store/store'
import ErrorSignature from '../../../Auth/ui/ErrorSignature'
import Button from '../../../ui/Button/Button'
import EducationalList from '../../../ui/EducationalList/EducationalList'
import Field from '../../../ui/Field/Field'
import Loader from '../../../ui/Loader/Loader'
import BaseModal from '../../../ui/Modal/BaseModal'
import ModalHeader from '../../../ui/Modal/ModalHeader'

const EducationModal: FC<{ children: JSX.Element, updateData: 'user' | 'userWorkerProfileData' }> = ({ children, updateData }) => {
	const { isOpen, handleClose, handleOpen } = useModal()
	const { userWorkerProfileData } = useSelector((state: RootState) => state.formWorkerReducer)
	const { user } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()

	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)

	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [currentDegree, setCurrentDegree] = useState('')

	const [formData, setFormData] = useState({
		name: '',
		faculty: '',
		specialization: '',
		year: '',
		startYear: '',
	})

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		setErrorMessage('')
	}

	const educationData = useGetEducation(formData.name, user?.id!)

	console.log(educationData)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const { name, faculty, specialization, year, startYear } = formData

		if (!name || !faculty || !specialization || !year || !startYear) {
			return setErrorMessage('All fields are required')
		}

		setLoading(true)
		try {
			if (updateData === 'userWorkerProfileData') {
				dispatch(addUserProfileData({
					...userWorkerProfileData,
					educational: {
						degree: currentDegree,
						educationalName: name,
						educSpecializtion: specialization,
						yearComplete: year,
						faculty,
					},
				}))
			} else if (updateData === 'user' && user?.id) {
				await userService.editEducation(user.id,
					currentDegree,
					name,
					faculty,
					specialization,
					startYear,
					year,
					false,
				)
				dispatch(changeUser({
					...user,
					educationalDegree: currentDegree,
					educational: {
						univercity: name,
						faculty,
						specialization,
						education_end: year,
						education_start: startYear,
					},
				}))
			}
			handleClose()
		} catch (error) {
			setErrorMessage('Failed to update education')
			console.error('Failed to update education:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div onClick={handleOpen}>{children}</div>
			<BaseModal ref={ref} isOpen={isOpen} onClose={handleClose}>
				<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
					<ModalHeader text='Образование' onClose={handleClose} />
					<span className='textSizeL'>Какое у вас образование?</span>
					<EducationalList
						currentDegree={currentDegree}
						setCurrentDegree={setCurrentDegree}
						isOpenPopup={isOpenPopup}
						setIsOpenPopup={setIsOpenPopup}
					/>
					<div>
						<span>Образование: </span>
						<strong style={{ fontWeight: 700 }}>{currentDegree}</strong>
					</div>
					<span className='textSizeL'>Какое учебное заведение закончили?</span>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
						{['name', 'faculty', 'specialization'].map((field, index) => (
							<div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
								<span style={{ fontWeight: 800 }}>{field === 'name' ? 'Название учебного заведения' : field === 'faculty' ? 'Факультет' : 'Специализация'}</span>
								<Field name={field} onChange={handleChange} value={formData[field as keyof typeof formData]} />
							</div>
						))}
						<div style={{ display: 'flex', gap: 16 }}>
							{['startYear', 'year'].map((field) => (
								<div key={field} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
									<span style={{ fontWeight: 800 }}>{field === 'startYear' ? 'Год начала' : 'Год окончания'}</span>
									<Field name={field} onChange={handleChange} style={{ width: 100 }} value={formData[field as keyof typeof formData]} />
								</div>
							))}
						</div>
					</div>
					<Button>{loading ? <Loader color='white' /> : 'Сохранить'}</Button>
					{errorMessage && <ErrorSignature style={{ position: 'absolute', bottom: -20, left: 155 }}>{errorMessage}</ErrorSignature>}
				</form>
			</BaseModal>
		</>
	)
}

export default EducationModal