import React, { useState } from 'react'
import tooltip_svg from '../../../assets/images/createOrder_img/вопрос всплывающая.svg'
import { ITooltip } from '../../../interface/tooltipModal.props'
import TooltipModal from './TooltipModal'

const Tooltip: React.FC<ITooltip> = ({ children, style }) => {

	const [showModal, setShowModal] = useState<boolean>(false)


	return (
		<div
			style={{ position: 'relative', width: 18, height: 18, ...style }}
			onMouseLeave={() => setShowModal(false)}
			onMouseMove={() => setShowModal(true)}>
			<img
				style={{ cursor: 'pointer', width: 16, height: 18 }}
				src={tooltip_svg}
				alt="tooltip" />
			{showModal && <TooltipModal>{children}</TooltipModal>}
		</div>
	)
}

export default Tooltip
