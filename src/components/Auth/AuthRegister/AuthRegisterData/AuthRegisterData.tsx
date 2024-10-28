import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../../../hooks/auth/useAuth'
import useKeyPress from '../../../../hooks/useKeyPress'
import { IModal } from '../../../../interface/modal.props'
import { IUserWithCodeAndWithoutId } from '../../../../services/auth/common/types'
import { signupService } from '../../../../services/auth/signup.service'
import { openModal } from '../../../../store/slices/FormSlice/FormSlice'
import { addFormData } from '../../../../store/slices/RegisterSlice'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import Loader from '../../../ui/Loader/Loader'
import ErrorSignature from '../../ui/ErrorSignature'
import { Statuses } from '../../utils/types'
import { writeTokensToCookie } from '../../utils/utils'
import styles from './AuthRegisterData.module.scss'

const AuthRegisterData: React.FC<IModal> = () => {
  const { formData } = useSelector((state: RootState) => state.register)
  const { external_hash } = useSelector((state: RootState) => state.externalHashSlice)
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  useKeyPress('Enter', () => ref.current?.click())

  const auth = useAuth()
  const handleContinue = async () => {
    try {
      setIsLoading(true)

      const user: IUserWithCodeAndWithoutId = {
        email: formData.email,
        phone: formData.tel,
        password: formData.password || '',
        first_name: formData.name || '',
        last_name: formData.surname || '',
        city: formData.city || 'Москва',
        patronymic: formData.middleName,
        category_person: formData.individual || formData.naturalPerson || formData.selfEmployed || 'Физическое лицо',
        code: formData.code || 0,
        ...(external_hash ? { external_hash } : {}) 
      }
      if (!user.email) {
        delete user.email
      }

      if (!user.phone || user.phone.length < 7) {
        delete user.phone
      }

      const data = await signupService.createUser(user)
      if (!data) return


      writeTokensToCookie({
        access_token: data.access_token,
        refresh_token: data.refresh_token
      })
      auth()  /* пока что хз ? */
      dispatch(openModal('registerDoneModal'))
      dispatch(addFormData({})) // reset global auth data
    } catch (error: any) {
      if (error.message === Statuses.USER_IS_EXISTS) {
        setErrorMessage("Такой пользователь уже существует")
      } else if (error.messsage === Statuses.INCORRECT_CODE) {
        setErrorMessage('Неверный код')
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.container_data}>
          <span>Логин: <b>{formData.email || formData.tel}</b></span>
          <span>
            <b>{formData.surname} {formData.name} {formData.middleName}</b>
          </span>
          <span>{formData.individual || formData.selfEmployed || formData.naturalPerson}</span>
          <span>
            <b>{formData.city || 'Москва'}</b>
          </span>
        </div>
      </div>
      <CheckboxButton label='Даю согласие на обработку персональных данных.' />
      <Button ref={ref} style={{
        display: 'flex', justifyContent: 'center'
      }} onClick={handleContinue}>
        {isLoading ? <Loader color='white' /> : 'Продолжить'}
      </Button>
      <ErrorSignature style={{
        marginTop: '10px',
        textAlign: 'center'
      }}>
        {errorMessage}
      </ErrorSignature>
    </div>
  )
}

export default AuthRegisterData
