import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import CreateOrderName from '../../../components/CreateOrder/CreateOrderName/CreateOrderName'
import CreateOrderServicesTask from '../../../components/CreateOrder/CreateOrderServices/CreateOrderServicesTask'
import CreateOrderServicesContacts from '../../../components/CreateOrder/CreateOrderServices/CreateOrderServicesContacts'
import CreateOrderServicesTime from '../../../components/CreateOrder/CreateOrderServices/CreateOrderServicesTime'
import CreateOrderServicesPay from '../../../components/CreateOrder/CreateOrderServices/CreateOrderServicesPay'
import CreateOrderServicesDemo from '../../../components/CreateOrder/CreateOrderServices/CreateOrderServicesDemo'
import CreateOrderServicesSettings from '../../../components/CreateOrder/CreateOrderServices/CreateOrderServicesSettings'
import EmptyComponent from '../../../components/ui/EmptyComponent'

const steps = [
	{
		stepComponent: CreateOrderName,
		stepComponentNumber: 1
	},
	{
		stepComponent: CreateOrderServicesTask,
		stepComponentNumber: 2
	},
	{
		stepComponent: CreateOrderServicesContacts,
		stepComponentNumber: 3
	},
	{
		stepComponent: CreateOrderServicesTime,
		stepComponentNumber: 4
	},
	{
		stepComponent: CreateOrderServicesPay,
		stepComponentNumber: 5
	},
	{
		stepComponent: CreateOrderServicesSettings,
		stepComponentNumber: 6
	},
	{
		stepComponent: CreateOrderServicesDemo,
		stepComponentNumber: 7
	},
	{
		stepComponent:EmptyComponent,
		stepComponentNumber:8
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

const createOrderServiceSlice = createSlice({
	name: 'createServicesOrder',
	initialState,
	reducers: {
		changeServiceStep(state, action: PayloadAction<number>) {
			const number = action.payload

			const stepServices = steps.find(step => step.stepComponentNumber === number)?.stepComponent
			if (!stepServices) return
			state.stepComponent = stepServices
			state.stepComponentNumber = number
		},
		resetAllServiceSteps(state){
			state.stepComponentNumber = 1
			state.stepComponent = CreateOrderName
		}
	}
})
export const { changeServiceStep,resetAllServiceSteps } = createOrderServiceSlice.actions
export default createOrderServiceSlice.reducer