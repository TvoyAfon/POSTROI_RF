import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import img_confirm from '../../../../../../assets/images/other/checkmark-badge-02.svg'
import { getAgeWord } from '../../../../../../common/common'
import { addFormWorkerData, addUserProfileData } from '../../../../../../store/slices/FormWorker/formWorkerSlice'
import { RootState } from '../../../../../../store/store'
import UserLocation from '../../../../../Navbar/UserLocation/UserLocation'
import AgeModal from '../../../../../Profile/MyProfile/Modals/AgeModal'
import EducationModal from '../../../../../Profile/MyProfile/Modals/EducationModal'
import ExperienceModal from '../../../../../Profile/MyProfile/Modals/ExperienceModal'
import PassportConfirmModal from '../../../../../Profile/MyProfile/Modals/PassportConfirmModal/PassportConfirmModal'
import EditField from '../../../../../Profile/MyProfile/ui/EditField'
import Rating from '../../../../../Profile/MyProfile/ui/Rating'
import CheckBoxGroup from '../../ui/CheckBoxGroup'
import LocationModal from '../modal/LocationModal'
import NameModal from '../modal/NameModal'
import PriceModal from '../modal/PriceModal'

const MiddleWorkerSide: React.FC = () => {
	const dispatch = useDispatch()
	const [cityModal, setOpenCityModal] = useState(false)
	const { userWorkerFormData, userWorkerProfileData } = useSelector((state: RootState) => state.formWorkerReducer)


	const handleOpenCity = () => {
		setOpenCityModal(true)
	}

	const handleChooseWorkers = () => {
		dispatch(addFormWorkerData({
			...userWorkerFormData, workerType: {
				...userWorkerFormData.workerType,
				worker: !userWorkerFormData.workerType.worker
			}
		}))
	}
	const handleChooseLoader = () => {
		dispatch(addFormWorkerData({
			...userWorkerFormData, workerType: {
				...userWorkerFormData.workerType,
				loader: !userWorkerFormData.workerType.loader
			}
		}))
	}

	return (
		<>
			{cityModal && <UserLocation handleCloseMap={() => setOpenCityModal(false)} />}
			<div className='flex-column gap-medium'>
				<div style={{ display: 'flex', gap: 32 }}>
					<NameModal onSubmit={(fullName) => dispatch(addFormWorkerData({ ...userWorkerFormData, fullName }))}>
						<EditField
							name={(userWorkerFormData.fullName.surname + ' '
								+ userWorkerFormData.fullName.name + ' '
								+ userWorkerFormData.fullName.middlename)}
							textStyle={{
								fontSize: '20px',
								fontWeight: 600,
								textTransform: 'uppercase'
							}} />
					</NameModal>
					<span>128 дней на сайте</span>
				</div>
				<div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingBottom: 32 }}>
					<span>Рейтинг</span>
					<Rating />
				</div>
				<div style={{ display: 'flex', gap: 24, paddingBottom: 32, alignItems: 'center' }}>
					<CheckBoxGroup
						onClick2={handleChooseLoader}
						checked1={userWorkerFormData.workerType.worker} checked2={userWorkerFormData.workerType.loader}
						onClick1={handleChooseWorkers}
						labelProp={{ color: 'white' }}
						style={{ backgroundColor: '#7099ED', width: 314 }} label1='Разнорабочий'
						label2='Грузчик' />
					<PriceModal onSubmit={(price) => dispatch(addUserProfileData({
						...userWorkerProfileData,
						price
					}))} >
						<EditField
							buttonText={userWorkerProfileData.price ? '' : 'Подтвердить'}
							styleTextField={{ fontWeight: 700 }}
							textField={userWorkerProfileData.price + (userWorkerProfileData.price && '₽')}
							name='Цена за час:' />
					</PriceModal>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className='flex-column gap-medium'>
						<div>
							<span style={{
								fontWeight: 700
							}}>Заказов выполнено: </span>
							<span>0</span>
						</div>
						<LocationModal handleOpenCity={handleOpenCity} />
						<ExperienceModal updateData='userWorkerProfileData'>
							<EditField name='Опыт работы:'
								buttonText={userWorkerProfileData.experience ? '' : 'Подтвердить'}
								textField={userWorkerProfileData.experience && userWorkerProfileData.experience + ' ' +
									getAgeWord(Number(userWorkerProfileData.experience))
								}
								styleTextField={{ fontWeight: 700 }}
								textStyle={{
									color: '#8E8E93',
									fontWeight: 700
								}} />
						</ExperienceModal>
						<EducationModal updateData='userWorkerProfileData'>
							<EditField name='Образование:'
								buttonText={userWorkerProfileData.educational.degree ? '' : 'Подтвердить'}
								textField={userWorkerProfileData.educational.degree || ''}
								styleTextField={{ fontWeight: 700 }}
								textStyle={{
									color: '#8E8E93',
									fontWeight: 700
								}} />
						</EducationModal>
					</div>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '16px'
					}}>
						<AgeModal updateData='userWorkerProfile'>
							<EditField name='Возраст:' buttonText={!userWorkerProfileData.age ? 'Подтвердить' : ''}
								textField={userWorkerProfileData.age && userWorkerProfileData.age + ' ' +
									getAgeWord(Number(userWorkerProfileData.age))}
								styleTextField={{ fontWeight: 700 }}
								textStyle={{
									color: '#8E8E93',
									fontWeight: 600
								}} />
						</AgeModal>
						<PassportConfirmModal updateData='userWorkerProfileData'>
							<EditField name='Паспорт:'
								img={img_confirm}
								buttonText='Подтвердить'
								textStyle={{
									color: '#8E8E93',
									fontWeight: 600
								}} />
						</PassportConfirmModal>
					</div>
				</div>
			</div>
		</>
	)
}

export default MiddleWorkerSide
