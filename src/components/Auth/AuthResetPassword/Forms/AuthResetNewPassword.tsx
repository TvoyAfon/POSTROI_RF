import React, { FormEvent, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useKeyPress from '../../../../hooks/useKeyPress'
import { resetService } from '../../../../services/auth/reset.service'
import { changePassword, closeAllModals, openResetModal } from '../../../../store/slices/ResetPasswordSlice/ResetPasswordSlice'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import Loader from '../../../ui/Loader/Loader'
import Logo from '../../../ui/Modal/Logo'
import OverLay from '../../../ui/Modal/OverLay'
import ErrorSignature from '../../ui/ErrorSignature'
import PasswordField from '../../ui/Fields/PasswordField/PasswordField'
import styles from '../AuthResetPassword.module.scss'

const AuthResetNewPassword: React.FC = () => {
  const [isPasswordsMatches, setIsPasswordsMatches] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [passwordError, setPasswordError] = useState<{
    passwordError: boolean
    confirmPasswordError: boolean
    lengthError: boolean
  }>({
    passwordError: false,
    confirmPasswordError: false,
    lengthError: false
  })

  const dispatch = useDispatch()
  const ref = useRef<HTMLButtonElement>(null)
  const { password, confirmPassword } = useSelector((state: RootState) => state.reset.formData.password)
  const { userResetPassword } = useSelector((state: RootState) => state.resetPassword)

  useKeyPress('Enter', () => ref.current?.click())

  const handleChangePassword = (value: string) => {
    dispatch(changePassword({ password: value, confirmPassword }))
  }

  const handleChangeConfirmPassword = (value: string) => {
    dispatch(changePassword({ confirmPassword: value, password }))
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Reset error states
    setPasswordError({
      passwordError: false,
      confirmPasswordError: false,
      lengthError: false
    })

    // Validation conditions
    const isPasswordTooShort = password.trim().length < 6
    const passwordsMatch = password === confirmPassword

    if (!passwordsMatch) {
      setIsPasswordsMatches(false)
      setPasswordError(prev => ({ ...prev, confirmPasswordError: true }))
    }

    if (isPasswordTooShort) {
      setPasswordError(prev => ({ ...prev, lengthError: true }))
    }

    // Prevent submission if there are any errors
    if (!passwordsMatch || !password.trim() || !confirmPassword.trim() || passwordError.passwordError || passwordError.confirmPasswordError || isPasswordTooShort) {
      return
    }

    setIsPasswordsMatches(true) // Reset match state before submission

    try {
      setIsLoading(true)
      await resetService.resetPassword({
        email: userResetPassword?.email,
        code: Number(userResetPassword?.code),
        password: password,
        phone: userResetPassword?.phone
      }) // Call resetPassword method from ResetService
      dispatch(openResetModal('resetPasswordDoneModal'))
    } catch (error: any) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <OverLay />
      <div className={styles.resetContainer3}>
        <form className={styles.container3} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className='textSizeL'>НОВЫЙ ПАРОЛЬ</span>
            <CloseButton onClick={() => dispatch(closeAllModals())} />
          </div>
          <span>Ваш пароль был сброшен. Придумайте новый пароль.</span>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            <label style={{ marginBottom: '5px' }}>Придумайте пароль</label>
            <PasswordField onChangeValue={handleChangePassword} onFormatError={isError => setPasswordError({ ...passwordError, passwordError: isError })} />
            {passwordError.passwordError && <ErrorSignature style={{ marginTop: '25px' }}>Неправильный формат пароля</ErrorSignature>}
            {passwordError.lengthError && <ErrorSignature style={{ marginTop: '25px' }}>Пароль должен содержать минимум 6 символов.</ErrorSignature>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px' }}>Подтвердите пароль</label>
            <PasswordField onChangeValue={handleChangeConfirmPassword} onFormatError={isError => setPasswordError({ ...passwordError, confirmPasswordError: isError })} />
          </div>
          <CheckboxButton label='Запомнить пароль' />
          <Button ref={ref}>{isLoading ? <Loader color='white' /> : 'Продолжить'}</Button>
          {!isPasswordsMatches && <ErrorSignature style={{ position: 'absolute', left: 150, bottom: 35 }}>Пароли не совпадают</ErrorSignature>}
          {isError && <ErrorSignature style={{ paddingTop: 10, textAlign: 'center' }}>Произошла ошибка при создании пароля.</ErrorSignature>}
          <Logo styles={{ marginRight: 'auto', paddingTop: '20px' }} />
        </form>
      </div>
    </>
  )
}

export default AuthResetNewPassword