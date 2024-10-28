import { CSSProperties, FC, ReactNode, useRef } from 'react'
import { useOutsideClick } from '../../../hooks/useOutside'
import styles from './PopupMenu.module.scss'

interface IPopupMenu {
	anchorEl: HTMLElement | null
	children: ReactNode
	isOpen: boolean
	style?: CSSProperties
	onClose?: () => void
	triggerClassName: string
	left?: number
	useOutsideClose?: boolean
}

const PopupMenu: FC<IPopupMenu> = ({ anchorEl, children, isOpen, style = {}, onClose, left = 220 }) => {
	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, onClose!)

	return (
		<>
			{
				isOpen && anchorEl
				&&
				<div
					ref={ref}
					className={styles.menu}
					style={{
						top: anchorEl.offsetTop + 50,
						left: anchorEl.offsetLeft - left,
						...style
					}}>
					{children}
				</div>
			}
		</>
	)
}

export default PopupMenu