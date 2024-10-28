import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES_NAVBAR } from '../../../../routes/routes'
import { ICard, updateCard } from '../../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { RootState } from '../../../../store/store'
import PriceforService from '../../../Profile/MyProfile/AboutProfile/TabsComponents/Services/EditServices/ui/PriceForService/PriceforService'
import Button from '../../../ui/Button/Button'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import CreateOrderTextArea from '../../../ui/CreateOrderTextArea/CreateOrderTextArea'
import Field from '../../../ui/Field/Field'
import InputAddress from '../../../ui/InputAddress/InputAddress'
import PageNameArrow from '../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../../Signs.module.scss'
import SignsCardDetailFiles from '../ui/SignsCardDetailFiles'

const SignsEditCard: React.FC = () => {
	const { id } = useParams()
	const nav = useNavigate()
	const dispatch = useDispatch()
	const card = useSelector((state: RootState) => state.signsData.cards.find(c => c.id === id))

	const [formData, setFormData] = useState<ICard>({
		id: id!,
		data: {
			categoryType: '',
			subCategoryType: '',
			subsubCategoryType: '',
			subsubsubCategoryType: '',
			taskName: '',
			price: '',
			address: '',
			experience: '',
			description: '',
			communication: {
				calls: false,
				messages: false
			},
			additionally: {
				contract: false,
				materials: false,
				warranty: false
			},
			filesSigns: []
		}
	})

	useEffect(() => {
		if (card) {
			setFormData(card)
		}
	}, [card])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			data: {
				...formData.data,
				[name]: value,
			},
		})
	}

	const handleClickWarrantly = () => {
		setFormData({
			...formData,
			data: {
				...formData.data,
				additionally: {
					...formData.data.additionally,
					warranty: !formData.data.additionally.warranty
				}
			}
		})
	}
	const handleClickContract = () => {
		setFormData({
			...formData,
			data: {
				...formData.data,
				additionally: {
					...formData.data.additionally,
					contract: !formData.data.additionally.contract
				}
			}
		})
	}
	const handleClickMaterials = () => {
		setFormData({
			...formData,
			data: {
				...formData.data,
				additionally: {
					...formData.data.additionally,
					materials: !formData.data.additionally.materials
				}
			}
		})
	}

	const handleSubmit = () => {
		dispatch(updateCard({ ...formData }))

		nav(ROUTES_NAVBAR.signs)
	}
	// Добавить загрузку и удаление файлов //
	return (
		<div className={styles.signsEditCard}>
			<div style={{ backgroundColor: "#fff", padding: 32, borderRadius: 32, width: 1200 }} className='flex-column gap-medium-large'>
				<PageNameArrow style={{ position: 'absolute', top: 110 }} routeBack={ROUTES_NAVBAR.signs} pageName='Редактирование объявления' />
				<div className='flex-column gap-medium'>
					<div className='flex-column gap-small'>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='textSizeL'>Название объявления</span>
						</div>
						<Field value={formData.data.taskName} onChange={handleInputChange} name='taskName' style={{ width: '100%' }} />
					</div>
					<PriceforService name='price' onChange={handleInputChange} value={formData.data.price} />
					<div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
						<span className='textSizeL'>Адрес</span>
						<span style={{ fontWeight: 300, color: '#8E8E93' }}>Укажите, где вы оказываете услуги, например адрес, район или город </span>
						<InputAddress value={formData.data.address} onChange={handleInputChange} name='address' style={{ width: '100%' }} />
					</div>
					<div className='flex-column gap-medium'>
						<span className='textSizeL'>Опыт работы</span>
						<Field onChange={handleInputChange} value={formData.data.experience} name='experience' placeholder='Ваш опыт работы' />

					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
						<span className='textSizeL'>Текст объявления</span>
						<CreateOrderTextArea value={formData.data.description} onChange={handleInputChange} name='description' style={{ height: 200 }} />
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
						<span className='textSizeL'>Дополнительно</span>
						<CheckboxButton onClick={() => handleClickContract()} checked={formData.data.additionally.contract} label='Работаю по договору' />
						<CheckboxButton onClick={() => handleClickWarrantly()} checked={formData.data.additionally.warranty} label='Гарантия на работу' />
						<CheckboxButton onClick={() => handleClickMaterials()} checked={formData.data.additionally.materials} label='Возможная закупка материала' />
					</div>
					<div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='textSizeL'>Фото</span>
						</div>
						{card && <SignsCardDetailFiles isEdit card={card} />}
					</div>
					<div style={{ display: 'grid', gridTemplateColumns: '10fr  1fr 10fr', paddingTop: 32 }}>
						<Button onClick={() => nav(ROUTES_NAVBAR.signs)} style={{ backgroundColor: "#F4F3F1", color: '#262626' }}>Отмена</Button>
						<div />
						<Button onClick={handleSubmit}>Разместить</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignsEditCard
