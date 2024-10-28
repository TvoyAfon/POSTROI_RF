import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IState, State, initialState, modals } from './types'
import { closeEverythingExcept } from './utils'

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    openModal(state: State, action: PayloadAction<string>) {
      const modName = action.payload
      const modalSerialNumber = modals.findIndex(name => name === modName) + 1

      if (!modalSerialNumber) {
        return
      }

      state[modName] = true

      state.count = modalSerialNumber
      closeEverythingExcept(state, modName, modals)
    },
   
    setAuthModalFlag:(state:IState) =>{
      state.authModalFlag = !state.authModalFlag
    },

    closeAllModal: (state: State) => {
      modals.forEach(name => state[name] = false)
    },
  },
})

export const { closeAllModal, openModal,setAuthModalFlag } = formSlice.actions
export default formSlice.reducer
