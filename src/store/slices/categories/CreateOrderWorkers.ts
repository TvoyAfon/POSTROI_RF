import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import CreateOrderName from '../../../components/CreateOrder/CreateOrderName/CreateOrderName'
import CreateOrderWorkersTask from '../../../components/CreateOrder/CreateOrderWorkers/CreateOrderWorkersTask'
import CreateOrderWorkersContacts from '../../../components/CreateOrder/CreateOrderWorkers/CreateOrderWorkersContacts'
import CreateOrderWorkersPay from '../../../components/CreateOrder/CreateOrderWorkers/CreateOrderWorkersPay'
import CreateOrderWorkersSettings from '../../../components/CreateOrder/CreateOrderWorkers/CreateOrderWorkersSettings'
import CreateOrderWorkersDemo from '../../../components/CreateOrder/CreateOrderWorkers/CreateOrderWorkersDemo'
import EmptyComponent from '../../../components/ui/EmptyComponent'
import CreateOrderWorkersType from '../../../components/CreateOrder/CreateOrderWorkers/CreateOrderWorkersType'


const steps = [{
	stepComponent: CreateOrderName,
	stepComponentNumber: 1
},
{
	stepComponent: CreateOrderWorkersType,
	stepComponentNumber: 2
},
{
	stepComponent: CreateOrderWorkersTask,
	stepComponentNumber: 3
},
{
	stepComponent: CreateOrderWorkersContacts,
	stepComponentNumber: 4
},
{
	stepComponent: CreateOrderWorkersPay,
	stepComponentNumber: 5
},
{
	stepComponent: CreateOrderWorkersSettings,
	stepComponentNumber: 6
},
{
	stepComponent: CreateOrderWorkersDemo,
	stepComponentNumber: 7
},
{
	stepComponent:EmptyComponent,
	stepComponentNumber:8
}
]

interface IState {
	stepComponent: React.FC,
	stepComponentNumber: number,
}

const initialState: IState = {
	stepComponent: CreateOrderName,
	stepComponentNumber: 1,
	
}
 


const createOrderWorkersSlice = createSlice({
	name: 'createWorkersOrder',
	initialState,
	reducers: {
		changeWorkersStep(state, action: PayloadAction<number>) {
			const number = action.payload
			const stepWorkers = steps.find(step => step.stepComponentNumber === number)?.stepComponent
			if (!stepWorkers) return
			state.stepComponent = stepWorkers
			state.stepComponentNumber = number
		},
		resetAllWorkersSteps(state){
			state.stepComponentNumber = 1
			state.stepComponent = CreateOrderName
		}
}})

export const { changeWorkersStep,resetAllWorkersSteps } = createOrderWorkersSlice.actions
export default createOrderWorkersSlice.reducer