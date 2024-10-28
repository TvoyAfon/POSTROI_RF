
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../hooks/auth/useAuth'
import useKeyPress from '../../hooks/useKeyPress'
import { useOutsideClick } from '../../hooks/useOutside'
import { IModal } from '../../interface/modal.props'
import { loginService } from '../../services/auth/login.service'
import { signupService } from '../../services/auth/signup.service'
import { closeAllModal, openModal } from '../../store/slices/FormSlice/FormSlice'
import { setExternalHash } from '../../store/slices/other/setExternalHash'
import { setTriggerYandexInit } from '../../store/slices/other/triggerFetch'
import { addFormData } from '../../store/slices/RegisterSlice'
import { openResetModal } from '../../store/slices/ResetPasswordSlice/ResetPasswordSlice'
import { RootState } from '../../store/store'
import Button from '../ui/Button/Button'
import CloseButton from '../ui/CloseButton/CloseButton'
import Loader from '../ui/Loader/Loader'
import Logo from '../ui/Modal/Logo'
import OverLay from '../ui/Modal/OverLay'
import UncorrectFormat from '../ui/Modal/UncorrectFormat'
import styles from './Auth.module.scss'
import AuthTypeSwitcher from './ui/AuthTypeSwitcher/AuthTypeSwitcher'
import ErrorSignature from './ui/ErrorSignature'
import EmailField from './ui/Fields/EmailField'
import PasswordField from './ui/Fields/PasswordField/PasswordField'
import PhoneField from './ui/Fields/PhoneField'
import FormSwitcher from './ui/FormSwitcher/FormSwitcher'
import LoginUsing from './ui/LoginUsing/LoginUsing'
import PrivacyPolicy from './ui/PrivacyPolicy/PrivacyPolicy'
import { Statuses } from './utils/types'
import { writeTokensToCookie } from './utils/utils'

const signatureStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10px'
}

const Auth: React.FC<IModal> = ({ closeModal, isPhone, selectRadioButton }) => {
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [number, setNumber] = useState('+7')
  const [numberError, setNumberError] = useState<boolean>(false)
  const [isExist, setIsExist] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const authRef = useRef<HTMLDivElement>(null)
  const auth = useAuth()
  const [isCodeError, setIsCodeError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [emptyErrorField, setEmptyErrorField] = useState({
    email: false,
    phone: false,
    password: false
  })

  const { external_hash } = useSelector((state: RootState) => state.externalHashSlice)
  const [isOpenSocialModal, setIsOpenSocialModal] = useState(false)

  useEffect(() => {
    if (external_hash) {
      setIsOpenSocialModal(true)
      // Вызов регистрации для соц сетей
    }
  }, [external_hash])


  const handleCloseSocialModal = () => {
    setIsOpenSocialModal(false)
    setIsLogin(false)
    dispatch(setTriggerYandexInit())
    handleSwitcherClick()
  }

  const handleCloseAuthModal = () => {
    closeModal && closeModal()
    dispatch(setExternalHash(''))
    setIsOpenSocialModal(false)
  }

  const [isWrongPhone, setIsWrongPhone] = useState<boolean>(false)
  const handleSwitcherClick = () => setIsLogin(isLogin ? false : true)

  const loginData = {
    login: isPhone ? number : email,
    password,   /* Проверка на телефон или почту */
    login_type: isPhone ? 'phone' : 'email'
  }
  useKeyPress('Enter', () => buttonRef.current?.click())
  useOutsideClick(authRef, handleCloseAuthModal)

  const handleContinueRegister = async () => {
    if (((numberError || !number.replace('+7', '').trim()) && isPhone) || ((emailError || !email.trim()) && !isPhone) || (numberError || emailError)) {
      return
    }

    try {
      setIsLoading(true)
      await signupService.existUser({
        login: loginData.login,
        login_type: loginData.login_type  /* Проверка на существования пользователя в БД */
      })
      return setIsExist(true)
    } catch (error) {
      setIsExist(false)
    }
    finally {
      setIsLoading(false)
    }
    if (!isPhone) {
      try {
        setIsLoading(true)
        await signupService.sendCodeEmail(loginData.login)  /* Запрос на регистрацию  */
        dispatch(openModal('registerEmailModal'))
        dispatch(addFormData({
          email: email
        }))
      }
      catch (error: any) {
        if (error.message === Statuses.CODE_HAS_BEEN_ALREADY_SENT) {
          setIsCodeError(true)
        }
      }
      finally {
        setIsLoading(false)
        return
      }
    }

    if (isPhone) {
      try {
        setIsLoading(true)
        await signupService.sendCodeSms(loginData.login)  /* Запрос на регистрацию  */
        dispatch(openModal('registerEmailModal'))
        dispatch(addFormData({
          tel: number
        }))
      }
      catch (error: any) {
        if (error.message === Statuses.CODE_HAS_BEEN_ALREADY_SENT) {
          setIsCodeError(true)
        }
      }
      finally {
        setIsLoading(false)
        return
      }
    }
  }
  const handleContinueLogin = async () => {
    // Сброс флага ошибки перед входом
    setIsWrongPhone(false)

    if (number.length < 3) {
      setEmptyErrorField({
        ...emptyErrorField,
        phone: true,
      })
    }
    if (password.length < 6) {
      setEmptyErrorField({
        ...emptyErrorField,
        password: true,
      })
    }
    // Проверка на наличие логина и пароля
    if (password.length === 0 && email.length === 0) {
      setIsWrongPhone(true)
    } else {
      setIsWrongPhone(false)
    }

    if (email.length === 0) setEmailError(true)

    try {
      setIsLoading(true)

      const data = await loginService.login({ /* Запрос на логин */
        login: loginData.login,
        password: loginData.password,
        login_type: loginData.login_type,
      })

      if (!data) return

      writeTokensToCookie({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      })

      auth()    /* Авторизация и рендер данных профиля */
      closeModal && closeModal()
    } catch (error: any) {
      setIsWrongPhone(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyLogin = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isLogin) {
      handleContinueLogin()
    }
  }

  const handleKeySignUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLogin) {
      handleContinueRegister()
    } else if (e.key === 'Enter' && isLogin) {
      handleContinueLogin()
    }
  }

  const handleForgetPassword = () => {
    dispatch(closeAllModal())
    dispatch(openResetModal('emailModal'))
  }

  const handleChangePhone = (value: string) => {
    if (value.length > 2) setEmptyErrorField({
      ...emptyErrorField, phone: false
    })
    setIsWrongPhone(false)
    setIsExist(false)
    setNumber(value)
  }

  const handleChangePassword = (value: string) => {
    if (value.length > 6) setEmptyErrorField({
      ...emptyErrorField, password: false
    })
    setIsExist(false)
    setPassword(value)
  }

  return (
    <>
      {isOpenSocialModal ? <UncorrectFormat
        text={'Не найдено привязанной учетной записи к внешнему сервису.Зарегестрируйтесь.'}
        style={{ top: '50%', left: '50%' }}
        onClose={handleCloseSocialModal} /> : <>
        <OverLay />
        <div ref={authRef} className={styles.auth_container}>
          <CloseButton
            onClick={handleCloseAuthModal}
            style={{
              marginLeft: 'auto'
            }} />
          <Logo styles={{
            fontSize: '60px',
            fontWeight: '600',
            paddingBottom: '0px'
          }} />
          <FormSwitcher handleClick={handleSwitcherClick} isLogin={isLogin} />
          <AuthTypeSwitcher selectRadioButton={selectRadioButton} isPhone={isPhone} />
          <div className={styles.auth_container_logInput}>
            {
              isPhone
                ?
                <>
                  <PhoneField autoComplete='tel' onKeyDown={handleKeySignUp} onChangeValue={handleChangePhone} onFormatError={isError => setNumberError(isError)} />
                </>
                :
                <>
                  <EmailField autoComplete='email' setIsExistUser={setIsExist} onKeyDown={handleKeySignUp} onChangeValue={
                    addr => setEmail(addr)} onFormatError={isError => setEmailError(isError)} />
                </>
            }
            {
              isLogin
              &&
              <>
                <PasswordField
                  onKeyDown={handleKeyLogin}
                  onChangeValue={handleChangePassword} />
                <span onClick={handleForgetPassword} style={{ color: '#7099ED', cursor: 'pointer', fontWeight: '300', display: 'flex', justifyContent: 'flex-end', paddingRight: '5px ' }}>Забыли пароль?</span>
              </>
            }
          </div>
          <div style={{ position: 'relative' }}>
            {isLogin
              ?
              <Button ref={buttonRef} style={{ width: 435 }} disabled={isLoading} onClick={handleContinueLogin} >
                {isLoading ? <Loader color='white' /> : "Войти"}
              </Button>
              :
              <Button style={{ width: 435 }} disabled={isLoading} onClick={handleContinueRegister} >
                {isLoading ? <Loader color='white' /> : "Зарегистрироваться"}
              </Button>}
            {isWrongPhone && <ErrorSignature style={{ position: 'absolute', top: -50 }}>Неверное имя пользователя или пароль</ErrorSignature>}
            {isExist && <ErrorSignature style={{ position: 'absolute', top: -50 }}>Пользователь уже зарегестрирован</ErrorSignature>}
          </div>
          {
            isCodeError
            &&
            <ErrorSignature style={signatureStyles}>
              Код уже был отправлен.Повторите попытку позднее.
            </ErrorSignature>
          }
          <PrivacyPolicy />
          <LoginUsing />
        </div>
      </>}
    </>
  )
}

export default Auth
