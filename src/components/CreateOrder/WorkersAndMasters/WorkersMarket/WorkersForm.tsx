import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IDefaultModal } from '../../../../interface/modal.props'
import { ROUTES_CATEGORY } from '../../../../routes/routes'
import { addFormWorkerData, clearFormWorkerData } from '../../../../store/slices/FormWorker/formWorkerSlice'
import { addOpenWorkerDone } from '../../../../store/slices/other/closeWorkerFormSlice'
import { RootState } from '../../../../store/store'
import UserLocation from '../../../Navbar/UserLocation/UserLocation'
import Button from '../../../ui/Button/Button'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import CreateOrderTextArea from '../../../ui/CreateOrderTextArea/CreateOrderTextArea'
import Field from '../../../ui/Field/Field'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import styles from '../WorkersAndMaterials.module.scss'
import CheckBoxGroup from './ui/CheckBoxGroup'
import WorkersAndMastersModalSms from './WorkersAndMastersModalSms'


const WorkersForm: React.FC<IDefaultModal> = ({ onClose }) => {
	const dispatch = useDispatch()
	const [openMap, setOpenMap] = useState(false)
	const { city } = useSelector((state: RootState) => state.currentCity)
	const { userWorkerFormData } = useSelector((state: RootState) => state.formWorkerReducer)
	const { isOpenWorkerDone } = useSelector((state: RootState) => state.openWorkerDone)
	const [error, setError] = useState(false)
	const nav = useNavigate()
	const [openModalPhone, setOpenModalPhone] = useState(false)
	const [about, setAbout] = useState('')
	const [phone, setPhone] = useState('')
	const buttonRef = useRef<HTMLButtonElement>(null)

	const handleEnter = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			buttonRef.current?.click()
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleEnter)

		return () => {
			window.removeEventListener('keydown', handleEnter)
		}
	}, [])

	const handleOpenModalPhone = () => {
		setOpenModalPhone(true)
	}
	const handleCloseModalPhone = () => {
		setOpenModalPhone(false)
	}

	const handleCloseForm = () => {
		dispatch(clearFormWorkerData())
		onClose && onClose()
	}

	const [fullName, setFullName] = useState({
		name: '',
		surname: '',
		middlename: ''
	})

	const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const russianLettersRegex = /^[а-яё]+$/i
		if (e.target.value === "" || russianLettersRegex.test(e.target.value)) {
			setFullName(prevState => ({
				...prevState,
				[e.target.name]: e.target.value
			}))
		}
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
			dispatch(addFormWorkerData({ ...userWorkerFormData, phone: valuePhone })) // Используем valuePhone в dispatch
		}
	}

	const handleChangeAbout = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setAbout(e.target.value)
		dispatch(addFormWorkerData({ ...userWorkerFormData, about }))
	}

	const handleContinue = () => {
		if (userWorkerFormData.about.length === 0 || userWorkerFormData.phone.length < 12 || fullName.surname.length < 2 || fullName.name.length < 2) return setError(true)        /* Небольшая валидация на все поля */
		else
			setError(false)
		dispatch(addFormWorkerData({
			...userWorkerFormData,
			location: city,
			fullName: {
				name: fullName.name,
				surname: fullName.surname,
				middlename: fullName.middlename,
			}
		}))

		handleOpenModalPhone()
	}

	const handleCloseMap = () => {
		setOpenMap(false)
	}

	const handleContinueReg = () => {
		dispatch(addOpenWorkerDone(true))
	}

	const handleCloseModalReg = () => {
		nav(ROUTES_CATEGORY.showWorkersOrder)
		dispatch(addOpenWorkerDone(false))
	}
	return (
		<>
			{openModalPhone && <WorkersAndMastersModalSms
				phoneValue={userWorkerFormData.phone}
				handleCloseModal={handleCloseModalReg}
				handleСontinue={handleContinueReg}
				onClose={handleCloseModalPhone} />}
			{openMap && <UserLocation handleCloseMap={handleCloseMap} />}
			{!isOpenWorkerDone && <div className={styles['workersFormWithContainer']}>
				<ModalContainer isOnOverlay={true} style={{ width: 874, zIndex: !openMap ? 11 : 5, marginTop: 50 }}>
					<div className={styles.workersForm_container} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='textSizeL' >АНКЕТА РАЗНОРАБОЧЕГО</span>
							<CloseButton onClick={handleCloseForm} />
						</div>
						<span className='textSizeL'>Местоположение</span>
						<div style={{ display: 'flex', gap: 16 }}>
							<Field disabled={true} value={city} style={{ width: 700 }} />
							<Button style={{ height: 40 }} onClick={() => setOpenMap(true)}>Карта</Button>
						</div>
						<span className='textSizeL' >Фамилия*</span>
						<Field name='surname' value={fullName.surname} onChange={handleChangeFullName} style={{ width: '100%' }} />
						<span className='textSizeL'>Имя*</span>
						<Field name='name' value={fullName.name} onChange={handleChangeFullName} style={{ width: '100%' }} />
						<span className='textSizeL'>Отчество</span>
						<Field value={fullName.middlename} name='middlename' onChange={handleChangeFullName} style={{ width: '100%' }} />
						<div style={{ display: 'flex', gap: 32 }}>
							<CheckBoxGroup onClick2={handleChooseLoader} checked1={userWorkerFormData.workerType.worker} checked2={userWorkerFormData.workerType.loader} onClick1={handleChooseWorkers} label1='Разнорабочий' label2='Грузчик' />
						</div>
						<span className='textSizeL'>Номер телефона*</span>
						<Field onChange={handleChangePhone} value={phone} style={{ width: '100%' }} />
						<span className='textSizeL'>О себе</span>
						<CreateOrderTextArea onChange={handleChangeAbout} value={about} style={{ height: 103 }} />
						<Button ref={buttonRef} onClick={handleContinue}>Зарегестрироваться</Button>
					</div>
					{error ? <span style={{ color: 'red', fontSize: 14, display: 'flex', justifyContent: 'center', paddingTop: 4 }}>Пожалуйста,заполните все поля.</span> : null}
				</ModalContainer>
			</div>}
		</>
	)
}

export default WorkersForm
