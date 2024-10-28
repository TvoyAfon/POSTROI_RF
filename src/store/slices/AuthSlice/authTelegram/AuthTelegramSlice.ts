import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITelegramUser } from '../../../../services/auth/authSocials/typesSoicals'

interface IState {
	dataTelegram: ITelegramUser
}

const initialState: IState = {
	dataTelegram: {
		auth_date: 0,
		hash: '',
		id: '',
		first_name: '',
		last_name: '',
		photo_url: '',
		username: ''
	}
}

export const authTelegramSlise = createSlice({
	name: 'authTelegram',
	initialState,
	reducers: {
		addTelegramData(state, action: PayloadAction<ITelegramUser>) {
			state.dataTelegram = action.payload
		},
		removeTelegramData(state) {
			state.dataTelegram = {
				auth_date: 0,
				hash: '',
				id: '',
				first_name: '',
				last_name: '',
				photo_url: '',
				username: ''
			}
		}
	}
})
export const { addTelegramData, removeTelegramData } = authTelegramSlise.actions
export default authTelegramSlise.reducer