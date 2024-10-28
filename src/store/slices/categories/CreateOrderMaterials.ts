import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import CreateOrderName from '../../../components/CreateOrder/CreateOrderName/CreateOrderName'
import CreateOrderMaterialsCategories from '../../../components/CreateOrder/CreateOrderMaterials/CreateOrderMaterialsCategories'
import CreateOrderMaterialsTask from '../../../components/CreateOrder/CreateOrderMaterials/CreateOrderMaterialsTask'
import CreateOrderMaterialsPay from '../../../components/CreateOrder/CreateOrderMaterials/CreateOrderMaterialsPay'
import CreateOrderMaterialsSettings from '../../../components/CreateOrder/CreateOrderMaterials/CreateOrderMaterialsSettings'
import CreateOrderMaterialsDemo from '../../../components/CreateOrder/CreateOrderMaterials/CreateOrderMaterialsDemo'
import EmptyComponent from '../../../components/ui/EmptyComponent'

const steps = [
	{
		stepComponent: CreateOrderName,
		stepComponentNumber: 1
	},
	{
		stepComponent: CreateOrderMaterialsCategories,
		stepComponentNumber: 2
	},
	{
		stepComponent: CreateOrderMaterialsTask,
		stepComponentNumber: 3
	},
	{
		stepComponent: CreateOrderMaterialsPay,
		stepComponentNumber: 4
	},
	{
		stepComponent: CreateOrderMaterialsSettings,
		stepComponentNumber: 5
	},
	{
		stepComponent: CreateOrderMaterialsDemo,
		stepComponentNumber: 6
	},
	{
		stepComponent:EmptyComponent,
		stepComponentNumber:7
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

const createOrderMaterialsSlice = createSlice({
	name: 'createMaterialsOrder',
	initialState,
	reducers: {
		changeMaterialsStep(state, action: PayloadAction<number>) {
			const number = action.payload

			const stepMaterials = steps.find(step => step.stepComponentNumber === number)?.stepComponent
			if (!stepMaterials) return
			state.stepComponent = stepMaterials
			state.stepComponentNumber = number
		},
		resetAllMaterialsSteps(state){
			state.stepComponentNumber = 1
			state.stepComponent = CreateOrderName
		}
	}
})
export const { changeMaterialsStep,resetAllMaterialsSteps } = createOrderMaterialsSlice.actions
export default createOrderMaterialsSlice.reducer