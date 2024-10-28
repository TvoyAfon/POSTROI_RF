import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avatar_img from '../../../../../../../assets/images/createOrder_img/Rectangle 35.png'
import circle_mark from '../../../../../../../assets/images/other/checkmark-circle-02 (1).svg'
import settings_blue from '../../../../../../../assets/images/other/settings-blue.svg'
import photo_editor from '../../../../../../../assets/images/profile/photo_editor.svg'
import { getAgeWord } from '../../../../../../../common/common'
import { useModal } from '../../../../../../../hooks/useModal'
import { ICardMastersProfile } from '../../../../../../../interface/categoryCard.props'
import { ROUTES_CATEGORY } from '../../../../../../../routes/routes'
import { addFormMasterData } from '../../../../../../../store/slices/FormMaster/formMasterSlice'
import { RootState } from '../../../../../../../store/store'
import UserLocation from '../../../../../../Navbar/UserLocation/UserLocation'
import AgeModal from '../../../../../../Profile/MyProfile/Modals/AgeModal'
import PassportConfirmModal from '../../../../../../Profile/MyProfile/Modals/PassportConfirmModal/PassportConfirmModal'
import RightSide from '../../../../../../Profile/MyProfile/Sides/RightSide'
import EditField from '../../../../../../Profile/MyProfile/ui/EditField'
import Avatar from '../../../../../../ui/Avatar/Avatar'
import AvatarLoader from '../../../../../../ui/AvatarLoader/AvatarLoader'
import Button from '../../../../../../ui/Button/Button'
import PageNameArrow from '../../../../../../ui/PageName&Arrow/PageNameArrow'
import LocationModal from '../../../../WorkersMarket/UserProfile/modal/LocationModal'
import NameModal from '../../../../WorkersMarket/UserProfile/modal/NameModal'
import NotificationSettings from '../../../../WorkersMarket/UserProfile/modal/NotificationSettings'
import styles from '../CardMasters.module.scss'
import RelocationModal from './modal/RelocationModal'
import ShowContacts from './ui/ShowContacts'
import SocialsConfirm from './ui/SocialsConfirm'

const CardMastersProfile: React.FC<ICardMastersProfile> = ({
	fullName = 'Иванов  Иван Иванович',
	img = avatar_img,
	address = 'Кременчуг-Константиновское',
	age = 35,
	isPassport = true,
	relocation = 'Готов к переезду',
	isMyProfile = false  /* Условный рендеринг для личного профиля */ }) => {

	const { handleClose, handleOpen, isOpen } = useModal()
	const dispatch = useDispatch()
	const { masterForm } = useSelector((state: RootState) => state.formMasterReducer)
	const [openModalCity, setOpenModalCity] = useState(false)
	const [isOpenNotif, setIsOpenNotic] = useState(false)

	const handleOpenNotificat = () => {
		setIsOpenNotic(true)
	}

	return (
		<>
			<NotificationSettings stateValue={isOpenNotif} onClose={() => setIsOpenNotic(false)} />
			{openModalCity && <UserLocation handleCloseMap={() => setOpenModalCity(false)} />}
			<div style={{ height: isMyProfile ? 1043 : '' }} className={styles.cardMastersProfile}>
				<PageNameArrow style={{ position: 'absolute', top: -55, left: '0%' }} pageName={isMyProfile ? 'МОЙ ПРОФИЛЬ' : 'Профиль специалиста'} routeBack={ROUTES_CATEGORY.showMasters} />
				<div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
					<Avatar src={img} style={{ width: 180, height: 180, cursor: 'pointer' }} />
					{isMyProfile && <img onClick={isMyProfile ? handleOpen : undefined} style={{ position: 'absolute', bottom: 0, right: 25, cursor: 'pointer' }} src={photo_editor} alt="photo_editor" />}
				</div>
				<AvatarLoader stateValue={isOpen} onClose={handleClose} />
				{!isMyProfile ?
					<span className='textSizeL' style={{ color: '#ffff' }}>{fullName.toUpperCase()}
					</span> :
					<NameModal onSubmit={(fullName) => dispatch(addFormMasterData({
						...masterForm,
						fullName: {
							name: fullName.name,
							middlename: fullName.middlename,
							surname: fullName.surname
						}
					}))}>
						<EditField
							name={(masterForm.fullName.surname + ' '
								+ masterForm.fullName.name + ' '
								+ masterForm.fullName.middlename)}
							textStyle={{
								fontSize: '20px',
								fontWeight: 600,
								textTransform: 'uppercase',
								color: 'white',

							}} />
					</NameModal>
				}
				{!isMyProfile ? <span style={{ fontWeight: 600, color: '#ffff' }}>{age} лет</span> :
					<AgeModal updateData='userMasterProfile'>
						<EditField name='Возраст:' buttonText={!masterForm.age ? 'Подтвердить' : ''}
							textField={masterForm.age && masterForm.age + ' ' +
								getAgeWord(Number(masterForm.age))}
							styleTextField={{ fontWeight: 800, color: 'white' }}
							textStyle={{
								color: 'white',
								fontWeight: 300
							}} />
					</AgeModal>
				}
				{!isMyProfile ? <span style={{ fontWeight: 600, color: '#ffff' }}>{address}</span> :
					<LocationModal style={{ color: '#fff', fontWeight: 600 }} handleOpenCity={() => setOpenModalCity(true)} />
				}
				{!isMyProfile ? <span style={{ color: '#ffff' }}>{relocation}</span> :
					<RelocationModal onSubmit={(relocate) => dispatch(addFormMasterData({
						...masterForm,
						relocation: relocate
					}))}>
						<EditField name='Переезд:' buttonText={masterForm.relocation ? '' : 'Подтвердить'}
							textField={masterForm.relocation}
							styleTextField={{ fontWeight: 600, color: 'white', whiteSpace: 'nowrap' }}
							textStyle={{
								color: 'white',
								fontWeight: 300
							}} />
					</RelocationModal>
				}
				{!isMyProfile ? <span style={{ color: '#ffff', display: 'flex', alignItems: 'center', gap: 10 }}>Паспорт {isPassport && <img src={circle_mark} alt="circleMark" />}</span> :
					<PassportConfirmModal updateData='userMasterProfile'>
						<EditField name='Паспорт:'
							buttonText={masterForm.isPassportConfirm ? 'Подтвержден' : 'Подтвердить'}
							textStyle={{
								color: 'white',
								fontWeight: 800
							}} />
					</PassportConfirmModal>
				}
				<>
					{isMyProfile && <div style={{ display: 'flex', gap: 8 }}>
						<span style={{ color: '#fff' }}>Уведомления о вакансиях</span>
						<img onClick={handleOpenNotificat} style={{ cursor: 'pointer' }} src={settings_blue} alt="st" />
					</div>}
				</>
				{!isMyProfile ? <ShowContacts /> :
					<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
						<Button style={{ fontWeight: 400, fontSize: 14 }}>Настройки</Button>
						<Button style={{ fontWeight: 400, backgroundColor: '#8E8E93', color: '#231F20', fontSize: 14 }}>Избранное</Button>
					</div>
				}
				{!isMyProfile ? <SocialsConfirm /> :
					<RightSide /*  data={masterForm} */ style={{ color: 'white', gap: 8 }} />}
			</div>
		</>
	)
}

export default CardMastersProfile
