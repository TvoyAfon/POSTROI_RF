import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import CreateOrderCleaningAddress from '../../../components/CreateOrder/CreateOrderCleaning/CreateOrderCleaningAddress'
import CreateOrderCleaningDemo from '../../../components/CreateOrder/CreateOrderCleaning/CreateOrderCleaningDemo'
import CreateOrderCleaningPay from '../../../components/CreateOrder/CreateOrderCleaning/CreateOrderCleaningPay'
import CreateOrderCleaningPlace from '../../../components/CreateOrder/CreateOrderCleaning/CreateOrderCleaningPlace'
import CreateOrderCleaningSettings from '../../../components/CreateOrder/CreateOrderCleaning/CreateOrderCleaningSettings'
import CreateOrderCleaningTask from '../../../components/CreateOrder/CreateOrderCleaning/CreateOrderCleaningTask'
import CreateOrderName from '../../../components/CreateOrder/CreateOrderName/CreateOrderName'
import EmptyComponent from '../../../components/ui/EmptyComponent'

const steps = [
	{
		stepComponent: CreateOrderName,
		stepComponentNumber: 1
	},
	{
		stepComponent: CreateOrderCleaningPlace,
		stepComponentNumber: 2
	},
	{
		stepComponent: CreateOrderCleaningTask,
		stepComponentNumber: 3
	},
	{
		stepComponent: CreateOrderCleaningAddress,
		stepComponentNumber: 4
	},
	{
		stepComponent: CreateOrderCleaningPay,
		stepComponentNumber: 5
	},
	{
		stepComponent: CreateOrderCleaningSettings,
		stepComponentNumber: 6
	},
	{
		stepComponent: CreateOrderCleaningDemo,
		stepComponentNumber: 7
	},
	{
		stepComponent: EmptyComponent,
		stepComponentNumber: 8
	}
]

interface IState {
	stepComponent: React.FC,
	stepComponentNumber: number
}

const initialState: IState = {
	stepComponent: CreateOrderName,
	stepComponentNumber: 1
}

const createOrderCleaningSlice = createSlice({
	name: 'createCleaningOrder',
	initialState,
	reducers: {
		changeCleaningStep(state, action: PayloadAction<number>) {
			const number = action.payload

			const stepCleaning = steps.find(step => step.stepComponentNumber === number)?.stepComponent
			if (!stepCleaning) return
			state.stepComponent = stepCleaning
			state.stepComponentNumber = number
		},
		resetAllCleaningSteps(state){
			state.stepComponentNumber = 1
			state.stepComponent = CreateOrderName
		}
	}
})
export const { changeCleaningStep,resetAllCleaningSteps } = createOrderCleaningSlice.actions
export default createOrderCleaningSlice.reducer