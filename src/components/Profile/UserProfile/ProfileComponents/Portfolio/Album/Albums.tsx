import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IAlbum } from '../../../../../../interface/portfolio.props'
import { portfolioSevice } from '../../../../../../services/user/userPortfolio.service'
import { RootState } from '../../../../../../store/store'
import Loader from '../../../../../ui/Loader/Loader'
import Album from './Album'
import styles from './Album.module.scss'

interface AlbumsProps {
	children?: React.ReactNode,
	albums?: IAlbum[]
	loading?: boolean,
	isMyAlbums?: boolean
}

const Albums: FC<AlbumsProps> = ({ children }) => {

	const { userId } = useParams() /* Айди юзера */
	const { user } = useSelector((state: RootState) => state.auth)
	const { triggerFetch, triggerAlbumClose } = useSelector((state: RootState) => state.triggerFetch)

	const isIdExist = () => {
		if (userId) {
			return Number(userId)
		} else if (user?.id) {
			return user.id
		}
		return -1
	}

	const checkIsMyAlbum = () => {
		if (userId) {
			return false
		} else if (user?.id) {
			return true
		}
	}
	const { data, isLoading, isError } = useQuery({
		queryKey: ['albums', user?.id, triggerFetch, triggerAlbumClose],
		queryFn: () => portfolioSevice.getAlbums(isIdExist()),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})
	const albums: IAlbum[] = data

	if (!user?.id || isError) {
		return <div>Не удалось загрузить альбомы</div>
	}

	useEffect(() => {
		if (!albums) return
		localStorage.setItem('count_albums', String(albums.length))
	}, [])

	return (
		<>
			<div className={styles.albums}>
				<div style={{
					display: 'flex',
					gap: '8px',
					alignItems: 'center'
				}}>
					<b className='textSizeL'>Альбомы</b>
					<b className='textSizeL' style={{
						color: '#8E8E93',
					}}>{albums ? albums.length : 0}</b>
				</div>
				<div className={styles['albums__container']}>
					{
						!isLoading ? albums && albums.map(album => (
							<Album
								checkMyAlbum={checkIsMyAlbum()}
								key={album.album_id}
								{...album}
							/>
						)) : <Loader style={{ fontSize: 16, margin: 20 }} text='Загрузка альбомов...' />
					}
				</div>
				{children}
			</div>
		</>
	)
}

export default Albums