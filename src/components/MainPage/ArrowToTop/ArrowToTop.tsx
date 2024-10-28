import React from 'react'
import arrow_img from '../../../assets/images/mainpage_images/arrow-left-02.png'
import styles from './ArrowToTop.module.scss'

const ArrowToTop: React.FC = () => {

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <img className={styles.arrowToTop}
      onClick={handleToTop}

      src={arrow_img}
      alt="arrow" />
  )
}

export default ArrowToTop

