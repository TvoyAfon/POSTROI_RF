import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	external_hash: string	
}

const initialState: IState = {
	external_hash: ''
}

export const externalHashSlice = createSlice({
	name:'bindSocials',
	initialState,
	reducers:{
		setExternalHash(state,action:PayloadAction<string>){
			state.external_hash = action.payload
		},
	}
})
export const {setExternalHash} = externalHashSlice.actions
export default externalHashSlice.reducer