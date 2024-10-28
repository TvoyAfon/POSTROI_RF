import { FC, HTMLAttributes } from 'react'
import userDefaultIcon from '../../../assets/images/profile/user-default.svg'

interface IAvatar extends HTMLAttributes<HTMLImageElement> {
	src?: string
}

const Avatar: FC<IAvatar> = ({ style = {}, src, ...props }) => {
	return (
		<img src={src || userDefaultIcon} style={{
			width: '32px',
			height: '32px',
			borderRadius: '50%',
			...style
		}} {...props} />
	)
}

export default Avatar