import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cameraIcon from '../../../../assets/images/profile/camera.png'
import userDefault from '../../../../assets/images/profile/user-default.svg'
import { useModal } from '../../../../hooks/useModal'
import { RootState } from '../../../../store/store'
import Avatar from '../../../ui/Avatar/Avatar'
import AvatarLoader from '../../../ui/AvatarLoader/AvatarLoader'
import Button from '../../../ui/Button/Button'
import IconButton from '../../../ui/IconButton/IconButton'
import UncorrectFormat from '../../../ui/Modal/UncorrectFormat'
import styles from '../MyProfile.module.scss'
import { navs } from '../navs'

const LeftSide = () => {
	const navigate = useNavigate()
	const { handleClose, handleOpen, isOpen } = useModal()
	const { user } = useSelector((state: RootState) => state.auth)
	const [avatar, setAvatar] = useState<File>()
	const [error, setError] = useState(false)

	const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newAvatar = e.target.files[0]
			if (newAvatar.type.startsWith('image') && newAvatar.type !== 'image/svg+xml') {
				setAvatar(newAvatar)
			}
			else return setError(true)
		}
	}

	return (
		<>
			{error && <UncorrectFormat text='Неверный формат файла для загрузки' onClose={() => setError(false)} />}
			<AvatarLoader
				avatar={avatar}
				handleChangePhoto={handleChangePhoto}
				onClose={handleClose}
				stateValue={isOpen}
			/>
			<div className={styles['profile__left']}>
				<div style={{ position: 'relative' }}>
					<Avatar
						src={user?.profile_photo ? user.profile_photo as string : userDefault}
						style={{
							width: '180px',
							height: '180px',
						}}
					/>
					<IconButton
						onClick={handleOpen}
						icon={cameraIcon}
						style={{
							position: 'absolute',
							bottom: 0,
							right: 0,
						}}
					/>
				</div>
				{
					navs.map((nav, index) => (
						<Button
							key={index}
							onClick={() => navigate(nav.url)}
							variant={nav.variant}
							style={{
								width: '205px',
								fontSize: '14px',
							}}
						>
							{nav.name}
						</Button>
					))
				}
			</div>
		</>
	)
}

export default LeftSide