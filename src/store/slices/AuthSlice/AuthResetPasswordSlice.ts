import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IResetPassword } from '../../../services/auth/common/types'

interface IState {
	userResetPassword: IResetPassword | null
}

const initialState: IState = {
	userResetPassword: null
}

export const authResetPasswordSlice = createSlice({
	name: 'authResetPasswordData',
	initialState,
	reducers: {
		addResetPasswordData(state, action: PayloadAction<IResetPassword | null>) {
			state.userResetPassword = action.payload
		}
	}
})

export const { addResetPasswordData } = authResetPasswordSlice.actions
export default authResetPasswordSlice.reducer