import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import arrow_png from '../../../assets/images/mainpage_images/arrow-right-to-bracket-solid 1.png'
import { closeAllModal, openModal } from '../../../store/slices/FormSlice/FormSlice'
import { RootState } from '../../../store/store'
import Auth from '../../Auth/Auth'
import AuthRegisterData from '../../Auth/AuthRegister/AuthRegisterData/AuthRegisterData'
import AuthRegisterDone from '../../Auth/AuthRegister/AuthRegisterDone/AuthRegisterDone'
import AuthRegisterEmail from '../../Auth/AuthRegister/AuthRegisterEmail/AuthRegisterEmail'
import AuthRegisterName from '../../Auth/AuthRegister/AuthRegisterName/AuthRegisterName'
import AuthRegisterPassword from '../../Auth/AuthRegister/AuthRegisterPassword/AuthRegisterPassword'
import AuthRegisterPhone from '../../Auth/AuthRegister/AuthRegisterPhone/AuthRegisterPhone'
import AuthResetEmail from '../../Auth/AuthResetPassword/Forms/AuthResetEmail'
import AuthResetNewPassword from '../../Auth/AuthResetPassword/Forms/AuthResetNewPassword'
import AuthResetPasswordDone from '../../Auth/AuthResetPassword/Forms/AuthResetPasswordDone'
import AuthResetVerificationCode from '../../Auth/AuthResetPassword/Forms/AuthResetVerificationCode'

import Button from '../../ui/Button/Button'
import Modal from '../../ui/Modal/Modal'
import ModalResetPassword from '../../ui/Modal/ModalResetPassword'

const LogInButton: React.FC = () => {
  const dispatch = useDispatch()
  const { registerDataModal, registerDoneModal, registerEmailModal, registerNameModal, registerPasswordModal, authModal, count } = useSelector((state: RootState) => state.form)
  const { emailModal, verificationCodeModal, newPasswordModal, resetPasswordDoneModal } = useSelector((state: RootState) => state.reset)
  const [isPhone, setIsPhone] = useState<boolean>(false)
  const [isPhoneSelected, setIsPhoneSelected] = useState<boolean>(false)

  const closeModal = () => {
    dispatch(closeAllModal())
  }


  const selectRadioButton = () => setIsPhone(!isPhone)
  const handleTogglePhone = () => setIsPhoneSelected(!isPhoneSelected)
  const handleLogIn = async () => {
    dispatch(openModal('authModal'))
  }

  return (
    <>
      {authModal && <Auth
        selectRadioButton={selectRadioButton}
        isPhone={isPhone}
        openModalStep2={() => dispatch(openModal('registerEmailModal'))} closeModal={closeModal} />}
      <>
        <Button
          onClick={handleLogIn}
          icon={arrow_png}>Войти
        </Button>
        {registerEmailModal &&
          <Modal count={count}
            closeModal={closeModal} >
            {!isPhone ? <AuthRegisterEmail /> : <AuthRegisterPhone />}
          </Modal>}
        {registerPasswordModal &&
          <Modal
            count={count}
            closeModal={closeModal}>
            <AuthRegisterPassword />
          </Modal>}
        {registerNameModal &&
          <Modal
            count={count}
            closeModal={closeModal}>
            <AuthRegisterName />
          </Modal>}
        {registerDataModal &&
          <Modal
            count={count}
            closeModal={closeModal}>
            <AuthRegisterData
              openModalStep6={() => dispatch(openModal('registerDataModal'))} />
          </Modal>}
        {registerDoneModal &&
          <AuthRegisterDone
            style={{ top: 500 }}
            closeModal={closeModal} />}
        {emailModal &&
          <ModalResetPassword>
            <AuthResetEmail
              isPhone={isPhoneSelected}
              selectRadioButton={handleTogglePhone} />
          </ModalResetPassword>}
        {verificationCodeModal
          &&
          <ModalResetPassword>
            <AuthResetVerificationCode isPhone={isPhone} />
          </ModalResetPassword>
        }
        {newPasswordModal && <AuthResetNewPassword />}
        {resetPasswordDoneModal && <AuthResetPasswordDone />}
      </>
    </>
  )
}

export default LogInButton
