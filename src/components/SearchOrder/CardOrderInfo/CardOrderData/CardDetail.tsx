import { FC, PropsWithChildren } from 'react'

const CardDetail: FC<PropsWithChildren> = ({ children }) => {
	return (
		<span style={{
			fontWeight: '800',
			fontSize: '16px',
			color: '#231F20'
		}}>
			{children}
		</span>
	)
}

export default CardDetail