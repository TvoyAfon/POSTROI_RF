import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	educationDegree: string
}

const initialState: IState = {
	educationDegree: ''
}

export const educationDegreeSlice = createSlice({
	name: 'educationDegree',
	initialState,
	reducers: {
		setDegreeEducation(state, action: PayloadAction<string>) {
			state.educationDegree = action.payload
		}
	}
})

export const { setDegreeEducation } = educationDegreeSlice.actions
export default educationDegreeSlice.reducer