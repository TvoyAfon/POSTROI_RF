
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrentDateTime } from '../../../../common/commonTime'
import { AllOrderCards, IBuildingCard, ICleaningCard, IMaterialsCard, IServicesCard, ITruckingCard, IWorkersCard } from '../../../../interface/categoryCard.props'

interface IState {
	buildingCategory: IBuildingCard[] | null,    /* детальные карточки */
	truckingCategory: ITruckingCard[] | null,
	materialsCategory: IMaterialsCard[] | null,
	cleaningCategory: ICleaningCard[] | null,
	servicesCategory: IServicesCard[] | null,
	workersCategory: IWorkersCard[] | null
	allCards: AllOrderCards[]
}

const initialState: IState = {
	buildingCategory: [],
	truckingCategory: [],
	materialsCategory: [],
	cleaningCategory: [],
	servicesCategory: [],
	workersCategory: [],
	allCards: [],
}

export const orderCardSlice = createSlice({
	name: 'orderCardSlice',
	initialState,
	reducers: {
		createBuildingCard(state, action: PayloadAction<IBuildingCard>) {
			const newCard: IBuildingCard = {
				...action.payload,
				create_date: getCurrentDateTime(),
				id: new Date().toISOString()
			}
			state.buildingCategory?.push(newCard)
		},
		createTruckingCard(state, action: PayloadAction<ITruckingCard>) {
			const newCard: ITruckingCard = {
				...action.payload,
				create_date: getCurrentDateTime(),
				id: new Date().toISOString()
			}
			state.truckingCategory?.push(newCard)
		},
		createMaterialsCard(state, action: PayloadAction<IMaterialsCard>) {
			const newCard: IMaterialsCard = {
				...action.payload,
				create_date: getCurrentDateTime(),
				id: new Date().toISOString()
			}
			state.materialsCategory?.push(newCard)
		},
		createCleaningCard(state, action: PayloadAction<ICleaningCard>) {
			const newCard: ICleaningCard = {
				...action.payload,
				create_date: getCurrentDateTime(),
				id: new Date().toISOString()
			}
			state.cleaningCategory?.push(newCard)
		},
		createServicesCard(state, action: PayloadAction<IServicesCard>) {
			const newCard: IServicesCard = {
				...action.payload,
				create_date: getCurrentDateTime(),
				id: new Date().toISOString()
			}
			state.servicesCategory?.push(newCard)
		},
		createWorkersCard(state, action: PayloadAction<IWorkersCard>) {
			const newCard: IWorkersCard = {
				...action.payload,
				create_date: getCurrentDateTime(),
				id: new Date().toISOString()
			}
			state.workersCategory?.push(newCard)
		},
		allOrderCards(state) {
			state.allCards = [
				...(state.buildingCategory || []),
				...(state.cleaningCategory || []),
				...(state.materialsCategory || []),
				...(state.workersCategory || []),
				...(state.truckingCategory || []),
				...(state.servicesCategory || []),
			]
		},
		removeOrderCard(state, action: PayloadAction<string>) {
			// Удаление карточки из каждой категории
			state.buildingCategory = state.buildingCategory?.filter(card => card.id !== action.payload) || null
			state.truckingCategory = state.truckingCategory?.filter(card => card.id !== action.payload) || null
			state.materialsCategory = state.materialsCategory?.filter(card => card.id !== action.payload) || null
			state.cleaningCategory = state.cleaningCategory?.filter(card => card.id !== action.payload) || null
			state.servicesCategory = state.servicesCategory?.filter(card => card.id !== action.payload) || null
			state.workersCategory = state.workersCategory?.filter(card => card.id !== action.payload) || null
			orderCardSlice.caseReducers.allOrderCards(state)
		}
	}
}
)

export const { createBuildingCard, createCleaningCard, createMaterialsCard, createServicesCard, createTruckingCard, createWorkersCard, allOrderCards, removeOrderCard } = orderCardSlice.actions
export default orderCardSlice.reducer
