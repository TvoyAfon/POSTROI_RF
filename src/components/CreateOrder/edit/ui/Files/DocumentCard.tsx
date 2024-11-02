import { CSSProperties, FC, useEffect, useMemo, useState } from 'react'
import pdfIcon from '../../../../../assets/images/chat_images/files/pdf-format.svg'
import txtIcon from '../../../../../assets/images/chat_images/files/txt-format.svg'
import wordIcon from '../../../../../assets/images/chat_images/files/word-format.svg'
import xlsIcon from '../../../../../assets/images/chat_images/files/xls-format.svg'
import cancelIcon from '../../../../../assets/images/createOrder_img/close_filesUploader.svg'
import genericIcon from '../../../../../assets/images/createOrder_img/generic-file.svg'
import IconButton from '../../../../ui/IconButton/IconButton'

export type DocumentType = 'pdf' | 'word' | 'xls' | 'txt' | 'generic'

export interface IDocumentCardProps {
	filename: string
	fileType: DocumentType
	style?: CSSProperties
	onDelete?: () => void,
	isOnlyRead?: boolean
}

const DocumentCard: FC<IDocumentCardProps> = ({
	filename,
	fileType,
	style = {},
	onDelete,
	isOnlyRead = false
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [height, setHeight] = useState<string>('auto')

	const fileTypeIcon = useMemo(() => {
		return {
			pdf: pdfIcon,
			word: wordIcon,
			xls: xlsIcon,
			txt: txtIcon,
			generic: genericIcon
		}[fileType]
	}, [fileType])

	useEffect(() => {
		if (isHovered) {
			setHeight('89px')
		} else {
			setHeight('56px')
		}
	}, [isHovered])

	return (
		<div
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				width: '160px',
				background: '#F4F3F1',
				borderRadius: '16px',
				display: 'flex',
				gap: '8px',
				padding: '8px',
				transition: 'height 300ms ease-in-out',
				height,
				overflow: 'hidden',
				position: 'relative',
				...style
			}}
		>
			<img
				src={fileTypeIcon}
				style={{
					width: '40px',
					height: '40px'
				}}
				alt="icontype"
			/>
			<span style={{
				color: '#231F20',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				wordBreak: 'break-word'
			}}>
				{filename}
			</span>
			{
				isHovered
				&& !isOnlyRead &&
				<IconButton
					onClick={onDelete}
					style={{
						position: 'absolute',
						bottom: '0px',
						left: '0px'
					}}
					icon={cancelIcon}
				/>
			}

		</div>
	)
}

export default DocumentCard