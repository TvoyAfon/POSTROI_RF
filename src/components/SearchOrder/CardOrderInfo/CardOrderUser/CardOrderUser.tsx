
import React, { CSSProperties } from 'react'
import pattern from '../../../../assets/images/other/patterns 4.svg'

export interface ICardOrderUser {
	userName?: string
	userAvatar?: string | null
	lastVisit?: string
	style?: CSSProperties
	isExecutor?: boolean
	onClick?: () => void
}

const CardOrderUser: React.FC<ICardOrderUser> = ({
	userAvatar,
	userName,
	lastVisit,
	style = {},
	isExecutor = false,
	onClick
}) => {
	return (
		<div onClick={onClick} style={{
			display: 'flex',
			gap: 16,
			position: 'relative',
			cursor: onClick ? 'pointer' : undefined,
			...style
		}}>
			<img
				style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%', marginTop: '2px' }}
				src={userAvatar || pattern}
				alt="img_profile"
			/>
			<div style={{ display: 'flex', gap: 10, marginTop: '2px' }}>
				<div className='flex-column' style={{ gap: 0 }}>
					{
						isExecutor
						&&
						<span style={{
							color: '#7099ED'
						}}>Исполнитель</span>
					}
					<span style={{ fontSize: 16, fontWeight: 800, whiteSpace: 'nowrap' }}>
						{userName}
					</span>
					{
						!isExecutor
						&&
						<span style={{ color: '#8E8E93', whiteSpace: 'nowrap' }}>
							{lastVisit}
						</span>
					}
				</div>
			</div>

		</div>
	)
}

export default CardOrderUser