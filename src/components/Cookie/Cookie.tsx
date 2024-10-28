import React from 'react'
import styles from './Cookie.module.scss'
import cookie_icon from '../../assets/images/mainpage_images/cookie.svg'
import { ICookie } from '../../interface/cookie.props'


const Cookie:React.FC<ICookie> = ({closeCookie}) => {
  return (
    <div className={styles.cookie_container}>
      <div className={styles.cookie_container_content}>
          <img src={cookie_icon} alt="cookie" />
          <div style={{display:'flex',gap:'30px',justifyContent:'center',alignItems:'center'}}>
            <span style={{color:'white',fontSize:14,fontWeight:400,paddingLeft:60}}>Продолжая пользоваться сайтом, Вы соглашаетесь с  <span style={{color:'#4C54CC',cursor:'pointer'}}>условиями использования файлов cookie.</span></span>
            <button onClick={closeCookie}>Соглашаюсь с условиями</button>
          </div>
      </div>
    </div>
  )
}

export default Cookie
