import React, { FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useKeyPress from '../../../../hooks/useKeyPress'
import { IModal } from '../../../../interface/modal.props'
import { resetService } from '../../../../services/auth/reset.service'
import { signupService } from '../../../../services/auth/signup.service'
import { addResetPasswordData } from '../../../../store/slices/AuthSlice/AuthResetPasswordSlice'
import { changeEmailOrPhone, openResetModal } from '../../../../store/slices/ResetPasswordSlice/ResetPasswordSlice'
import Button from '../../../ui/Button/Button'
import Loader from '../../../ui/Loader/Loader'
import AuthTypeSwitcher from '../../ui/AuthTypeSwitcher/AuthTypeSwitcher'
import ErrorSignature from '../../ui/ErrorSignature'
import EmailField from '../../ui/Fields/EmailField'
import PhoneField from '../../ui/Fields/PhoneField'
import styles from '../AuthResetPassword.module.scss'

const AuthResetEmail: React.FC<IModal> = ({ isPhone, selectRadioButton }) => {
  const [phone, setPhone] = useState<string>('')
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false)
  const [isCodeError, setIsCodeError] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [isEmailError, setIsEmailError] = useState<boolean>(false)
  const [isExist, setIsExist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const ref = useRef<HTMLButtonElement>(null)
  useKeyPress('Enter', () => ref.current?.click())

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const loginData = {
      login: isPhone ? phone : email,
      login_type: isPhone ? 'phone' : 'email'
    }

    try {
      setIsLoading(true)
      setIsExist(false)
      // Check if the user exists
      await signupService.existUser(loginData)
    } catch (error) {
      setIsLoading(false)
      setIsExist(true)
      return // If user doesn't exist, exit
    }

    // Check for errors in input
    if (isPhone && (isPhoneError || !phone.trim())) {
      return // If there's an error with the phone, exit
    }
    if (!isPhone && (isEmailError || !email.trim())) {
      return // If there's an error with the email, exit
    }

    // Main logic for sending data
    setIsLoading(true)

    try {
      if (isPhone) {
        setIsPhoneError(false)
        dispatch(addResetPasswordData({ phone: phone }))
        await resetService.resetSendCodeSms(phone)
        dispatch(openResetModal('verificationCodeModal'))
      } else {
        setIsEmailError(false)
        dispatch(addResetPasswordData({ email: email }))
        await resetService.resetSendCodeEmail(email)
        dispatch(openResetModal('verificationCodeModal'))
      }

      // Reset errors after a successful submission
      setIsPhoneError(false)
      setIsEmailError(false)

    } catch (error) {
      if (isPhone) {
        setIsPhoneError(true)
      } else {
        setIsEmailError(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (value: string) => {
    setIsCodeError(false)
    dispatch(changeEmailOrPhone({
      value,
      isPhone: Boolean(isPhone)
    }))
    isPhone ? setPhone(value) : setEmail(value)

    // Reset appropriate error states based on the input
    if (isPhone) {
      setIsPhoneError(false)
    } else {
      setIsEmailError(false)
    }
  }

  return (
    <form className={styles.container1} onSubmit={handleSubmit}>
      <AuthTypeSwitcher isPhone={isPhone} selectRadioButton={selectRadioButton} />
      <div className='flex-column gap-medium'>
        {
          isPhone
            ? <PhoneField onChangeValue={handleChange} />
            : <EmailField onChangeValue={handleChange} />
        }
        {isCodeError && <ErrorSignature>
          Код был отправлен. Повторите попытку позднее
        </ErrorSignature>}
        <Button ref={ref} type="submit">{isLoading ? <Loader color='white' /> : 'Продолжить'}</Button>
        {isPhoneError && (!isEmailError || !isExist) && <ErrorSignature style={{ paddingTop: 8, textAlign: 'center' }}>Не удалось отправить код</ErrorSignature>}
        {isEmailError && (!isPhoneError || !isExist) && <ErrorSignature style={{ paddingTop: 8, textAlign: 'center' }}>Не удалось отправить код</ErrorSignature>}
        {isExist && <ErrorSignature style={{ paddingTop: 10, textAlign: 'center' }}>Пользователь не существует</ErrorSignature>}
      </div>
    </form>
  )
}

export default AuthResetEmail