import React from 'react'

const WorkersTextPopup: React.FC<{ text: string }> = ({ text }) => {
	return (
		<div style={{
			padding: 32,
			backgroundColor: 'white',
			borderRadius: 32
			, width: 750,
			position: 'absolute',
			right: 100,
			boxShadow: 'rgba(0, 0, 0, 0.08) 0px 10px 14px 0px, rgba(0, 0, 0, 0.05) 0px 2px 2px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px'
		}}>
			{text}
		</div>
	)
}

export default WorkersTextPopup
