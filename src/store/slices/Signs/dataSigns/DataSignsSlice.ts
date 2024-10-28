import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrentDateTime } from '../../../../common/commonTime'
import { ISignsData } from '../../../../interface/signsData.props'

interface IState {
	dataSigns: ISignsData,
	cards: ICard[]
}

export interface ICard {
	id: string, // Добавим уникальный идентификатор для каждой карточки
	data: ISignsData,
	create_date?: string
}

const initialState: IState = {
	dataSigns: {
		id: '',
		taskName: '',
		address: '',
		experience: '',
		additionally: {
			contract: false,
			warranty: false,
			materials: false,
		},
		price: '',
		description: '',
		telephone: '',
		email: '',
		communication: {
			calls: false,
			messages: false
		},
		categoryType: '',
		filesSigns: [],
	},

	cards: []
}

const dataSignsSlice = createSlice({
	name: 'dataSignsSlice',
	initialState,
	reducers: {
		addSignsData(state, action: PayloadAction<ISignsData>) {
			state.dataSigns = { ...state.dataSigns, ...action.payload }
		},

		addSignsCard(state) { //Массив для хранения карточек //
			const newCard: ICard = {
				id: new Date().toISOString(),
				create_date: getCurrentDateTime(),
				data: { ...state.dataSigns }
			}
			state.cards.push(newCard) // Добавляем новую карточку в массив
		},
		deleteSignsCard(state, action: PayloadAction<string>) {
			state.cards = state.cards.filter(card => card.id !== action.payload)
		},
		updateCard: (state, action) => {
			const cardIndex = state.cards.findIndex(card => card.id === action.payload.id)
			if (cardIndex >= 0) {
				state.cards[cardIndex] = action.payload
			}
		},
		addFileToCard(state, action: PayloadAction<{ cardId: string; file: File }>) { // новый редюсер
			const { cardId, file } = action.payload
			if (cardId) {
				const card = state.cards.find(card => card.id === cardId)
				if (card) {
					card.data.filesSigns.push(file)
				}
			}
		},

		deleteFileFromCard(state, action: PayloadAction<{ cardId: string; fileAction: File }>) {
			const { cardId, fileAction } = action.payload
			const card = state.cards.find(card => card.id === cardId)
			if (card && card.data.filesSigns) {
				// Remove file by name from filesSigns inside data
				card.data.filesSigns = card.data.filesSigns.filter(file => file.name !== fileAction.name)
			}
		},

		clearSignsData(state) {
			state.dataSigns = initialState.dataSigns
		}
	}
})

export const { clearSignsData, addSignsData, addSignsCard, deleteSignsCard, updateCard, deleteFileFromCard, addFileToCard } = dataSignsSlice.actions
export default dataSignsSlice.reducer