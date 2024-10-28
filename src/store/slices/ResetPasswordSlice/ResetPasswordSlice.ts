import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { State } from '../FormSlice/types'
import { closeEverythingExcept } from '../FormSlice/utils'
import { IEmailOrPhone, IPassword, IState } from './types'

const modals = ['emailModal', 'newPasswordModal', 'verificationCodeModal', 'resetPasswordDoneModal']

const initialState: IState = {
  emailModal: false,
  newPasswordModal: false,
  verificationCodeModal: false,
  resetPasswordDoneModal: false,
  formData: {
    emailOrPhone: {
      value: '',
      isPhone: false
    },
    verificationCode: '',
    password: {
      password: '',
      confirmPassword: ''
    }
  }
}

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    changeEmailOrPhone(state, action: PayloadAction<IEmailOrPhone>) {
      state.formData.emailOrPhone = action.payload
    },

    changeVerificationCode(state, action: PayloadAction<string>) {
      state.formData.verificationCode = action.payload
    },

    changePassword(state, action: PayloadAction<IPassword>) {
      state.formData.password = action.payload
    },

    openResetModal(state: State, action: PayloadAction<string>) {
      const modName = action.payload
      state[modName] = true
      closeEverythingExcept(state, modName, modals)
    },

    closeAllModals: (state: State) => {
      modals.forEach(name => state[name] = false)
    },
  }
})

export const { changeEmailOrPhone, changePassword, changeVerificationCode, openResetModal, closeAllModals } = resetPasswordSlice.actions

export default resetPasswordSlice.reducer