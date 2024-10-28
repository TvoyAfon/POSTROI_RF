import React from 'react'
import { useQuery } from 'react-query'
import human_banner from '../../../assets/images/other/human_banner.svg'
import { userService } from '../../../services/user/user.service'
import styles from '../MainPage.module.scss'

const Banner: React.FC = () => {

  const { data } = useQuery({
    queryKey: ['count_users'],
    queryFn: () => userService.countUser(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const userCount = data?.count_users || 0

  return (
    <div className={styles.mainPage_banner}>
      <div className={styles.mainPage_banner_content}>
        <span style={{ fontSize: '48px', fontWeight: '500', color: '#7099ED', textTransform: 'uppercase' }}>Вся стройка <br />на одной площадке <br />
        </span>
        <span className={styles['text2']} style={{ fontSize: '24px', color: '#262626', fontWeight: '500', lineHeight: '28px' }}>{userCount} пользователей зарегестрировано.</span>
      </div>
      <img src={human_banner} alt="human_banner" />
    </div>

  )
}

export default Banner
