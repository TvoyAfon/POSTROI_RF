import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../../../../hooks/useModal'
import { useOutsideClick } from '../../../../../../hooks/useOutside'
import { userService } from '../../../../../../services/user/user.service'
import { changeUser } from '../../../../../../store/slices/AuthSlice/AuthSlice'
import { RootState } from '../../../../../../store/store'
import Button from '../../../../../ui/Button/Button'
import Field from '../../../../../ui/Field/Field'
import Loader from '../../../../../ui/Loader/Loader'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../../ui/Modal/ModalHeader'

interface NameModalProps {
  onSubmit?: (fullName: { surname: string; name: string; middlename: string }) => void
  children: React.ReactElement,
  updateData?: 'user' | 'userWorkerProfileData'
}

const NameModal: React.FC<NameModalProps> = ({
  children,
  updateData
}) => {
  const { handleClose, handleOpen, isOpen } = useModal()
  const [fullName, setFullName] = useState('')
  const { user } = useSelector((state: RootState) => state.auth)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()


  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, handleClose)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^[А-Яа-яЁё\s]*$/
    if ((value.length <= 50 || value.length === 0) && regex.test(value)) {
      setFullName(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user?.id) return
    const [surname = '', name = '', middlename = ''] = fullName.split(' ')

    try {
      if (updateData === 'user') {
        setLoading(true)
        if (fullName.length !== 0) {
          await userService.editFIO(user?.id, name, surname, middlename)
          dispatch(changeUser({
            ...user,
            first_name: name,
            last_name: surname,
            patronymic: middlename
          }))

        }
      }

    } catch (error) {
      setLoading(false)
      console.log('Произошла ошибка при смене имени', error)
    }
    setLoading(false)
    handleClose()
  }

  return (
    <>
      {React.cloneElement(children, { onEdit: handleOpen })}
      <BaseModal ref={ref} isOpen={isOpen}>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column', gap: '32px'
        }}>
          <ModalHeader text='Введите ваше полное имя' onClose={handleClose} />
          <Field
            onChange={handleChangeName}
            value={fullName}
            placeholder="Введите фамилию, имя, отчество"
          />
          <Button>{loading ? <Loader color='white' /> : 'Подтвердить'}</Button>
        </form>
      </BaseModal>
    </>
  )
}

export default NameModal