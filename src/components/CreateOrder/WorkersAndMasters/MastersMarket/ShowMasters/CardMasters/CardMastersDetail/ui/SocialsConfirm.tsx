import React from 'react'
import { socials } from '../../../../../../../../common/socials'

const SocialsConfirm: React.FC = () => {
	return (
		<div className='flex-column gap-smile'>
			<span style={{ fontSize: 14, color: '#ffff', textAlign: 'center' }}>Подтвержденные сервисы</span>
			<div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
				{socials.map((social, index) => (
					<img src={social} key={index} alt={`Social icon ${index + 1}`} />
				))}
			</div>
		</div>
	)
}

export default SocialsConfirm
