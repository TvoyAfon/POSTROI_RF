import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import CreateOrderDone from '../../../../components/CreateOrder/CreateOrderDone/CreateOrderDone'
import CreateOrderCategories from '../../../../components/CreateOrder/forms/CreateOrderCategories'
import CreateOrderContacts from '../../../../components/CreateOrder/forms/CreateOrderContacts'
import CreateOrderDemo from '../../../../components/CreateOrder/forms/CreateOrderDemo'
import CreateOrderPayMethod from '../../../../components/CreateOrder/forms/CreateOrderPayMethod'
import CreateOrderSettings from '../../../../components/CreateOrder/forms/CreateOrderSettings'
import CreateOrderTasks from '../../../../components/CreateOrder/forms/CreateOrderTasks'
import EmptyComponent from '../../../../components/ui/EmptyComponent'


const steps = [{
	stepComponent: CreateOrderCategories,
	stepComponentNumber: 1
},
{
	stepComponent: CreateOrderTasks,
	stepComponentNumber: 2
},
{
	stepComponent: CreateOrderContacts,
	stepComponentNumber: 3
},
{
	stepComponent: CreateOrderPayMethod,
	stepComponentNumber: 4
},
{
	stepComponent: CreateOrderSettings,
	stepComponentNumber: 5
},
{
	stepComponent: CreateOrderDemo,
	stepComponentNumber: 6
},
{
	stepComponent: CreateOrderDone,
	stepComponentNumber: 7
},
{
	stepComponent: EmptyComponent,
	stepComponentNumber: 8
}
]

interface IState {
	stepComponent: React.FC<any>,
	stepComponentNumber: number,
	allCategoriesSteps: string,
	currentCategoriesStep: number,
}

const initialState: IState = {
	stepComponent: CreateOrderCategories,
	stepComponentNumber: 1,
	allCategoriesSteps: '',
	currentCategoriesStep: 1
}

const createOrderSlice = createSlice({
	name: 'createOrder',
	initialState,
	reducers: {
		changeStep(state, action: PayloadAction<number>) {
			const number = action.payload
			const step = steps.find(step => step.stepComponentNumber === number)?.stepComponent
			if (!step) return
			state.stepComponent = step
			state.stepComponentNumber = number
		},
		chooseAllSteps(state, action: PayloadAction<string>) {
			state.allCategoriesSteps = action.payload
		},
		сhooseAllCurrentSteps(state) {
			state.currentCategoriesStep += 1
		},
		сhooseAllBackSteps(state) {
			state.currentCategoriesStep -= 1
		},
		resetAllSteps(state) {
			state.stepComponentNumber = 1
			state.stepComponent = CreateOrderCategories
		},
		resetCurrentSteps(state) {
			state.currentCategoriesStep = 1
		}
	}
})
export const { changeStep, chooseAllSteps, сhooseAllCurrentSteps, сhooseAllBackSteps, resetAllSteps, resetCurrentSteps } = createOrderSlice.actions
export default createOrderSlice.reducer