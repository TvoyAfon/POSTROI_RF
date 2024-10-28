import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import CreateOrderName from '../../../components/CreateOrder/CreateOrderName/CreateOrderName'
import CreateOrderTruckingDelivery from '../../../components/CreateOrder/CreateOrderTrucking/CreateOrderTruckingDelivery'
import CreateOrderTruckingDemo from '../../../components/CreateOrder/CreateOrderTrucking/CreateOrderTruckingDemo'
import CreateOrderTruckingInfo from '../../../components/CreateOrder/CreateOrderTrucking/CreateOrderTruckingInfo'
import CreateOrderTruckingPayMethod from '../../../components/CreateOrder/CreateOrderTrucking/CreateOrderTruckingPayMethod'
import CreateOrderTruckingSettings from '../../../components/CreateOrder/CreateOrderTrucking/CreateOrderTruckingSettings'
import CreateOrderTruckingTask from '../../../components/CreateOrder/CreateOrderTrucking/CreateOrderTruckingTask'
import EmptyComponent from '../../../components/ui/EmptyComponent'

const steps = [
	{
		stepComponent: CreateOrderName,
		stepComponentNumber: 1
	},
	{
		stepComponent: CreateOrderTruckingDelivery,
		stepComponentNumber: 2
	},
	{
		stepComponent: CreateOrderTruckingTask,
		stepComponentNumber: 3
	},
	{
		stepComponent: CreateOrderTruckingInfo,
		stepComponentNumber: 4
	},
	{
		stepComponent: CreateOrderTruckingPayMethod,
		stepComponentNumber: 5
	},
	{
		stepComponent: CreateOrderTruckingSettings,
		stepComponentNumber: 6
	},
	{
		stepComponent: CreateOrderTruckingDemo,
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

const createOrderTruckingSlice = createSlice({
	name: 'createTruckingOrder',
	initialState,
	reducers: {
		changeTruckingStep(state, action: PayloadAction<number>) {
			const number = action.payload

			const stepTrucking = steps.find(step => step.stepComponentNumber === number)?.stepComponent
			if (!stepTrucking) return
			state.stepComponent = stepTrucking
			state.stepComponentNumber = number
		},
		resetAllTruckingSteps(state) {
			state.stepComponentNumber = 1
			state.stepComponent = CreateOrderName
		}
	}
})
export const { changeTruckingStep, resetAllTruckingSteps } = createOrderTruckingSlice.actions
export default createOrderTruckingSlice.reducer