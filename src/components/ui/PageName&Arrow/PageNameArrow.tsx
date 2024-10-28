import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrow_img from '../../../assets/images/createOrder_img/arrow-left-02.svg'
import { IPageNameArrow } from '../../../interface/pageArrow.props'

const PageNameArrow: React.FC<IPageNameArrow> = ({ pageName, style, styleName, routeBack }) => {
	const navigate = useNavigate()
	return (
		<div style={{ display: 'flex', gap: 32, ...style }}>
			<img
				style={{ cursor: 'pointer' }}
				onClick={routeBack ? () => navigate(routeBack) : () => navigate(-1)}
				src={arrow_img}
				alt="arrow" />
			<span className='textSizeL' style={{ whiteSpace: 'nowrap', ...styleName }}>{pageName}</span>
		</div>
	)
}

export default PageNameArrow
