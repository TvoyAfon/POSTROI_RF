import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProjectCard } from '../../../components/OrdersAndProjectsPage/OrderProject/types/projectTypes'

export interface IProjectsSlice {
	projects: IProjectCard[]
}

const initialState: IProjectsSlice = {
	projects: []
}

const ProjectsSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		addProjects(state, action: PayloadAction<IProjectCard[]>) {
			state.projects = action.payload
		}
	}
})

export default ProjectsSlice.reducer
export const { addProjects } = ProjectsSlice.actions