import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../interface/user.props'


const initialState = {
  formData:{} as IUser
}

const registerSlise = createSlice({
    name:'register',
    initialState,
    reducers :{
        addFormData:(state,action:PayloadAction<IUser>) =>{
          state.formData = {...state.formData,...action.payload}
        }
    }

})

export const { addFormData } = registerSlise.actions;
export default registerSlise.reducer;