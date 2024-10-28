import { Dispatch, SetStateAction } from 'react'
import { PaymentMethod } from '../../../services/order/types/enums'
import { IOrderFile, IOrderFullInfo } from '../../../services/order/types/types'
import { IFile } from './ui/Files/types'

export interface IEditOrderState {
	contactPhone: string
	address: string
	title: string
	description: string
	paymentMethod: PaymentMethod
	files?: IOrderFile[]
}

export interface IValidationErrors {
	contactPhoneError: string
	addressError: string
	titleError: string
	descriptionError: string
}

export interface IBaseDataSectionProps {
	orderData: IEditOrderState
	setOrderData: Dispatch<SetStateAction<IEditOrderState>>
	errors: IValidationErrors
	setErrors: Dispatch<SetStateAction<IValidationErrors>>
	order?: IOrderFullInfo
	setDeletedFileLinks: Dispatch<SetStateAction<string[]>>
	deletedFileLinks: string[]
	setFiles: Dispatch<SetStateAction<IFile[]>>
	files: IFile[]
}