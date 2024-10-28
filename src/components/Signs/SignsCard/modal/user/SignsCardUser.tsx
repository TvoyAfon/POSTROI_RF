import React from 'react'
import user_img from '../../../../../assets/images/signs/cardNumber_user.svg'

const SignsCardUser: React.FC = () => {
	return (
		<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
			<div style={{ borderRadius: '50%', width: 46, height: 46 }}>
				<img src={user_img} alt="user" />
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
				<span style={{ fontSize: 16, fontWeight: 800 }}>Владимир</span>
				<span style={{ fontSize: 10, fontWeight: 300 }}>в сети 1 час назад</span>
			</div>
		</div>
	)
}

export default SignsCardUser
