import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IAlbum } from '../../../../../../../interface/portfolio.props'
import { portfolioSevice } from '../../../../../../../services/user/userPortfolio.service'
import { RootState } from '../../../../../../../store/store'


const useFetchAlbums = (userId:number) => {

	const [albums, setAlbums] = useState<IAlbum[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { triggerFetch, triggerAlbumClose } = useSelector((state: RootState) => state.triggerFetch)

	const fetchAlbums = async () => {
		if (userId) {
			setLoading(true)
			setError(null) // Сброс ошибки перед новой попыткой
			try {
				const response = await portfolioSevice.getAlbums(userId)
				setAlbums(response)
			} catch (error) {
				setError('Не удалось получить альбомы')
				console.error('Не удалось получить альбомы', error)
			} finally {
				setLoading(false)
			}
		}
	}

	useEffect(() => {
		fetchAlbums()
	}, [userId, triggerFetch, triggerAlbumClose]) // Запрашивать альбомы при изменении пользователя

	return { albums, loading, error }
}

export default useFetchAlbums