import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	currentTab: string

}

const initialState: IState = {
	currentTab: 'about',

}

export const currentTabInProfile = createSlice({
	name: 'currentTab',
	initialState,
	reducers: {
		setCurrentTab(state, action: PayloadAction<string>) {
			state.currentTab = action.payload
		},

	}
})

export const { setCurrentTab } = currentTabInProfile.actions
export default currentTabInProfile.reducer