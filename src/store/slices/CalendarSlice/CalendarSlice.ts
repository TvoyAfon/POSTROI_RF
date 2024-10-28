import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	dateRange: Date[],
	dateFlag: boolean
}

const initialState: IState = {
	dateRange: [new Date(), new Date()],
	dateFlag: false
}

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		addDateRange(state, action: PayloadAction<Date[]>) {
			state.dateRange = action.payload
		},
		addDateFlag(state, action: PayloadAction<boolean>) {
			state.dateFlag = action.payload
		},
		clearDateRange(state) {
			state.dateRange = [new Date(), new Date()]
			state.dateFlag = false
		}
	}
})


export const { addDateRange, addDateFlag, clearDateRange } = calendarSlice.actions
export default calendarSlice.reducer