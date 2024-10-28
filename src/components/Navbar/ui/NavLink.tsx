import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

export interface INavLink extends LinkProps {
	isSelected?: boolean
	selectionColor?: string,
}

const NavLink: FC<INavLink> = ({ style, to, selectionColor, children, isSelected = false, ...props }) => {

	return (
		<div style={{ position: 'relative' }}>
			<Link style={{
				color: '#262626',
				textDecoration: 'none',
				fontSize: 14,
				fontWeight: 500,
				...style
			}} to={to} {...props}>
				{children}
			</Link>
			{isSelected ?
				<hr style={{ width: '100%', position: 'absolute', bottom: '0px', border: selectionColor }} /> :
				<hr style={{ width: '100%', position: 'absolute', bottom: '0px', border: '1px solid #7099ED' }} />
			}
		</div>

	)
}

export default NavLink