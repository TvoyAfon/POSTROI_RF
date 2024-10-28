import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLSpanElement>

const ErrorSignature: React.FC<Props> = ({ children, style = {}, ...props }) => {
	return (
		<span style={{
			fontSize: '14px', color: 'red', position: 'relative', bottom: '20px',
			...style
		}} {...props}>{children}</span>
	)
}

export default ErrorSignature