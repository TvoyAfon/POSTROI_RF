import { FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../../hooks/useModal'
import { useOutsideClick } from '../../../../hooks/useOutside'
import { userService } from '../../../../services/user/user.service'
import { changeUser } from '../../../../store/slices/AuthSlice/AuthSlice'
import { addFormMasterData } from '../../../../store/slices/FormMaster/formMasterSlice'
import { addUserProfileData } from '../../../../store/slices/FormWorker/formWorkerSlice'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import Field from '../../../ui/Field/Field'
import Loader from '../../../ui/Loader/Loader'
import BaseModal from '../../../ui/Modal/BaseModal'
import ModalHeader from '../../../ui/Modal/ModalHeader'

const AgeModal: FC<{ children: JSX.Element, updateData: 'user' | 'userWorkerProfile' | 'userMasterProfile' }> = ({ children, updateData }) => {
	const { isOpen, handleClose, handleOpen } = useModal()
	const dispatch = useDispatch()
	const { userWorkerProfileData } = useSelector((state: RootState) => state.formWorkerReducer)
	const { user } = useSelector((state: RootState) => state.auth)
	const { masterForm } = useSelector((state: RootState) => state.formMasterReducer)
	const [age, setAge] = useState('')
	const [loading, setLoading] = useState(false)




	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const regex = /^\d*$/
		if (regex.test(value) && value.length < 3) {
			setAge(value)
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (updateData === 'userWorkerProfile') {
			dispatch(addUserProfileData({ ...userWorkerProfileData, age }))
		}
		else if (updateData === 'user') {
			if (!user?.id) return
			try {
				setLoading(true)
				const responseAge = await userService.editAge(user?.id, Number(age))
				console.log(responseAge.data)
				dispatch(changeUser({
					...user,
					client_age: age
				}))
				setLoading(false)
			}
			catch (error) {
				setLoading(false)
				console.log('Ошибка смены возраста', error)
			}
		}
		else if (updateData === 'userMasterProfile') {
			dispatch(addFormMasterData({
				...masterForm,
				age
			}))
		}
		handleClose()

	}

	return (
		<>
			<children.type {...children.props} onEdit={handleOpen} />
			<BaseModal ref={ref} isOpen={isOpen}>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: 'column', gap: '32px',
					width: '247px'
				}}>
					<ModalHeader text='Возраст' onClose={handleClose} />
					<Field value={age} onChange={handleChangeName} style={{
						width: 'auto'
					}} />
					<Button>{loading ? <Loader color='white' /> : 'Подтвердить'}</Button>
				</form>
			</BaseModal>
		</>
	)
}

export default AgeModal