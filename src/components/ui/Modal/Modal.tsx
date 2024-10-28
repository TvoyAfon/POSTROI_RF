import React from 'react'
import { IModal } from '../../../interface/modal.props'
import CloseButton from '../CloseButton/CloseButton'
import Logo from './Logo'
import styles from './Modal.module.scss'
import OverLay from './OverLay'

const Modal: React.FC<IModal> = ({ children, closeModal, count }) => {
  return (
    <>
      <div className={styles.modal} style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        zIndex: '11',
        borderRadius: '32px',
        paddingTop: '25px'
      }}>
        <div style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '7fr 1fr' }}>
          <span style={{ fontSize: '24px', fontWeight: '500', paddingLeft: '30px' }}>РЕГИСТРАЦИЯ {count}/5 </span>
          <CloseButton onClick={closeModal} />
        </div>
        {children}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Logo styles={{
            marginBottom: '25px'
          }} />
        </div>
      </div>
      <OverLay />
    </>
  )
}

export default Modal
