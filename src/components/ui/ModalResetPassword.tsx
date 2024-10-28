import React from 'react'
import close_img from '../../assets/images/auth_images/close2_svg.svg'
import { IModal } from '../../interface/modal.props'
import Logo from './Logo'
import styles from './Modal.module.scss'
import OverLay from './OverLay'
import RegisterButton from './RegisterButton'

const ModalResetPassword: React.FC<IModal> = ({ children, closeResetModal, openResetModalStep }) => {
  return (
    <>
      <OverLay />
      <div className={styles.modalReset} style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '505px',
        zIndex: '11 ',
        maxHeight: '385px',
        backgroundColor: 'white',
        borderRadius: '32px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 10px 14px 0px, rgba(0, 0, 0, 0.1) 0px 2px 2px 0px, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px'
      }}>

        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>СБРОС ПАРОЛЯ</span>
            <img onClick={closeResetModal} style={{ width: '25px', height: '25px', cursor: 'pointer' }} src={close_img} alt="close_img" />
          </div>
          {children}
          <div onClick={openResetModalStep} style={{ paddingBottom: '32px' }}><RegisterButton>Продолжить</RegisterButton></div>
          <Logo />
        </div>
      </div>
    </>
  )
}

export default ModalResetPassword
