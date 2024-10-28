import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IIOrderMaterialsData, IOrderMaterialsCategory } from '../../../interface/createOrder.props'


interface IState {
	dataMaterials: IIOrderMaterialsData,
	dataCategoryMaterials: IOrderMaterialsCategory
	filesMaterials: File[]
}

const initialState: IState = {
	dataMaterials: {
		taskName: '',
		address: '',
		description: '',
		similarItem: false,
		delivery: null,
		personally: false,
		date: '',
		payMethod: '',
		settings: {
			offers: false,
			notice: false,
			contract: false,
		},
		categoryType:''
	},
	dataCategoryMaterials: {
		finishMaterials: {},
		constructionMaterials: {},
		electric: {},
		facade: {},
		plumbing: {},
		ventilation: {},
		other: false
	},
	filesMaterials: []
}

const createOrderDataMaterialsSlice = createSlice({
	name: 'createOrderMaterialsDataSlice',
	initialState,
	reducers: {
		addOrderMaterialsData(state, action: PayloadAction<IIOrderMaterialsData>) {
			state.dataMaterials = { ...state.dataMaterials, ...action.payload }
		},
		addOrderMaterialsFiles(state, action: PayloadAction<File[]>) {
			state.filesMaterials = action.payload
		},
		addOrderMaterialsCategory(state, action: PayloadAction<IOrderMaterialsCategory>) {
			state.dataCategoryMaterials = { ...state.dataCategoryMaterials, ...action.payload }

		},

		clearOrderDataMaterials(state) {
			state.filesMaterials = [],
				state.dataMaterials = {
					taskName: '',
					address: '',
					description: '',
					similarItem: false,
					delivery: null,
					personally: false,
					date: '',
					payMethod: '',
					settings: {
						offers: false,
						notice: false,
						contract: false,
					},
					categoryType:''
				}
		},
	}
})

export const { addOrderMaterialsData, addOrderMaterialsFiles, clearOrderDataMaterials, addOrderMaterialsCategory } = createOrderDataMaterialsSlice.actions
export default createOrderDataMaterialsSlice.reducer