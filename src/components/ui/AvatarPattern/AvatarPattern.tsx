import React from 'react'
import pattern from '../../../assets/images/other/patterns 4.svg'

const AvatarPattern: React.FC = () => {
	return (
		<div style={{ position: 'relative' }}>
			<img style={{ width: 150, height: 150, borderRadius: '50%' }} src={pattern} alt="avatar" />
			<span className='textSizeL' style={{ position: 'absolute', left: 30, color: '#fff', bottom: 70 }}>Без фото</span>
		</div>
	)
}

export default AvatarPattern
