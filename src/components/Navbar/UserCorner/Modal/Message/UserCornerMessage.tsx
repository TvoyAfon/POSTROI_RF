import React from 'react'
import Line from '../../../../ui/Line/Line'

const UserCornerMessage: React.FC = () => {
	return (
		<section style={{ display: 'flex', flexDirection: 'column', gap: 16, whiteSpace: 'break-spaces', width: 264, height: 143, paddingTop: 10 }}>
			<div style={{ display: 'flex', gap: 50 }}>
				<span style={{ fontSize: 16, fontWeight: 800 }}>Заголовок сообщения</span>
				<span>8:35</span>
			</div>
			<div style={{ wordWrap: 'break-word' }}>уведомление!</div>
			<Line lineWidth='100%' />
		</section>
	)
}

export default UserCornerMessage
