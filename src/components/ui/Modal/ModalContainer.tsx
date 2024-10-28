import React, { CSSProperties } from 'react'
import OverLay from '../OverLay'
import styles from './Modal.module.scss'

const ModalContainer: React.FC<{
	children: React.ReactNode,
	style?: CSSProperties,
	zIndex?: number,
	isOnOverlay?: boolean,
	className?: string
}> = ({ children, style, zIndex, isOnOverlay = false, className = 'animateModalContainer' }) => {

	return (<>
		{isOnOverlay && <OverLay />}
		<div className={styles[`${className}`]} style={{
			backgroundColor: 'white',
			padding: 32,
			borderRadius: 32,
			zIndex: zIndex,
			position: 'absolute',
			border: '1px solid rgba(0,0,0,0.15)',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%,-50%)',
			...style
		}}>
			{children}
		</div>
	</>

	)
}

export default ModalContainer
