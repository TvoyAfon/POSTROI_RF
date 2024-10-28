import { FC } from 'react'
import messageWhiteIcon from '../../../../../../assets/images/profile/bubble-chat-white.svg'
import messageIcon from '../../../../../../assets/images/profile/message.svg'

interface INumberOfReviews {
	currentTab?: string
}

const NumberOfReviews: FC<INumberOfReviews> = ({ currentTab }) => {
	return (
		<>
			<span style={{
				fontWeight: 700,
				fontSize: '16px',
				marginTop: '4px'
			}}>130</span>
			<div style={{
				display: 'flex',
				gap: '8px',
				marginTop: '4px'
			}}>
				<span style={{
					fontWeight: 300,
					fontSize: '16px',
				}}>4</span>
				<img src={currentTab === 'reviews' ? messageWhiteIcon : messageIcon} alt="" width='20' height='20' />
			</div>
		</>
	)
}

export default NumberOfReviews