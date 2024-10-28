import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	isBindMail: boolean,
	isBindVk:boolean
}

const initialState: IState = {
	isBindMail: false,
	isBindVk:false
}

export const bindSocialSlice = createSlice({
	name:'bindSocials',
	initialState,
	reducers:{
		setMailRuBind(state,action:PayloadAction<boolean>){
			state.isBindMail = action.payload
		},
		setVkBind(state,action:PayloadAction<boolean>){
			state.isBindVk = action.payload
		}
	}
})
export const {setMailRuBind,setVkBind} = bindSocialSlice.actions
export default bindSocialSlice.reducer