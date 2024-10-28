import React, { useState } from 'react'
import close_img2 from '../../assets/images/auth_images/close2_svg.svg'
import close_img from '../../assets/images/mainpage_images/close_svg.svg'
import { IModal } from '../../interface/modal.props'
import Logo from './Logo'
import styles from './Modal.module.scss'
import OverLay from './OverLay'


const Modal: React.FC<IModal> = ({ children, closeModal, count }) => {

  const [closeIcon, setCloseIcon] = useState(false)

  return (
    <>

      <div className={styles.modal} style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        zIndex: '6',
        borderRadius: '32px',
        paddingTop: '25px'

      }}>
        <div style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '7fr 1fr' }}>
          <span style={{ fontSize: '24px', fontWeight: '500', paddingLeft: '30px' }}>РЕГИСТРАЦИЯ {count}/5 </span>
          <div
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setCloseIcon(true)}
            onMouseLeave={() => setCloseIcon(false)}
            onClick={closeModal}><img style={{ width: '25px', height: '25px' }} src={closeIcon ? close_img2 : close_img} alt="closeImg" /></div>
        </div>
        {children}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', justifyContent: 'center' }}>
          <Logo />
        </div>
      </div>
      <OverLay />
    </>
  )
}

export default Modal
