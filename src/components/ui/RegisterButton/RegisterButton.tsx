import React from 'react'
import { IRegisterButton } from '../../../interface/modal.props'
import styles from './RegisterButton.module.scss'

const RegisterButton: React.FC<IRegisterButton> = ({ children }) => {
  return (

    <button style={{ width: '100%' }} className={styles.register_button}>{children}</button>

  )
}

export default RegisterButton
