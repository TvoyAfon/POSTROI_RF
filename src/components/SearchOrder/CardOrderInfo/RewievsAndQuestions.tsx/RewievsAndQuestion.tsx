import React from 'react'
import quest_svg from '../../../../assets/images/other/bubble-chat-question_blue.svg'
import chat_svg from '../../../../assets/images/other/bubble-chat_blue.svg'

const RewievsAndQuestion: React.FC<{ onlyRewievs?: boolean }> = ({ onlyRewievs = false }) => {
	return (
		<div style={{ display: 'flex', gap: 24, alignItems: 'center', paddingRight: '24px', paddingBottom: '24px', marginLeft: 'auto' }}>
			<div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
				<img src={chat_svg} alt="chat" />
				<span style={{ fontWeight: 800 }}>0</span>
			</div>
			{!onlyRewievs && <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
				<img src={quest_svg} alt="quest" />
				<span style={{ fontWeight: 800 }}>0</span>
			</div>}
		</div>
	)
}

export default RewievsAndQuestion
