import React, { useState } from 'react'
import userDefault from '../../../../../../assets/images/profile/user-default.svg'
import Avatar from '../../../../../ui/Avatar/Avatar'
import AvatarLoader from '../../../../../ui/AvatarLoader/AvatarLoader'
import Button from '../../../../../ui/Button/Button'

const LeftWorkerSide: React.FC<{ handleOpen?: () => void }> = ({ handleOpen }) => {
	const [isOpenLoader, setIsOpenLoader] = useState(false)


	const handleOpenLoader = () => {
		setIsOpenLoader(true)
	}
	const handleCloseLoader = () => {
		setIsOpenLoader(false)
	}

	return (
		<div className='flex-column gap-medium'>
			<Avatar onClick={handleOpenLoader} src={userDefault} style={{ width: 180, height: 180, cursor: 'pointer' }} />
			<AvatarLoader stateValue={isOpenLoader} onClose={handleCloseLoader} />
			<Button style={{ width: 180, height: 40 }}>Настройки</Button>
			<Button onClick={handleOpen} style={{ width: 180, height: 52 }}>Настройки уведомлений</Button>
		</div>
	)
}

export default LeftWorkerSide
