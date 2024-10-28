import React, { CSSProperties, PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import { addOpenModalClickFlag } from '../../../store/closeModalClick/closeModalClickSlice'
import { setColorNav } from '../../../store/slices/SetNavColorSlice'
import styles from './Modal.module.scss'

interface IOverlay extends PropsWithChildren {
  style?: CSSProperties,
  isActive?: boolean
}

const OverLay: React.FC<IOverlay> = ({ children,style = {},isActive = true }) => {
  const dispatch = useDispatch()

  const handleModalClose = () => {
    dispatch(addOpenModalClickFlag(false))
    dispatch(setColorNav(''))
  }
  return (
    <div className={styles['overlay2']}
      onClick={handleModalClose}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '10',
        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.5)' : '',
        ...style
      }}>
      {children}
    </div>
  )
}

export default OverLay
