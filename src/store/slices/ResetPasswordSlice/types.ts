export interface IPassword {
	password: string
	confirmPassword: string
}

export interface IEmailOrPhone {
	value: string
	isPhone: boolean
}

export interface IFormData {
	emailOrPhone: IEmailOrPhone
	verificationCode: string
	password: IPassword
}


export interface IState {
	emailModal: boolean,
	newPasswordModal: boolean
	verificationCodeModal: boolean
	resetPasswordDoneModal: boolean
	formData: IFormData
}