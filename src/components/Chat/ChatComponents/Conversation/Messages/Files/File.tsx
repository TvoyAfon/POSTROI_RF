import { CSSProperties, FC, MouseEventHandler } from 'react'
import FileDeleteButton from '../../../../../ui/FileDeleteButton/FileDeleteButton'
import { getFileTypeIcon } from '../../../../utils/utils'
import { IAttachment } from '../types'
import styles from './Files.module.scss'

interface IFile extends IAttachment {
	style?: CSSProperties
	imgStyle?: CSSProperties
	link?: string
	fileIcon?: string
	onDelete?: () => void
	onClick?: MouseEventHandler<HTMLDivElement>
}

const File: FC<IFile> = ({ filename = '', onDelete, link = '', style = {}, imgStyle = {}, onClick }) => {
	return (
		<div title={filename} style={style} className={`${styles['files__item']} ${onDelete && styles['files__item-filled__hover-file']}`}>
			<div onClick={onClick} style={{
				display: 'flex',
				gap: '8px'
			}}>
				<img src={getFileTypeIcon(filename.split('.').pop() || '', link)} alt="" width='40' height='40' style={imgStyle} />
				<span title={filename} style={{
					fontSize: '10px',
					color: '#262626',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis'
				}}>{filename}</span>
			</div>
			{
				onDelete
				&&
				<FileDeleteButton className={styles['files__delete']} />
			}
		</div>
	)
}

export default File