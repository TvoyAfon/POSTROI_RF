import React from 'react'
import { ITooltip } from '../../../interface/tooltipModal.props'
import styles  from './Tooltip.module.scss'
const TooltipModal:React.FC<ITooltip> = ({children}) => {
	return (
		<div 
		className={styles.tooltipModal} 
		style={{height:32,backgroundColor:'black',padding:8,borderRadius:10,fontSize:14,fontWeight:300,color:'white',whiteSpace:'nowrap',zIndex:10}}>
			{children}
		</div>
	)
}

export default TooltipModal
