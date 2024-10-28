import { useEffect, useState } from 'react'
import { IAlbum } from '../../../../interface/portfolio.props'
import { portfolioSevice } from '../../../../services/user/userPortfolio.service'

export const useGetAlbumsById = (userId: number) => {

	const [albums, setAlbums] = useState<IAlbum[]>()

	useEffect(() => {
		const getAlbums = async () => {
			try {
				const albums: IAlbum[] = await portfolioSevice.getAlbums(userId)
				setAlbums(albums)
			} catch (error) {
				console.log('Ошибка получения альбомов', error)
			}
		}
		getAlbums()
	}, [userId
	])

	return albums
}