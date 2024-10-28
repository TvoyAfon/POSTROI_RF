import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import CreateOrderName from '../../../components/CreateOrder/CreateOrderName/CreateOrderName'
import CreateOrderUniversalDemo from '../../../components/CreateOrder/CreateOrderUniversal/CreateOrderUniversalDemo'
import CreateOrderUniversalInfo from '../../../components/CreateOrder/CreateOrderUniversal/CreateOrderUniversalInfo'
import CreateOrderUniversalPayMethod from '../../../components/CreateOrder/CreateOrderUniversal/CreateOrderUniversalPayMethod'
import CreateOrderUniversalSettings from '../../../components/CreateOrder/CreateOrderUniversal/CreateOrderUniversalSettings'
import CreateOrderUniversalTask from '../../../components/CreateOrder/CreateOrderUniversal/CreateOrderUniversalTask'
import EmptyComponent from '../../../components/ui/EmptyComponent'

const steps = [{
	stepComponent: CreateOrderName,
	stepComponentNumber: 1
},
{
	stepComponent: CreateOrderUniversalTask,
	stepComponentNumber: 2
},
{
	stepComponent: CreateOrderUniversalInfo,
	stepComponentNumber: 3
},
{
	stepComponent: CreateOrderUniversalPayMethod,
	stepComponentNumber: 4
},
{
	stepComponent: CreateOrderUniversalSettings,
	stepComponentNumber: 5
},
{
	stepComponent: CreateOrderUniversalDemo,
	stepComponentNumber: 6
},
{
	stepComponent: EmptyComponent,
	stepComponentNumber: 7
}
]

interface IState {
	stepComponent: React.FC<any>,
	stepComponentNumber: number,
}

const initialState: IState = {
	stepComponent: CreateOrderName,
	stepComponentNumber: 1,
}

const createUniversalOrderSlice = createSlice({
	name: 'createUniversalOrder',
	initialState,
	reducers: {
		changeUniversalStep(state, action: PayloadAction<number>) {
			const number = action.payload
			const stepUniversal = steps.find(step => step.stepComponentNumber === number)?.stepComponent
			if (!stepUniversal) return
			state.stepComponent = stepUniversal
			state.stepComponentNumber = number
		},
		resetAllUniversalStep(state) {
			state.stepComponentNumber = 1
			state.stepComponent = CreateOrderName
		}
	}
})
export const { changeUniversalStep, resetAllUniversalStep } = createUniversalOrderSlice.actions
export default createUniversalOrderSlice.reducer