
import { CSSProperties, ReactNode, forwardRef } from 'react'
import useStopScrolling from '../../../hooks/useStopScrolling'
import styles from './Modal.module.scss'
import OverLay from './OverLay'

interface IBaseModal {
	isOpen: boolean
	onClose?: () => void
	children: ReactNode
	style?: CSSProperties
	noOverlay?: boolean
	overlayStyle?: CSSProperties
}

const BaseModal = forwardRef<HTMLDivElement, IBaseModal>(({ isOpen, children, style = {}, noOverlay = false, overlayStyle = {} }, ref) => {
	useStopScrolling(isOpen)

	return (
		<>
			{isOpen && (
				<OverLay style={overlayStyle} isActive={!noOverlay}>
					<div className={styles['modal__container']}>
						<div ref={ref} className={`${styles.modal} ${styles['modal__content']}`} style={style}>
							{children}
						</div>
					</div>
				</OverLay>
			)}
		</>
	)
})

BaseModal.displayName = 'BaseModal' // Set a display name for debugging

export default BaseModal