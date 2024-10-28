import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	countProjects: number
	countAlbums: number
}

const initialState: IState = {
	countProjects: 0,
	countAlbums: 0
}

export const countProjectsSlice = createSlice({
	name: 'countProjects',
	initialState,
	reducers: {
		setCountProjects(state, action: PayloadAction<number>) {
			state.countProjects = action.payload
		},
		setCountAlbums(state, action: PayloadAction<number>) {
			state.countAlbums = action.payload
		}
	}
})

export const { setCountProjects, setCountAlbums } = countProjectsSlice.actions
export default countProjectsSlice.reducer