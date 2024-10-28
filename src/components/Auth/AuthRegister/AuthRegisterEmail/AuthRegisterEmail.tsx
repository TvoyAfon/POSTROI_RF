import React, { CSSProperties, FormEvent, SetStateAction, useRef, useState } from 'react'
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
import { Statuses } from '../../utils/types'
import { getTokens } from '../../utils/utils'
import styles from './AuthRegisterEmail.module.scss'

interface IAuthRegisterEmail {
  register?: boolean,
  email?: string,
  setOpenModal?: React.Dispatch<SetStateAction<boolean>>,
  style?: CSSProperties,
}

const AuthRegisterEmail: React.FC<IAuthRegisterEmail> = ({ register = true, email, setOpenModal, style }) => {
  const [code, setCode] = useState<string>('')
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isIncorrectCode, setIsIncorrectCode] = useState<boolean>(false)
  const { formData } = useSelector((state: RootState) => state.register)
  const { user } = useSelector((state: RootState) => state.auth)

  const ref = useRef<HTMLButtonElement>(null)
  useKeyPress('Enter', () => ref.current?.click())


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (!code.trim() || code.length < 4) return

    setIsLoading(true)
    try {
      const schema = {
        email: formData.email || undefined,

        code: parseInt(code) // Добавляем систему счисления для parseInt
      }

      await signupService.checkCode(schema)
      dispatch(addFormData({ ...formData, code: schema.code }))
      dispatch(openModal('registerPasswordModal'))

    } catch (error: any) {
      if (error.message === Statuses.INCORRECT_CODE) {
        setIsIncorrectCode(true)
      }
    } finally {
      setIsLoading(false)
    }
  }
  const handleChangeCode = (val: string) => {
    setCode(val)
    setIsIncorrectCode(false)
  }

  {/* const handleSendCode = async () =>{
    if(email && !register)
     await infoService.sendCodeEmail(email)

    if(email && register)
      await signupService.sendCodeEmail(email)
  }*/}

  const handleConfirmEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!code.trim() || code.length < 4) return

    setIsLoading(true)

    try {
      const parsedCode = parseInt(code)
      const schema = {
        email: email || undefined,
        code: parsedCode
      }

      await infoService.checkCode(schema)
      const { access_token } = getTokens()
      if (user?.id && email && access_token) {
        await infoService.editEmail({
          client_id: user.id,
          code: parsedCode,
          email
        })
        dispatch(changeUser({
          ...user,
          email,
          email_check: true
        }))
      }

      setOpenModal ? setOpenModal(false) : null

    } catch (error: any) {

      if (error.message === Statuses.INCORRECT_CODE) {
        setIsIncorrectCode(true)
      } else {
        console.error('Произошла ошибка:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form
      style={style}
      onSubmit={register ? handleSubmit : handleConfirmEmail}
      className={styles.authRegisterEmailContent}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CodeInput fields={4} name='code-inpt' inputMode='tel' onChange={handleChangeCode} />
      </div>
      {isIncorrectCode && <span style={{ color: 'red', textAlign: 'center' }}>Неверный код. Пожалуйста, попробуйте еще раз.</span>}
      <Button ref={ref} style={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading ? <Loader color='#fff' /> : 'Продолжить'}
      </Button>
      <div className='flex-column gap-small'>
        <span> Введите код из сообщения, отправленного на электронную почту.</span>
      </div>
    </form>
  )
}

export default AuthRegisterEmail