import React, { useState } from 'react'
import { IShowContacts } from '../../../../../../../../interface/buttonDefault.props'
import Button from '../../../../../../../ui/Button/Button'
import styles from '../../CardMasters.module.scss'

const ShowContacts: React.FC<IShowContacts> = ({ email = 'fjdfjfj@mail.ru', telephone = '+7 (123)-458-58-28' }) => {
	const [isShowContacts, setIsShowContacts] = useState(false)

	return (
		<div className='flex-column gap-medium'>
			<Button onClick={() => setIsShowContacts(!isShowContacts)}>Показать контакты</Button>
			{
				isShowContacts && <div className={styles.contacts} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					<span style={{ fontWeight: 600, color: '#ffff' }}>{telephone}</span>
					<span style={{ fontWeight: 600, color: '#ffff' }}>{email}</span>
				</div>
			}
		</div>
	)
}

export default ShowContacts
