import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEditWorkerProfile } from '../FormWorker/formWorkerSlice'

export interface IMasterForm {
	fullName: {
		name: string
		surname: string
		middlename: string
	},
	phone: string,
	location: string,
	age: string,
	relocation: string,
	isPassportConfirm: boolean,
	email: string,
	passport: {
		code: string
		dateOfBirth: string,
		issue: string
		issuedBy: string
		middlename: string
		name: string
		photoPassport?: string
		seriesAndNumber: string
		surname: string
	},
}
export interface IProfDevelopment {
	year: string,
	univercityName: string,
	devSpecialization: string
}

export interface IEducational extends IProfDevelopment { }

export interface IMasterResume extends IEditWorkerProfile {
	skills: String[],
	profDevelopment: IProfDevelopment,
	expDrive: {
		categoryDrive: String[],
		isCar: 'Есть личный автомобиль' | 'Нет личного автомобиля' | null
	}


}

interface IState {
	masterForm: IMasterForm,
	masterResume: IMasterResume
}

const initialState: IState = {
	masterForm: {
		fullName: {
			name: '',
			surname: '',
			middlename: '',
		},
		phone: '',
		location: '',
		age: '',
		relocation: '',
		isPassportConfirm: false,
		email: '',
		passport: {
			code: '',
			dateOfBirth: '',
			issue: '',
			issuedBy: '',
			middlename: '',
			name: '',
			photoPassport: "",
			seriesAndNumber: '',
			surname: ''
		},
	},
	masterResume: {
		age: '',
		experience: '',
		skills: [],
		price: '',
		profileFullName: "",
		profDevelopment: {
			devSpecialization: '',
			univercityName: '',
			year: ""
		},

		educational: {
			degree: '',
			educationalName: '',
			educSpecializtion: '',
			faculty: '',
			yearComplete: '',
		},
		email: "",
		expDrive: {
			categoryDrive: [],
			isCar: null
		},

	}
}

export const formMasterSlice = createSlice({
	name: 'formMaster',
	initialState,
	reducers: {
		addFormMasterData(state, action: PayloadAction<IMasterForm>) {
			state.masterForm = action.payload
		},
		addMasterResumeData(state, action: PayloadAction<IMasterResume>) {
			state.masterResume = action.payload
		},
		clearMasterFormData(state) {
			state.masterForm = {
				...state.masterForm,
				fullName: {
					name: '',
					surname: '',
					middlename: '',
				},
				phone: '',
				location: '',
				age: '',
				relocation: '',
				email: ''
			}
		}
	}
})

export const { addFormMasterData, addMasterResumeData, clearMasterFormData } = formMasterSlice.actions
export default formMasterSlice.reducer