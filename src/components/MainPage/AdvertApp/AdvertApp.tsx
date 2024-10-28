import React from 'react'
import styles from '../MainPage.module.scss'

import appStore_img from '../../../assets/images/mainpage_images/AppStore.png'
import ellipse from '../../../assets/images/mainpage_images/Ellipse 87.png'
import googlePlay_img from '../../../assets/images/mainpage_images/GooglePlay.png'
import phone_img from '../../../assets/images/mainpage_images/Phone@1-1904x1001 2.svg'
import ruStore_img from '../../../assets/images/mainpage_images/rustore.png'
import phone2_img from '../../../assets/images/other/Phone2.png'

const AdvertApp: React.FC = () => {
    return (
        <div className={styles.mainPage_advert}>
            <div className={styles.mainPage_advert_container}>
                <span style={{ color: '#fff' }}>Вся стройка<br />в одном приложении</span>
                <div className={styles.mainPage_advert_icons}>
                    <img src={ruStore_img} alt="ruStore" />
                    <img src={googlePlay_img} alt="Google Play" />
                    <img src={appStore_img} alt="App Store" />
                </div>
            </div>
            <img src={phone_img}  className={styles.mainPage_advert_phone}
                alt="phone" />
            <img src={phone2_img}  alt="phone2_img" />
            <img src={ellipse} alt="ellipse" />
        </div>
    )
}

export default AdvertApp
