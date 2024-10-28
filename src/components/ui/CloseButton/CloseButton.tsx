import React, { HTMLAttributes } from 'react'
import styles from './CloseButton.module.scss'


const CloseButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <button
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
      className={`${styles.button} ${className}`} {...props}>
      <span style={{ position: 'absolute', top: '-3px', left: '7px',color:"#262626" }}>&times;</span>
    </button>
  )
}

export default CloseButton
