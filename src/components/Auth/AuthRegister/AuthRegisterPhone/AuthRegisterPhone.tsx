import React, { SetStateAction, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useKeyPress from '../../../../hooks/useKeyPress'
import { infoService } from '../../../../services/auth/info.service'
import { signupService } from '../../../../services/auth/signup.service'
import { changeUser } from '../../../../store/slices/AuthSlice/AuthSlice'
import { openModal } from '../../../../store/slices/FormSlice/FormSlice'
import { addFormData } from '../../../../store/slices/RegisterSlice'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import CodeInput from '../../../ui/CodeInput/CodeInput'
import Loader from '../../../ui/Loader/Loader'
import ErrorSignature from '../../ui/ErrorSignature'
import { Statuses } from '../../utils/types'
import styles from './AuthRegisterPhone.module.scss'

interface IAuthRegisterPhone {
  isRegister?: boolean,
  phone?: string,
  setOpenModal?: React.Dispatch<SetStateAction<boolean>>
}

const AuthRegisterPhone: React.FC<IAuthRegisterPhone> = ({ isRegister = true, phone, setOpenModal }) => {
  const { formData } = useSelector((state: RootState) => state.register)
  const dispatch = useDispatch()
  const [code, setCode] = useState<string>('')
  const { user } = useSelector((state: RootState) => state.auth)
  const [isIncorrectCode, setIsInCorrectCode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  const ref = useRef<HTMLButtonElement>(null)
  useKeyPress('Enter', () => ref.current?.click())

  const handleContinue = async () => {            /* ДЛЯ РЕГИСТРАЦИИ */
    if (!code.trim() || code.length < 4) return
    try {
      setIsLoading(true)
      const schema = {
        phone: formData.tel,
        code: parseInt(code)
      }
      if (!schema.phone) {
        delete schema.phone
      }
      await signupService.checkCode(schema)
      dispatch(openModal('registerPasswordModal'))
      dispatch(addFormData({ ...formData, code: schema.code }))

    } catch (error: any) {
      if (error.message === Statuses.INCORRECT_CODE) {
        setIsInCorrectCode(true)
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleConfirmPhone = async () => {      /* ДЛЯ ПОДТВЕРЖДЕНИЯ НОМЕРА В ПРОФИЛЕ */
    try {
      setIsLoading(true)
      await infoService.checkCode({
        code: parseInt(code),
        phone
      })
      try {
        if (user?.id && phone && code) {
          await infoService.editPhone({
            client_id: user?.id,
            code: parseInt(code),
            phone
          })
          dispatch(changeUser({
            ...user,
            phone,
            phone_check: true
          }))
        }
        setOpenModal ? setOpenModal(false) : null
      } catch (error) {
        console.log('Не удалось изменить номер телефона', error)
      }

    } catch (error) {

      setIsLoading(false)
      setIsInCorrectCode(true)
      console.log('Код неверный', error)
    }
  }

  const handleChangeCode = (val: string) => {
    setIsInCorrectCode(false)
    setCode(val)
  }

  return (
    <div className={styles.authRegisterPhone_container}>
      <CodeInput fields={4} name='code-inpt' inputMode='tel' onChange={handleChangeCode} />
      <span style={{ textAlign: 'center' }}>Введите код из смс сообщения отправленого на номер <br /> {formData.tel}</span>
      {
        isIncorrectCode
        &&
        <ErrorSignature style={{ textAlign: 'center' }}
        >
          Неверный код
        </ErrorSignature>
      }
      <Button
        ref={ref}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }} onClick={isRegister ? handleContinue : handleConfirmPhone}>
        {isLoading ? <Loader color='white' /> : 'Продолжить'}
      </Button>
    </div>
  )
}

export default AuthRegisterPhone