import { CSSProperties, useRef } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { userService } from '../../../services/user/user.service'
import Loader from '../../ui/Loader/Loader'
import AboutUser from './ProfileComponents/AboutUser'
import Header from './ProfileComponents/Header'
import Portfolio from './ProfileComponents/Portfolio/Portfolio'
import Reviews from './ProfileComponents/Reviews/Reviews'
import ServicesAndPrices from './ProfileComponents/ServicesAndPrices/ServicesAndPrices'
import ProfileNavigation from './ProfileNavigation/ProfileNavigation'
import styles from './UserProfile.module.scss'

const blockStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '16px'
}

const UserProfile = () => {

	const about = useRef<HTMLDivElement>(null)
	const services = useRef<HTMLDivElement>(null)
	const reviews = useRef<HTMLDivElement>(null)
	const portfolio = useRef<HTMLDivElement>(null)
	const { userId } = useParams()


	const { data, isError, isLoading } = useQuery({
		queryKey: ['getUserById', Number(userId)],
		queryFn: () => userService.getProfile(Number(userId)),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})

	const userData = data

	const headerInfo = {
		avatar: userData?.profile_photo as string,
		lastName: userData?.last_name,
		firstName: userData?.first_name,
		patronymic: userData?.patronymic,
		city: userData?.city?.name,
		phone: userData?.phone,
		email: userData?.email,
		passportCheck: userData?.passport!
	}

	const aboutUserInfo = {
		about: userData?.about_yourself,
		educational: {
			name: userData?.educational?.univercity,
			specialization: userData?.educational?.specialization,
			dateStart: userData?.educational?.education_start,
			dateEnd: userData?.educational?.education_end
		},
		experience: userData?.experience,
		categoryUser: userData?.category_person
	}

	return (
		<div className={styles.profile}>
			<div className={styles['profile__container']}>
				<ProfileNavigation />
				{!isLoading ? <div className={styles['profile__info']}>
					<Header
						{...headerInfo}
					/>
					<div ref={about} style={blockStyle}>
						<AboutUser {...aboutUserInfo} />
					</div>
					<div ref={services} style={blockStyle}>
						<ServicesAndPrices />
					</div>
					<div ref={portfolio} style={blockStyle}>
						<Portfolio isMyAlbums={false} />
					</div>
					<div ref={reviews} style={blockStyle}>
						<Reviews />
					</div>
				</div> : !isError ?
					<Loader
						text='Загрузка профиля'
						style={{ position: 'absolute', top: '100%', left: '50%' }} /> : <span style={{ position: 'absolute', top: '100%', left: '50%' }}>Не удалось загрузить данные профиля.</span>}
			</div>
		</div>
	)
}

export default UserProfile