import { useState } from 'react'
import { useSelector } from 'react-redux'
import { displayDaysOnSite, getAgeWord } from '../../../../common/common'

import { RootState } from '../../../../store/store'
import { flexRow } from '../../../CreateOrder/forms/styles/stylesCreateOrder'
import NameModal from '../../../CreateOrder/WorkersAndMasters/WorkersMarket/UserProfile/modal/NameModal'
import UserLocation from '../../../Navbar/UserLocation/UserLocation'
import AgeModal from '../Modals/AgeModal'
import ContractWorkModal from '../Modals/ContractWorkModal'
import EducationModal from '../Modals/EducationModal'
import EmploymentModal from '../Modals/EmploymentModal/EmploymentModal'
import ExperienceModal from '../Modals/ExperienceModal'
import PassportConfirmModal from '../Modals/PassportConfirmModal/PassportConfirmModal'
import EditField from '../ui/EditField'
import Rating from '../ui/Rating'


const MiddleSide = () => {
	const { user } = useSelector((state: RootState) => state.auth)
	const [openMap, setOpenMap] = useState(false)

	const checkPassport = () => {
		switch (user?.passport) {
			case 'INVALID':
				return 'Не прошел проверку'
			case 'NO':
				return 'Подтвердить'
			case 'VALID':
				return 'Подтвержден'
			default:
				return 'Статус паспорта неизвестен' // Можно добавить обработку случая, если passport не соответствует ни одному из значений
		}
	}

	return (
		<>
			{openMap &&
				<UserLocation handleCloseMap={() => setOpenMap(false)} />}
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '70px'
			}}>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px'
				}}>
					<div style={{
						display: 'flex',
						gap: '32px'
					}}>
						<NameModal updateData='user'>
							<EditField name={user?.last_name + ' ' + user?.first_name + ' ' + user?.patronymic} textStyle={{
								fontSize: '20px',
								fontWeight: 600,
								textTransform: 'uppercase'
							}} />
						</NameModal>
						<span>{displayDaysOnSite(Number(user?.experience))}</span>
					</div>
					<div style={{
						display: 'flex',
						gap: '20px'
					}}>
						<Rating label='Рейтинг исполнителя' />
						<Rating label='Рейтинг заказчика' />
					</div>
				</div>
				<div style={{
					display: 'flex',
					gap: '60px'
				}}>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '16px'
					}}>
						<div>
							<span style={{
								fontWeight: 700
							}}>Заказов выполнено: </span>
							<span>0</span>
						</div>
						<EditField
							onEdit={() => setOpenMap(true)}
							name={user?.city_name}
							textStyle={{
								fontWeight: 700
							}} />
						<ExperienceModal updateData='user'>
							<EditField
								name='Опыт работы:'
								buttonText={user?.work_experience ? 'Подтвержден' : 'Подтвердить'}
								styleTextField={{ fontWeight: 700 }}
								textStyle={{
									color: '#8E8E93',
									fontWeight: 300
								}} />
						</ExperienceModal>
						<EducationModal updateData='user'>
							<EditField name='Образование:'
								buttonText={user?.educationalDegree ? '' : 'Подтвердить'}
								styleTextField={{ fontWeight: 700, whiteSpace: 'nowrap' }}
								textField={user?.educationalDegree}
								textStyle={{
									color: '#8E8E93',
									fontWeight: 300
								}} />
						</EducationModal>
						<AgeModal updateData='user'>
							<EditField name='Возраст:'
								buttonText={user?.client_age ? '' : 'Подтвердить'}
								styleTextField={{ fontWeight: 700 }}
								textField={user?.client_age && user?.client_age + ' ' + getAgeWord(Number(user?.client_age))}
								textStyle={{
									color: '#8E8E93',
									fontWeight: 300
								}} />
						</AgeModal>
					</div>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '16px'
					}}>
						{user?.passport === 'MODERATE' ?
							<div style={flexRow}>
								<span style={{ color: '#8E8E93' }}>Паспорт:</span>
								<span style={{ fontSize: 14, color: '#7099ED' }}>На модерации</span>
							</div>
							:
							<PassportConfirmModal updateData='user'>
								<EditField name='Паспорт'
									buttonText={checkPassport()} textStyle={{
										color: '#8E8E93',
										fontWeight: 600
									}} />
							</PassportConfirmModal>
						}
						<EmploymentModal>
							<EditField name={user?.category_person}
								buttonText={user?.employment?.length !== 0 ? '' : 'Подтвердить'}

								styleTextField={{ fontWeight: 700 }}
								textStyle={{
									fontWeight: 700,
									whiteSpace: 'nowrap'
								}} />
						</EmploymentModal>
						<ContractWorkModal>
							<EditField name='Работа по договору:'
								textField={user?.contract ? 'Да' : 'Нет'}
								styleTextField={{ fontWeight: 700 }}
								textStyle={{
									color: '#8E8E93',
									fontWeight: 300,
									whiteSpace: 'nowrap'
								}} />
						</ContractWorkModal>
					</div>
				</div>
			</div>
		</>
	)
}

export default MiddleSide