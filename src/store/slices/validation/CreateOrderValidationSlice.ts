import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ErrorButton from '../../../components/ui/ErrorForm/ErrorButton'
import ErrorCategory from '../../../components/ui/ErrorForm/ErrorCategory'
import ErrorInputField from '../../../components/ui/ErrorForm/ErrorInputField'

interface IState {
	inputTaskName: string,
	inputSquare: string,
	inputDescription: string,
	inputExperience: string,
	inputEmail: string,
	inputPrice: string,
	inputMaterials: string,
	radioPollution: boolean
	inputAddress: string,
	inputDate: string,
	inputTelephone: string,
	radioButtonPay: boolean,
	radioButton: boolean,
	categories: boolean,

	clickFlag: boolean

	error: {
		inputTaskNameError: React.FC<{}> | null,
		inputSquareError: React.FC<{}> | null,
		inputDescriptionError: React.FC<{}> | null,
		inputMaterialsError: React.FC<{}> | null,
		inputAddressError: React.FC<{}> | null,
		inputDateError: React.FC<{}> | null,
		inputTelephoneError: React.FC<{}> | null,
		radioButtonError: React.FC<{}> | null,
		radioPollutionError: React.FC<{}> | null,
		radioButtonPayError: React.FC<{}> | null,
		categoriesError: React.FC<{}> | null,

		inputExperienceError: React.FC<{}> | null,
		inputPriceError: React.FC<{}> | null,
		inputEmailError: React.FC<{}> | null,
	}
}

const initialState: IState = {
	inputDescription: '',
	inputSquare: '',
	inputExperience: '',
	inputEmail: '',
	inputPrice: '',
	inputMaterials: '',
	inputAddress: '',
	inputDate: '',
	inputTelephone: '',
	radioButtonPay: false,
	radioPollution: false,
	inputTaskName: '',
	radioButton: false,
	categories: false,

	clickFlag: false,

	error: {
		inputSquareError: null,
		inputDescriptionError: null,
		inputMaterialsError: null,
		inputAddressError: null,
		radioPollutionError: null,
		inputDateError: null,
		inputTelephoneError: null,
		inputTaskNameError: null,
		radioButtonError: null,
		radioButtonPayError: null,
		categoriesError: null,

		inputExperienceError: null,
		inputPriceError: null,
		inputEmailError: null
	}
}

const validationCategoriesSlice = createSlice({
	name: 'validationCategories',
	initialState,
	reducers: {
		addInputTaskNameError(state, action: PayloadAction<string>) {
			state.inputTaskName = action.payload
			if (state.inputTaskName.length === 0) {
				state.error.inputTaskNameError = ErrorInputField
			}
			if (state.inputTaskName) {
				state.error.inputTaskNameError = null
			}
		},
		addInputDescriptionError(state, action: PayloadAction<string>) {
			state.inputDescription = action.payload
			if (state.inputDescription.length === 0) {
				state.error.inputDescriptionError = ErrorInputField
			} else state.error.inputDescriptionError = null
		},
		addInputMaterialsError(state, action: PayloadAction<string>) {
			state.inputMaterials = action.payload
			if (state.inputMaterials.length === 0) {
				state.error.inputMaterialsError = ErrorInputField
			} else state.error.inputMaterialsError = null
		},
		addInputSquareError(state, action: PayloadAction<string>) {
			state.inputSquare = action.payload
			if (state.inputSquare.length === 0) {
				state.error.inputSquareError = ErrorInputField
			} else state.error.inputSquareError = null
		},
		addRadioButtonError(state, action: PayloadAction<boolean>) {
			state.radioButton = action.payload
			if (state.radioButton) {
				state.error.radioButtonError = ErrorButton
			} else state.error.radioButtonError = null
		},
		addRadioPollutionError(state, action: PayloadAction<boolean>) {
			state.radioPollution = action.payload
			if (state.radioPollution) {
				state.error.radioPollutionError = ErrorButton
			} else state.error.radioPollutionError = null
		},
		addCategoryError(state, action: PayloadAction<boolean>) {
			state.categories = action.payload
			if (state.categories) {
				state.error.categoriesError = ErrorCategory
			} else state.error.categoriesError = null
		},
		addAddressError(state, action: PayloadAction<string>) {
			state.inputAddress = action.payload
			if (state.inputAddress.length === 0) {
				state.error.inputAddressError = ErrorInputField
			} else state.error.inputAddressError = null
		},
		addDateError(state, action: PayloadAction<string>) {
			state.inputDate = action.payload
			if (state.inputDate.length === 0) {
				state.error.inputDateError = ErrorInputField
			} else state.error.inputDateError = null
		},
		addTelephoneError(state, action: PayloadAction<string>) {
			state.inputTelephone = action.payload
			if (state.inputTelephone.length < 2) {
				state.error.inputTelephoneError = ErrorInputField
			} else state.error.inputTelephoneError = null
		},
		addPayError(state, action: PayloadAction<boolean>) {
			state.radioButtonPay = action.payload
			if (state.radioButtonPay) {
				state.error.radioButtonPayError = ErrorButton
			} else state.error.radioButtonPayError = null
		},

		addPriceError(state, action: PayloadAction<string>) {
			state.inputPrice = action.payload
			if (state.inputPrice.length === 0) {
				state.error.inputPriceError = ErrorInputField
			} else state.error.inputDateError = null
		},
		addExperinceError(state, action: PayloadAction<string>) {
			state.inputExperience = action.payload
			if (state.inputExperience.length === 0) {
				state.error.inputExperienceError = ErrorInputField
			} else state.error.inputDateError = null
		},
		addEmailError(state, action: PayloadAction<string>) {
			state.inputEmail = action.payload
			if (state.inputEmail.length === 0)
				state.error.inputEmailError = ErrorInputField
			else state.error.inputEmailError = null
		},



		addClickFlag(state, action: PayloadAction<boolean>) {
			state.clickFlag = action.payload
			if (state.clickFlag) {
				state.error.inputTaskNameError = ErrorInputField
				state.error.inputDescriptionError = ErrorInputField
				state.error.radioButtonError = ErrorButton
				state.error.inputDateError = ErrorInputField
				state.error.inputTelephoneError = ErrorInputField
				state.error.inputAddressError = ErrorInputField
				state.error.inputMaterialsError = ErrorInputField
				state.error.radioButtonPayError = ErrorButton
				state.error.radioPollutionError = ErrorButton
				state.error.inputMaterialsError = ErrorInputField
				state.error.inputSquareError = ErrorInputField
				state.error.inputExperienceError = ErrorInputField
				state.error.inputPriceError = ErrorInputField
				state.error.inputEmailError = ErrorInputField
			} else {
				state.error.radioButtonError = null
				state.error.inputTaskNameError = null
				state.error.inputDescriptionError = null
				state.error.inputDateError = null
				state.error.inputTelephoneError = null
				state.error.inputAddressError = null
				state.error.inputMaterialsError = null
				state.error.radioButtonPayError = null
				state.error.radioPollutionError = null
				state.error.inputMaterialsError = null
				state.error.inputSquareError = null
				state.error.inputExperienceError = null
				state.error.inputPriceError = null
				state.error.inputEmailError = null
			}
		}
	}
})

export const { addInputTaskNameError, addRadioButtonError, addCategoryError, addInputDescriptionError, addInputMaterialsError, addAddressError, addDateError, addTelephoneError, addPayError, addClickFlag, addRadioPollutionError, addInputSquareError, addPriceError, addExperinceError, addEmailError } = validationCategoriesSlice.actions
export default validationCategoriesSlice.reducer