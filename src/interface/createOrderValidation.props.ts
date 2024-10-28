export interface IValidationOrder {
	isTextError: boolean,
	isButtonChecked: boolean
}

export interface IAddErrorPayload {
	fieldName: string
	data: IValidationOrder
}