import React from 'react'
import content_img from '../../../../assets/images/auth_images/Group 83.svg'
import close_img from '../../../../assets/images/auth_images/close.png'
import hello_img from '../../../../assets/images/auth_images/hello.svg'
import { IModal } from '../../../../interface/modal.props'
import OverLay from '../../../ui/Modal/OverLay'
import styles from './AuthRegisterDone.module.scss'


const AuthRegisterDone: React.FC<IModal> = ({ closeModal, style }) => {
  const handleClose = () => {
    window.location.reload()
    closeModal && closeModal()
  }

  return (<>
    <div style={style} className={styles.container}>
      <div className={styles.container_content}>
        <img src={content_img} alt="content" />
        <img src={hello_img} alt="hello" />
        <img onClick={handleClose} src={close_img} alt="close" />
      </div>
    </div>
    <OverLay />
  </>
  )
}

export default AuthRegisterDone
