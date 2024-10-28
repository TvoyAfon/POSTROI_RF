import { MouseEvent, useId, useState } from 'react'

export const usePopup = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const isOpen = Boolean(anchorEl)
	const triggerClassName = useId()

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
		if (isOpen) return handleClose()

		if (e.target instanceof HTMLElement) {
			setAnchorEl(e.target)
		}
	}

	return {
		triggerClassName, handleToggle, isOpen, anchorEl, setAnchorEl,
		handleClose
	}
}