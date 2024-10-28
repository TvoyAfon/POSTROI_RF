import React from 'react'
import { useDispatch } from 'react-redux'
import { IModal } from '../../../interface/modal.props'
import { closeAllModals } from '../../../store/slices/ResetPasswordSlice/ResetPasswordSlice'
import CloseButton from '../CloseButton/CloseButton'
import Logo from './Logo'
import styles from './Modal.module.scss'
import OverLay from './OverLay'

const ModalResetPassword: React.FC<IModal> = ({ children }) => {
  const dispatch = useDispatch()

  return (
    <>
      <OverLay />
      <div className={styles.modalReset} style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '505px',
        zIndex: '11',
        backgroundColor: 'white',
        borderRadius: '32px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 10px 14px 0px, rgba(0, 0, 0, 0.1) 0px 2px 2px 0px, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px'
      }}>

        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>СБРОС ПАРОЛЯ</span>
            <CloseButton onClick={() => dispatch(closeAllModals())} />
          </div>
          {children}
          <Logo styles={{
            float: 'left'
          }} />
        </div>
      </div>
    </>
  )
}

export default ModalResetPassword
