import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useKeyPress from '../../../../hooks/useKeyPress'
import { resetService } from '../../../../services/auth/reset.service'
import { addResetPasswordData } from '../../../../store/slices/AuthSlice/AuthResetPasswordSlice'
import { changeVerificationCode, openResetModal } from '../../../../store/slices/ResetPasswordSlice/ResetPasswordSlice'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import CodeInput from '../../../ui/CodeInput/CodeInput'
import Loader from '../../../ui/Loader/Loader'
import ErrorSignature from '../../ui/ErrorSignature'

interface IAuthResetVerificationCode {
  isPhone: boolean
}

const AuthResetVerificationCode: React.FC<IAuthResetVerificationCode> = ({ isPhone }) => {
  const dispatch = useDispatch()
  const { emailOrPhone } = useSelector((state: RootState) => state.reset.formData)
  const { userResetPassword } = useSelector((state: RootState) => state.resetPassword)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRequest, setIsRequest] = useState(false)
  const [isSendCode, setIsSendCode] = useState(false)

  const ref = useRef<HTMLButtonElement>(null)
  useKeyPress('Enter', () => ref.current?.click())
  const handleSendCode = async () => {

    try {
      userResetPassword?.email && await resetService.resetSendCodeEmail(userResetPassword.email) ||
        userResetPassword?.phone && await resetService.resetSendCodeSms(userResetPassword.phone)
      setIsRequest(false)
      setIsSendCode(true)

    } catch (error) {
      setIsRequest(true)
      setIsSendCode(false)
    }
  }

  const handleChangeCode = (code: string) => {
    setIsRequest(false)
    setIsSendCode(false)
    setIsError(false)
    dispatch(addResetPasswordData({
      ...userResetPassword,
      code
    }))
    dispatch(changeVerificationCode(code))
  }

  const handleContinue = async () => {

    try {
      setIsLoading(true)

      await resetService.resetCheckCode({
        code: Number(userResetPassword?.code),
        email: userResetPassword?.email,
        phone: userResetPassword?.phone
      })
      dispatch(openResetModal('newPasswordModal'))
    } catch (error: any) {
      setIsError(true)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex-column gap-medium-large' style={{ paddingTop: '32px', paddingBottom: '32px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <CodeInput fields={4} name='code-inpt' inputMode='email' onChange={handleChangeCode} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        whiteSpace: 'pre-wrap'
      }}>
        <span style={{ textAlign: 'center', fontWeight: '100' }}>
          {
            isPhone
              ? `Введите код из смс сообщения отправленного на номер ${emailOrPhone.value}`
              : `Введите код из сообщения отправленного на  ${emailOrPhone.value}`
          }
        </span>
      </div>
      <Button ref={ref} onClick={handleContinue}>{isLoading ? <Loader color='white' /> : 'Продолжить'}</Button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', fontSize: 14 }}>
        <span>Не пришел код?</span>
        <span onClick={handleSendCode} style={{ textDecoration: 'underline', cursor: "pointer", fontWeight: 300 }}>{isSendCode ? 'Код был отправлен' : 'Отправьте код повторно'}</span>
      </div>
      <div style={{ position: 'relative' }}>
        {isError && <ErrorSignature style={{ textAlign: 'center', position: 'absolute', bottom: -15, left: 188 }}>Код неверный</ErrorSignature>}
        {isRequest && <ErrorSignature style={{ textAlign: 'center', position: 'absolute', bottom: 0, left: 52 }}>Код уже был отправлен.Повторите попытку позднее</ErrorSignature>}
      </div>
    </div>
  )
}

export default AuthResetVerificationCode