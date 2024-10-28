import { CSSProperties, FC, useState } from 'react'
import cancelIcon from '../../../../../assets/images/createOrder_img/close_filesUploader.svg'
import IconButton from '../../../../ui/IconButton/IconButton'

export interface IPhotoCard {
	src: string
	onDelete?: () => void
	style?: CSSProperties
}

const PhotoCard: FC<IPhotoCard> = ({
	src,
	onDelete,
	style = {}
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)

	return (
		<div
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				width: '160px',
				height: '112px',
				borderRadius: '16px',
				transition: 'all 300ms ease-in-out',
				position: 'relative',
				transform: isHovered ? 'scale(1.25)' : undefined,
				...style
			}}
		>
			<img
				src={src}
				alt=""
				style={{ width: '160px', height: '112px', borderRadius: '16px' }}
			/>
			{
				isHovered
				&&
				<IconButton onClick={onDelete} icon={cancelIcon} style={{
					position: 'absolute',
					left: '0px',
					bottom: '0px'
				}} />
			}

		</div>
	)
}

export default PhotoCard