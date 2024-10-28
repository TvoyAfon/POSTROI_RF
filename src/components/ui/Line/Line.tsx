import React from 'react'
import { ILine } from '../../../interface/line.props'

const Line: React.FC<ILine> = ({ lineWidth, style }) => {
	return (
		<hr style={{ width: lineWidth, border: ' 1px solid #8E8E93', opacity: 0.5, ...style }} />
	)
}

export default Line
