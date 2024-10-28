import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import banner from '../../../../assets/images/auth_images/Group 81.svg'
import useKeyPress from '../../../../hooks/useKeyPress'
import { closeAllModals } from '../../../../store/slices/ResetPasswordSlice/ResetPasswordSlice'
import Button from '../../../ui/Button/Button'
import Logo from '../../../ui/Modal/Logo'
import OverLay from '../../../ui/Modal/OverLay'
import styles from '../AuthResetPassword.module.scss'

const AuthResetPasswordDone: React.FC = () => {
  const dispatch = useDispatch()

  const ref = useRef<HTMLButtonElement>(null)
  useKeyPress('Enter', () => ref.current?.click())

  return (
    <>
      <OverLay />
      <div className={styles.resetContainer4} style={{
        width: '505px',
        height: '485px',
        backgroundColor: 'white',
        borderRadius: '32px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        zIndex: '11',
        paddingRight: '32px',
        paddingLeft: '32px',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}>

        <img style={{ width: '331px', height: 'auto', paddingTop: '32px' }} src={banner} alt="banner" />
        <Button
          ref={ref}
          style={{
            width: '100%'
          }} onClick={() => dispatch(closeAllModals())}>Закрыть</Button>
        <Logo />
      </div>
    </>
  )
}

export default AuthResetPasswordDone
