import React from 'react'
import { useNavigate } from 'react-router-dom'
import masters_avatar from '../../../../../../../../assets/images/createOrder_img/masters_avatar.png'
import settings_svg from '../../../../../../../../assets/images/createOrder_img/settings-02.svg'
import { OPTIONAL_ROUTES } from '../../../../../../../../routes/routes'

const MastersProfileIcon: React.FC = () => {
	const nav = useNavigate()
	return (
		<div onClick={() => nav(OPTIONAL_ROUTES.userMastersProfile)} style={{
			width: 230,
			height: 56,
			borderRadius: 32,
			backgroundColor: '#ffff',
			padding: '8px 16px 8px 16px',
			display: 'flex',
			gap: 12,
			alignItems: 'center',
			whiteSpace: 'nowrap',
			cursor: 'pointer'
		}}>
			<img src={masters_avatar} alt="avatar" />
			<span style={{ fontWeight: 700 }}>Мой профиль</span>
			<img src={settings_svg} alt="settings" />
		</div>
	)
}

export default MastersProfileIcon
