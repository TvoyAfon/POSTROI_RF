import React from 'react'
import styles from '../MainPage.module.scss'
import banner3_img from '../../../assets/images/mainpage_images/banner33.png'
import banner4_img from '../../../assets/images/mainpage_images/banner44.png'
import banner2_img from '../../../assets/images/mainpage_images/banner22.png'

const StageCommun:React.FC = () => {
  return (
              <div className={styles.mainPage_howWork}>
                    <div className={styles.mainPage_howWork_h1}>КАК РАБОТАЕТ <span style={{color:'#FF8B63',fontSize:40,fontWeight:750}}>ПОСТРОЙ.</span><span style={{color:'#749EF2',fontSize:40,fontWeight:750}}>РФ</span></div>
                    <div className={styles.mainPage_howWork_list}>
                      <span>Заказчики</span>
                      <span>Исполнители</span>
                      <span>Стройматериалы</span>
                    </div>
                    <div className={styles.mainPage_howWork_container}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                          <img src={banner2_img} alt="banner_2"/>
                          <h3>Создайте <br/> заявку</h3>
                          <span>Мы зададим все важные<br/>вопросы, чтобы вам было<br/>проще описать задачу.</span>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                          <img src={banner4_img} alt=""/>
                          <h3>Специалисты<br/> напишут сами</h3>
                          <span>Покажем заказ подходящим<br/> профи. Они напишут, если готовы помочь.</span>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                          <img src={banner3_img} alt=""/>
                          <h3>Выберите<br/> подходящего</h3>
                          <span>Обо всех деталях<br/>договаривайтесь со<br/>специалистом и платите<br/> ему напрямую.</span>
                        </div>
                    </div>     
              </div>
  )
}

export default StageCommun
