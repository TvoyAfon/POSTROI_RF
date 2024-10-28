import React, { CSSProperties } from 'react'
import delete_img from '../../../assets/images/createOrder_img/close_filesUploader.svg'

interface IFileDeleteButton {
	handleDelete?: () => void
	className?: string,
	style?: CSSProperties
}

const FileDeleteButton: React.FC<IFileDeleteButton> = ({ handleDelete, className, style }) => {
	return (
		<img
			className={className}
			onClick={handleDelete}
			style={{ cursor: 'pointer', width: 25, height: 25, zIndex: 2, ...style }}
			src={delete_img}
			alt="delete" />
	)
}

export default FileDeleteButton
