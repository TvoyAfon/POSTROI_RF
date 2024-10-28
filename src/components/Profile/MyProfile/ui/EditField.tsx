import { CSSProperties, FC, ReactNode } from 'react'
import editIcon from '../../../../assets/images/profile/edit.svg'
import IconButton from '../../../ui/IconButton/IconButton'

interface IEditField {
	name: ReactNode
	onEdit?: () => void
	textStyle?: CSSProperties
	buttonText?: string,
	img?: string,
	flexDirection?: boolean,
	textField?: string,
	styleIcon?: CSSProperties,
	styleTextField?: CSSProperties,
	styleMain?:CSSProperties
}

const EditField: FC<IEditField> = ({ textField, styleIcon, name, onEdit, textStyle = {}, buttonText, flexDirection = false, styleTextField, img,styleMain }) => {
	return (
		<div style={{
			display: 'flex',
			gap: !flexDirection ? '8px' : '4px',
			flexDirection: flexDirection ? 'column' : 'row',
			position: 'relative',
			...styleMain

		}}>
			<span style={textStyle}>{name}</span>
			<span style={styleTextField} >{textField}</span>
			<img src={img} />
			{
				!buttonText
					? <IconButton style={styleIcon} icon={editIcon} onClick={onEdit} />
					: <span onClick={onEdit} style={{
						color: '#7099ED',
						fontSize: '14px',
						marginTop: '2px',
						cursor: 'pointer'
					}}>{buttonText}</span>
			}

		</div>
	)
}

export default EditField