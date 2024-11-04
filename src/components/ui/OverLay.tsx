import React from 'react'
import { useDispatch } from 'react-redux'
import { addOpenModalClickFlag } from '../../store/slices/closeModalClick/closeModalClickSlice'
import { setColorNav } from '../../store/slices/SetNavColorSlice'
import styles from './Overlay.module.scss'

const OverLay: React.FC = () => {
  const dispatch = useDispatch()

  const handleModalClose = () => {
    dispatch(addOpenModalClickFlag(false))
    dispatch(setColorNav(''))
  }
  return (

    <div className={styles.overlay}
      onClick={handleModalClose}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        opacity: '0.5',
        zIndex: 10,
        backgroundColor: 'black',
      }}>
    </div>
  )
}

export default OverLay
