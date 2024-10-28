import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IAlbum } from '../../../../../../../interface/portfolio.props'
import { portfolioSevice } from '../../../../../../../services/user/userPortfolio.service'
import { RootState } from '../../../../../../../store/store'


const useFetchAlbum = (album_id: number) => {
	const { user } = useSelector((state: RootState) => state.auth)
	const [album, setAlbum] = useState<IAlbum>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { triggerFetchForAlbum } = useSelector((state: RootState) => state.triggerFetch)


	const fetchAlbum = async () => {
		if (user?.id) {
			setError(null) // Сброс ошибки перед новой попыткой
			try {
				setLoading(true)
				const response = await portfolioSevice.getAlbum(user.id, album_id)
				setAlbum(response)
			} catch (error) {
				setError('Не удалось получить альбом')
				console.error('Не удалось получить альбом', error)
			} finally {
				setLoading(false)
			}
		}
	}

	useEffect(() => {

		fetchAlbum()
	}, [user?.id, triggerFetchForAlbum]) // Запрашивать альбомы при изменении пользователя

	return { album, loading, error }
}

export default useFetchAlbum