import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import edit from '../../../../../../assets/images/other/edit-white.svg'
import { userService } from '../../../../../../services/user/user.service'
import { changeUser } from '../../../../../../store/slices/AuthSlice/AuthSlice'
import { RootState } from '../../../../../../store/store'
import Button from '../../../../../ui/Button/Button'
import CreateOrderTextArea from '../../../../../ui/CreateOrderTextArea/CreateOrderTextArea'
import Loader from '../../../../../ui/Loader/Loader'

const About = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)
	const [about, setAbout] = useState(user?.about_yourself || '')
	const [loading, setLoading] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const handleChangeAbout = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setAbout(e.target.value)
	}

	const handleConfirm = async () => {
		if (!user?.id) return

		setLoading(true) // устанавливаем loading в true до начала запроса
		try {
			await userService.editAboutYourself(user.id, about)
			dispatch(changeUser({ ...user, about_yourself: about }))
			setIsEditing(false) // завершаем редактирование
		} catch (error) {
			console.error('Не удалось изменить о себе', error)
		} finally {
			setLoading(false) // устанавливаем loading в false в любом случае
		}
	}

	return (
		<>
			{isEditing ? (
				<CreateOrderTextArea
					value={about}
					onChange={handleChangeAbout}
					style={{
						width: '100%',
						minHeight: '86px',
					}}
					placeholder='Как давно вы работаете, каких успехов добились? В чём особенность вашего подхода? Какие заказы вам интересны?'
				/>
			) : (
				<span>{about}</span>
			)}
			<Button onClick={isEditing ? handleConfirm : () => setIsEditing(true)} style={{ width: '16%' }}>
				<img src={edit} alt='edit' />
				{loading ? <Loader color='white' /> : isEditing ? 'Подтвердить' : 'Редактировать'}
			</Button>
		</>
	)
}

export default About