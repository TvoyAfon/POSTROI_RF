import { FC } from 'react'
import AboutProfile from './AboutProfile/AboutProfile'
import styles from './MyProfile.module.scss'
import LeftSide from './Sides/LeftSide'
import MiddleSide from './Sides/MiddleSide'
import RightSide from './Sides/RightSide'

const MyProfile: FC = () => {
	return (
		<div className={styles['profile__container']}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '32px'
			}}>
				<div className={styles.profile}>
					<LeftSide />
					<MiddleSide />
					<RightSide />
				</div>
				<div className={styles['aboutProfile']} style={{ width: 1200 }}>
					<AboutProfile />
				</div>
			</div>

		</div>

	)
}

export default MyProfile