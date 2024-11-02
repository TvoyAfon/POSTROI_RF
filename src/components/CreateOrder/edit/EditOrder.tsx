import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import arrowLeft from '../../../assets/images/createOrder_img/arrow-left-02-grey.svg'
import arrowRight from '../../../assets/images/createOrder_img/arrow_white.svg'
import { ROUTES_AUTHED_NAVBAR } from '../../../routes/routes'
import { orderService } from '../../../services/order/order'
import { PaymentMethod } from '../../../services/order/types/enums'
import { IOrderFile } from '../../../services/order/types/types'
import { editOrder } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import ErrorPageAnimation from '../../ErrorPageAnimation/ErrorPageAnimation'
import Button from '../../ui/Button/Button'
import Loader from '../../ui/Loader/Loader'
import UncorrectFormat from '../../ui/Modal/UncorrectFormat'
import BaseDataSection from './BaseDataSection'
import styles from './EditOrder.module.scss'
import { IEditOrderState, IValidationErrors } from './types'
import { IFile } from './ui/Files/types'

const EditOrder = () => {
	const nav = useNavigate()
	const [orderData, setOrderData] = useState<IEditOrderState>({
		contactPhone: '',
		address: '',
		paymentMethod: PaymentMethod.EXECUTOR,
		description: '',
		title: ''
	})
	const [errors, setErrors] = useState<IValidationErrors>({
		titleError: '',
		addressError: '',
		descriptionError: '',
		contactPhoneError: ''
	})
	const { orderId } = useParams()
	const { user } = useSelector((state: RootState) => state.auth)
	const { myOrdersList } = useSelector((state: RootState) => state.orders)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [deletedFileLinks, setDeletedFileLinks] = useState<string[]>([])
	const [files, setFiles] = useState<IFile[]>([])
	const [isIncorrectFormat, setIsIncorrectFormat] = useState<boolean>(false)
	const dispatch = useDispatch()

	useEffect(() => { console.log('фАЙЛЫ', files) }, [files])
	const order = useMemo(() => myOrdersList.find((order) => order.id === Number(orderId)), [myOrdersList, orderId])

	if (!order) {
		return <ErrorPageAnimation />
	}

	const handleBack = () => {
		nav(ROUTES_AUTHED_NAVBAR.ordersAndProjects)
	}

	const handleSetError = (name: string, value: string) => {
		setErrors(prev => { return { ...prev, [name]: value } })
	}

	const handleAddNewFiles = async () => {
		if (!orderId || !user?.id || !files.length) return

		try {
			const newFiles = files
				.filter(file => file.url === null)
				.map(file => file.blob)

			const response = await orderService.filesAdd(
				{
					order_id: Number(orderId),
					client_id: user.id
				},
				newFiles
			)
			return response
		} catch (error: any) {
			if (error.message.includes('Invalid file type')) {
				return 'invalid_format'
			}
			console.log('files add error', error)
		}
	}

	const handleDeleteFiles = async () => {
		if (!orderId || !user?.id || !deletedFileLinks.length) return

		try {
			await orderService.filesRemove(
				{
					order_id: Number(orderId),
					client_id: user.id
				},
				deletedFileLinks
			)
		} catch (error) {
			console.log('files remove error', error)
		}
	}

	const handleEdit = async () => {
		if (!user?.id || !orderId) return

		const { title, description, contactPhone, paymentMethod, address } = orderData
		let hasError = false

		if (!title.trim()) {
			handleSetError('titleError', 'Заполните это поле!')
			hasError = true
		}
		if (!address.trim()) {
			handleSetError('addressError', 'Заполните это поле!')
			hasError = true
		}
		if (!description.trim()) {
			handleSetError('descriptionError', 'Заполните это поле!')
			hasError = true
		}
		if (!contactPhone.trim()) {
			handleSetError('contactPhoneError', 'Заполните это поле!')
			hasError = true
		}

		if (contactPhone.length < 12) {
			handleSetError('contactPhoneError', 'Введите валидный номер телефона!')
			hasError = true
		}

		if (hasError) {
			return
		}

		try {
			setIsLoading(true)
			const orderIdNum = Number(orderId)

			await orderService.edit({
				client_id: user.id,
				order_id: orderIdNum,
				title,
				description,
				address,
				contact_phone: contactPhone,
				payment_method: paymentMethod
			})

			const result = await handleAddNewFiles()
			await handleDeleteFiles()

			if (result === 'invalid_format') {
				return setIsIncorrectFormat(true)
			}

			const orderFiles = files
				.map<IOrderFile>(file => {
					return {
						file: file.url || URL.createObjectURL(file.blob),
						filename: file.blob.name
					}
				})
				.filter(file => !deletedFileLinks.includes(file.file))

			dispatch(editOrder({
				orderId: orderIdNum,
				data: {
					...orderData,
					files: orderFiles
				}
			}))

			handleBack()
		}
		catch (error) {
			const errorStr = JSON.stringify(error)

			if (errorStr.includes('Invalid address')) {
				handleSetError('addressError', 'Введите валидный адрес')
			}

			alert(`[DEBUG] Не удалось изменить заказ: ${error}`)
		}
		finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles['container__wrapper']}>
				<div className={styles['container__action']}>
					<span style={{
						textTransform: 'uppercase',
						fontSize: '20px',
						color: '#fff',
						textAlign: 'center',
						fontWeight: '600'
					}}>Редактирование</span>
				</div>
				{
					isIncorrectFormat
					&&
					<UncorrectFormat
						style={{
							textAlign: 'center',
							top: '50%'
						}}
						text='НЕВЕРНЫЙ ФОРМАТ ФАЙЛА ДЛЯ ЗАГРУЗКИ'
						onClose={() => setIsIncorrectFormat(false)}
					/>
				}
				<div className={styles['container__edit-content']}>
					<BaseDataSection
						files={files}
						setFiles={setFiles}
						deletedFileLinks={deletedFileLinks}
						setDeletedFileLinks={setDeletedFileLinks}
						order={order}
						errors={errors}
						setErrors={setErrors}
						setOrderData={setOrderData}
						orderData={orderData}
					/>
					<div style={{
						display: 'flex',
						gap: '22px'
					}}>
						<Button onClick={handleBack} style={{
							color: '#C5C5C5'
						}} icon={arrowLeft} variant='grey'>
							Отмена
						</Button>
						<Button onClick={handleEdit} rightIcon={isLoading ? undefined : arrowRight}>
							{
								isLoading
									?
									<Loader color='#fff' />
									: 'Сохранить изменения'
							}
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditOrder