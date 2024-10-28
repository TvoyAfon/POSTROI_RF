import React from 'react'
import { ISearchOrderOverlay } from '../../../interface/searchOrderOverlay.props'

const CardOrderOverlay: React.FC<ISearchOrderOverlay> = ({ children, openMap }) => {
	return (
		<>

			<div style={!openMap ?
				{ padding: 32, overflow: 'hidden', height: 245, borderRadius: 12, backgroundColor: '#F4F3F1', boxSizing: 'content-box', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 10px 14px 0px, rgba(0, 0, 0, 0.05) 0px 2px 2px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px', border: '1px solid rgba(0,0,0,0.05)' } :
				{
					padding: 10, width: 240, height: 335, borderRadius: 8, backgroundColor: '#F4F3F1', display: 'flex', justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 10px 14px 0px, rgba(0, 0, 0, 0.05) 0px 2px 2px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px',
					border: '1px solid rgba(0,0,0,0.05)'
				}}>
				{children}
			</div>
		</>
	)
}

export default CardOrderOverlay
