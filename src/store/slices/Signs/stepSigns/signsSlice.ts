import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SignsCategories from '../../../../components/Signs/forms/SignsCategories'
import SignsContacts from '../../../../components/Signs/forms/SignsContacts'
import SignsDemo from '../../../../components/Signs/forms/SignsDemo'
import SignsInfo from '../../../../components/Signs/forms/SignsInfo'
import SignsTask from '../../../../components/Signs/forms/SignsTask'
import EmptyComponent from '../../../../components/ui/EmptyComponent'

const steps = [
	{
		stepComponent: SignsCategories,
		stepComponentNumber: 1
	},
	{
		stepComponent: SignsInfo,
		stepComponentNumber: 2
	},
	{
		stepComponent: SignsTask,
		stepComponentNumber: 3
	},
	{
		stepComponent: SignsContacts,
		stepComponentNumber: 4
	},
	{
		stepComponent: SignsDemo,
		stepComponentNumber: 5
	},
	{
		stepComponent: EmptyComponent,
		stepComponentNumber: 6
	}
]

interface IState {
	stepComponent: React.FC,
	stepComponentNumber: number
}

const initialState: IState = {
	stepComponent: SignsCategories,
	stepComponentNumber: 1
}

const SignsSlice = createSlice({
	name: 'signsSteps',
	initialState,
	reducers: {
		changeSignsStep(state, action: PayloadAction<number>) {
			const number = action.payload

			const stepSigns = steps.find(step => step.stepComponentNumber === number)?.stepComponent
			if (!stepSigns) return
			state.stepComponent = stepSigns
			state.stepComponentNumber = number
		},
		resetAllSignsSteps(state) {
			state.stepComponentNumber = 1
			state.stepComponent = SignsCategories
		}
	}
})
export const { changeSignsStep, resetAllSignsSteps } = SignsSlice.actions
export default SignsSlice.reducer