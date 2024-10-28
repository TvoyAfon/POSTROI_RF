import { ChangeEvent, FC, FormEventHandler, useEffect } from 'react'
import { validationNumber } from '../../../common/validationNumber'
import { PaymentMethod } from '../../../services/order/types/enums'
import TelephoneInput from '../../ui/CreateOrderContactInput/TelephoneInput'
import Field from '../../ui/Field/Field'
import InputAddress from '../../ui/InputAddress/InputAddress'
import Textarea from '../../ui/Textarea/Textarea'
import { IBaseDataSectionProps } from './types'
import FilesForm from './ui/Files/FilesForm'
import { IFile } from './ui/Files/types'
import InvalidField from './ui/InvalidField'
import PaymentMethodWidget from './ui/PaymentMethodWidget/PaymentMethodWidget'
import { convertFileDataToFile } from './utils/utils'

const BaseDataSection: FC<IBaseDataSectionProps> = ({
	orderData,
	setOrderData,
	errors,
	setErrors,
	order,
	files,
	setFiles,
	setDeletedFileLinks
}) => {
	useEffect(() => {
		if (order) {
			const { contact_phone, address, payment_method, description, name } = order
			setOrderData({
				contactPhone: contact_phone,
				address,
				title: name,
				description,
				paymentMethod: payment_method,
			})
		}
	}, [order, setOrderData])

	useEffect(() => {
		(async () => {
			if (!order) return
			const result: IFile[] = []

			for (let i = 0; i < order.files.length; i++) {
				result.push(await convertFileDataToFile(order.files[i]))
			}

			setFiles(result)
		})()
	}, [order])

	const handleChangeContactPhone = (e: ChangeEvent<HTMLInputElement>) => {
		const val = validationNumber(e)
		if (val.length < 13) {
			updateOrderData('contactPhone', val)
			clearError('contactPhoneError')
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target

		updateOrderData(name, value)

		if (value.trim()) {
			clearError(`${name}Error`)
		}
	}

	const handleChangePaymentMethod = (method: PaymentMethod) => {
		updateOrderData('paymentMethod', method)
	}

	const updateOrderData = (name: string, value: string | PaymentMethod) => {
		setOrderData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const clearError = (errorName: string) => {
		setErrors((prev) => ({
			...prev,
			[errorName]: '',
		}))
	}

	const handleAddFiles = (files: IFile[]) => {
		setFiles(prev => [...prev, ...files])
	}

	const handleDeleteFile = (file: IFile) => {
		setFiles(prev => prev.filter(_file => _file.blob.name !== file.blob.name))

		if (!file.url) return
		setDeletedFileLinks(prev => [...prev, file.url as string])
	}

	return (
		<>
			<div>
				<Field
					name='title'
					style={{ width: '100%' }}
					label='Название заказа'
					onChange={handleChange}
					value={orderData.title}
				/>
				{errors.titleError && <InvalidField>{errors.titleError}</InvalidField>}
			</div>
			<div>
				<Textarea
					onChange={handleChange as FormEventHandler<HTMLTextAreaElement>}
					value={orderData.description}
					name='description'
					label='Задача'
					subLabel='Опишите свою задачу максимально понятно, чтобы мастер понял, что ему нужно для выполнения этой задачи'
				/>
				{errors.descriptionError && <InvalidField>{errors.descriptionError}</InvalidField>}
			</div>
			<FilesForm
				onDeleteFile={handleDeleteFile}
				onAddFiles={handleAddFiles}
				files={files}
			/>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<span style={{ color: '#231F20', fontWeight: '600' }}>Где выполнить работу?</span>
				<div>
					<InputAddress
						onChange={handleChange}
						value={orderData.address}
						name='address'
					/>
					{errors.addressError && <InvalidField>{errors.addressError}</InvalidField>}
				</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<span style={{ color: '#231F20', fontWeight: '600' }}>Контактный телефон</span>
				<div>
					<TelephoneInput
						name='contactPhone'
						onChange={handleChangeContactPhone}
						placeholder='+7'
						style={{ width: 284 }}
						value={orderData.contactPhone}
					/>
					{errors.contactPhoneError && <InvalidField>{errors.contactPhoneError}</InvalidField>}
				</div>
			</div>
			<PaymentMethodWidget
				defaultPaymenthod={orderData.paymentMethod}
				onChangeMethod={handleChangePaymentMethod}
			/>
		</>
	)
}

export default BaseDataSection