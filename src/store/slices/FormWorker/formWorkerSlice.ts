import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPassportFields } from '../../../interface/user.props'


export interface IUserWorkerForm {
	location: string,
	fullName: {
		name: string,
		surname: string,
		middlename?: string,
	}
	workerType: {
		worker: boolean,
		loader: boolean
	},
	phone: string,
	about: string
}

export interface IEditWorkerProfile {
	profileFullName: string,
	experience: string,
	educational: {
		degree: string | null,
		educationalName: string,
		faculty: string,
		educSpecializtion: string,
		yearComplete: string
	},
	age: string,
	passport?: IPassportFields,
	price: string,
	email: string
}

interface IState {
	userWorkerFormData: IUserWorkerForm,
	userWorkerProfileData: IEditWorkerProfile
}


const initialState: IState = {
	userWorkerFormData: {
		location: '',
		fullName: {
			name: '',
			surname: '',
			middlename: '',
		},
		workerType: {
			worker: false,
			loader: false
		},
		phone: '',
		about: ''
	},
	userWorkerProfileData: {
		profileFullName: '',
		experience: '',
		educational: {
			degree: '',
			educationalName: '',
			faculty: '',
			educSpecializtion: '',
			yearComplete: ' '
		},
		age: '',
		passport: {
			name: '',
			surname: '',
			middlename: '',
			dateOfBirth: '',
			seriesAndNumber: '',
			issue: '',
			issuedBy: '',
			code: '',
			photoPassport: '',
			passportCheck: false || null
		},
		price: '',
		email: ''
	}
}

export const formWorkerSlice = createSlice({
	name: 'formWorker',
	initialState,
	reducers: {
		addFormWorkerData(state, action: PayloadAction<IUserWorkerForm>) {
			state.userWorkerFormData = action.payload
		},
		addUserProfileData(state, action: PayloadAction<IEditWorkerProfile>) {
			state.userWorkerProfileData = action.payload
		},
		clearFormWorkerData(state) {
			state.userWorkerFormData = {
				fullName: {
					name: '',
					surname: '',
					middlename: ''
				},
				location: "",
				about: "",
				phone: '',
				workerType: {
					loader: false,
					worker: false
				}
			}
		}
	}
})

export const { addFormWorkerData, addUserProfileData, clearFormWorkerData } = formWorkerSlice.actions
export default formWorkerSlice.reducer