import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	yandexToken: string	
}

const initialState: IState = {
	yandexToken: ''
}

export const yandexTokenSlice = createSlice({
	name:'bindSocials',
	initialState,
	reducers:{
		setYandexToken(state,action:PayloadAction<string>){
			state.yandexToken = action.payload
		},
	}
})
export const {setYandexToken} = yandexTokenSlice.actions
export default yandexTokenSlice.reducer