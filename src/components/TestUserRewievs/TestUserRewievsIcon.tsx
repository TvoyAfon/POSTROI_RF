import React from 'react'
import testRew_svg from '../../assets/images/other/testRew_icon.svg'
import { useModal } from '../../hooks/useModal'
import styles from './TestRewievs.module.scss'
import TestUserRewievsModal from './TestUserRewievsModal'
const TestUserRewievsIcon: React.FC = () => {

	const { handleClose, handleOpen, isOpen } = useModal()
	return (
		<>
			{isOpen && <TestUserRewievsModal onClose={handleClose} />}
			<div className={styles['testUserRewievsIcon']}>
				<span>Сообщить об ошибках</span>
				<img onClick={handleOpen} src={testRew_svg} alt="testRew" />
			</div>
		</>
	)
}

export default TestUserRewievsIcon
