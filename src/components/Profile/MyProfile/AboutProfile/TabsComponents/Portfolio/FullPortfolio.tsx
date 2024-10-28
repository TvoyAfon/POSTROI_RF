import React from 'react'
import { useQueries } from 'react-query'
import { useParams } from 'react-router-dom'
import settings from '../../../../../../assets/images/other/settings-dark.svg'
import { portfolioSevice } from '../../../../../../services/user/userPortfolio.service'
import PageNameArrow from '../../../../../ui/PageName&Arrow/PageNameArrow'
import Albums from '../../../../UserProfile/ProfileComponents/Portfolio/Album/Albums'
import AllUserPictures from './AllUserPictures'
import styles from './Potrfolio.module.scss'

const FullPortfolio: React.FC = () => {

	const { userId } = useParams() /* Айди юзера */

	const [{ data: albums, isLoading: loading }, { data: files, isLoading: loadingPh }] = useQueries(
		[{ queryKey: ["posts"], queryFn: () => portfolioSevice.getAlbums(Number(userId)) },
		{ queryKey: ["users"], queryFn: () => portfolioSevice.getPhotos(Number(userId)) }
		])

	return (
		<div style={{ display: 'flex', justifyContent: 'center', paddingTop: 125, paddingBottom: 32 }}>
			<div className={styles['fullPortfolio']}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<PageNameArrow pageName='ПОРТФОЛИО' />
					<img src={settings} alt="st" />
				</div>
				<Albums albums={albums} loading={loading} />
				<AllUserPictures loadingPh={loadingPh} files={files} />
			</div>
		</div>
	)
}

export default FullPortfolio
