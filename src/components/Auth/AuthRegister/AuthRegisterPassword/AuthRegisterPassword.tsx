
import React, { FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useKeyPress from '../../../../hooks/useKeyPress'
import { openModal } from '../../../../store/slices/FormSlice/FormSlice'
import { addFormData } from '../../../../store/slices/RegisterSlice'
import Button from '../../../ui/Button/Button'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import ErrorSignature from '../../ui/ErrorSignature'
import PasswordField from '../../ui/Fields/PasswordField/PasswordField'
import styles from './AuthRegisterPassword.module.scss'
import LoginSignature from './LoginSignature'

const AuthRegisterPassword: React.FC = () => {
  const [passwordError, setPasswordError] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const dispatch = useDispatch()


  const ref = useRef<HTMLButtonElement>(null)
  useKeyPress('Enter', () => ref.current?.click())

  const [passwordCheck, setPasswordCheck] = useState({
    password: '',
    confirmPassword: ''
  })
  const isPasswordsNotMatches = passwordCheck.password !== passwordCheck.confirmPassword

  const openContactInfoModal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true) // Устанавливаем isSubmitted в true при попытке отправки

    if (isPasswordsNotMatches || passwordError) return

    dispatch(openModal('registerNameModal'))
    dispatch(addFormData({
      password: passwordCheck.password
    }))
  }

  return (
    <div className={styles.container}>
      <LoginSignature />
      <form
        onSubmit={openContactInfoModal}
        className={styles.form}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }} className={styles.container_password}>
          <label style={{ paddingBottom: '4px' }}>Придумайте пароль</label>
          <PasswordField
            onFormatError={isError => setPasswordError(isError)}
            onChangeValue={password => setPasswordCheck(p => { return { ...p, password } })} />
          {
            passwordError
            &&
            <ErrorSignature style={{
              bottom: -20,
              position: 'absolute'
            }}>
              Пароль должен быть не менее 6 символов длиной.
            </ErrorSignature>
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} className={styles.confirm_password}>
          <label style={{ paddingBottom: '4px' }}>Повторите пароль</label>
          <PasswordField
            placeholder='Повторите пароль'
            onFormatError={isError => setPasswordError(isError)}
            onChangeValue={password => setPasswordCheck(p => { return { ...p, confirmPassword: password } })} />
        </div>
        <div>
          <CheckboxButton label='Запомнить пароль' />
        </div>
        <Button
          ref={ref}
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px',
            marginTop: '10px'
          }}>Продолжить</Button>
      </form>
      {
        isSubmitted && isPasswordsNotMatches
        &&
        <ErrorSignature style={{
          textAlign: 'center',
          marginTop: 10
        }}>
          Пароли не совпадают
        </ErrorSignature>
      }
    </div>
  )
}

export default AuthRegisterPassword