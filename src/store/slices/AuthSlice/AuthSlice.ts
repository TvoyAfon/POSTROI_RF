import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FullUser } from '../../../services/user/common/types'

interface IAuthSlice {
	user: FullUser | null
	isAuthed: boolean
}

const initialState: IAuthSlice = {
	user: null,
	isAuthed: false
}
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeUser(state, action: PayloadAction<FullUser | null>) {
			const user = action.payload

			state.user = user
			state.isAuthed = Boolean(user)
		}
	}
})

export const { changeUser } = authSlice.actions
export default authSlice.reducer
