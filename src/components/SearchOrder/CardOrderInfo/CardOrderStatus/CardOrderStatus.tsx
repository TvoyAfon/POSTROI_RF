import React from 'react'
import done_svg from '../../../../assets/images/searchOrder_images/checkmark-circle-02.svg'
const CardOrderStatus: React.FC = () => {
	return (
		<div style={{ display: 'flex', gap: 10 }}>
			<img src={done_svg} alt="" />
			<span className='textSizeL' style={{ color: '#7099ED' }}>Выполнен</span>
		</div>
	)
}

export default CardOrderStatus

