import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IDefaultModal } from '../../../../../interface/modal.props'
import { ROUTES_CATEGORY } from '../../../../../routes/routes'
import { chooseVakancyPage } from '../../../../../store/slices/currentMastersPageType/currentPageTypeSlice'
import { addFormMasterData, clearMasterFormData } from '../../../../../store/slices/FormMaster/formMasterSlice'
import { addOpenMasterDone } from '../../../../../store/slices/other/closeWorkerFormSlice'
import { RootState } from '../../../../../store/store'
import UserLocation from '../../../../Navbar/UserLocation/UserLocation'
import Button from '../../../../ui/Button/Button'
import CloseButton from '../../../../ui/CloseButton/CloseButton'
import Field from '../../../../ui/Field/Field'
import ModalContainer from '../../../../ui/Modal/ModalContainer'
import WorkersAndMastersModalSms from '../../WorkersMarket/WorkersAndMastersModalSms'

const MastersForm: React.FC<IDefaultModal> = ({ onClose }) => {
	const dispatch = useDispatch()
	const [openMap, setOpenMap] = useState(false)
	const { city } = useSelector((state: RootState) => state.currentCity)
	const { masterForm } = useSelector((state: RootState) => state.formMasterReducer)
	const [error, setError] = useState(false)
	const [phone, setPhone] = useState('')
	const [openModalPhone, setOpenModalPhone] = useState(false)
	const { isOpenMasterDone } = useSelector((state: RootState) => state.openWorkerDone)
	const nav = useNavigate()
	const buttonRef = useRef<HTMLButtonElement>(null)

	const [fullName, setFullName] = useState({
		name: '',
		surname: '',
		middlename: ''
	})

	const handleEnter = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			buttonRef.current?.click()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleEnter)
		return () => {
			document.removeEventListener('keydown', handleEnter)
		}
	}, [])

	const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const russianLettersRegex = /^[а-яё]+$/i
		if (e.target.value === "" || russianLettersRegex.test(e.target.value)) {
			setFullName(prevState => ({
				...prevState,
				[e.target.name]: e.target.value
			}))
		}
	}

	const handleCloseMap = () => {
		setOpenMap(false)
	}

	const handleCloseForm = () => {
		dispatch(clearMasterFormData())
		onClose && onClose()
	}

	const handleContinue = () => {
		if (masterForm.phone.length < 12 || fullName.surname.length < 2 || fullName.name.length < 2) return setError(true)        /* Небольшая валидация на все поля */
		else
			setError(false)
		dispatch(addFormMasterData({
			...masterForm,
			fullName: {
				name: fullName.name,
				middlename: fullName.middlename,
				surname: fullName.surname
			}
		}))
		setOpenModalPhone(true)
		dispatch(chooseVakancyPage(true))
	}
	const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		let valuePhone = e.target.value.replace(/\D/g, '')

		// Добавляем префикс +7, если это необходимо
		if (valuePhone.length >= 1) {
			if (valuePhone.slice(0, 2) !== "+7") {
				valuePhone = "+7" + valuePhone.slice(1)
			}
		}

		if (valuePhone.length <= 13) {
			setPhone(valuePhone)
			dispatch(addFormMasterData({ ...masterForm, phone: valuePhone })) // Используем valuePhone в dispatch
		}
	}
	const handleCloseModalReg = () => {
		nav(ROUTES_CATEGORY.showVakancy)
		dispatch(addOpenMasterDone(false))
	}
	const handleContinueReg = () => {
		dispatch(addOpenMasterDone(true))
	}
	const handleCloseModalPhone = () => {
		setOpenModalPhone(false)
	}


	return (
		<>
			{openModalPhone && <WorkersAndMastersModalSms
				phoneValue={masterForm.phone}
				handleCloseModal={handleCloseModalReg}
				handleСontinue={handleContinueReg}
				onClose={handleCloseModalPhone} />}
			{!isOpenMasterDone && <>
				{openMap && <UserLocation handleCloseMap={handleCloseMap} />}
				<ModalContainer style={{ width: 874 }} isOnOverlay={true} zIndex={11}>
					<div className='flex-column'>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='textSizeL'>АНКЕТА СПЕЦИАЛИСТА</span>
							<CloseButton onClick={handleCloseForm} />
						</div>
						<div style={{ display: 'flex', gap: 14 }}>
							<Field inputStyle={{ width: 710 }} value={city} />
							<Button style={{ height: 40 }} onClick={() => setOpenMap(true)}>Карта</Button>
						</div>
						<div className='flex-column gap-medium'>
							<span className='textSizeL'>Фамилия*</span>
							<Field value={fullName.surname} onChange={handleChangeFullName} name='surname' style={{ width: '100%' }} />
						</div>
						<div className='flex-column gap-medium'>
							<span className='textSizeL'>Имя*</span>
							<Field value={fullName.name} onChange={handleChangeFullName} name='name' style={{ width: '100%' }} />
						</div>
						<div className='flex-column gap-medium'>
							<span className='textSizeL'>Отчество</span>
							<Field value={fullName.middlename} onChange={handleChangeFullName} name='middlename' style={{ width: '100%' }} />
						</div>
						<div className='flex-column gap-medium'>
							<span className='textSizeL'>Номер телефона*</span>
							<Field value={phone} onChange={handleChangePhone} style={{ width: '100%' }} />
						</div>
						<Button ref={buttonRef} onClick={handleContinue}>Зарегестрироваться</Button>
					</div>
					{error && <div style={{ textAlign: 'center' }}>
						<span style={{ color: 'red', fontSize: 14 }}>Пожалуйста, заполните все поля</span>
					</div>}
				</ModalContainer>
			</>}
		</>
	)
}

export default MastersForm
