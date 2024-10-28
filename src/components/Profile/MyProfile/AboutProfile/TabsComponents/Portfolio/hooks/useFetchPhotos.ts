import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { portfolioSevice } from '../../../../../../../services/user/userPortfolio.service'
import { RootState } from '../../../../../../../store/store'

export interface IFiles {
	count_files: number
	files: string[] // Предполагается, что файлы представляют собой массив строк (URL-адресов изображений)
}

const useFetchPhotos = (userId:number) => {
	const [loadingPh, setLoadingPh] = useState<boolean>(false)
	const [files, setFiles] = useState<IFiles>({ count_files: 0, files: [] })
	const { user } = useSelector((state: RootState) => state.auth)
	const { triggerFetchForAlbum } = useSelector((state: RootState) => state.triggerFetch)
	useEffect(() => {
		const getAllPhotos = async () => {
			if (!userId) return

			setLoadingPh(true)
			try {
				const response = await portfolioSevice.getPhotos(userId)
				setFiles(response)
			} catch (error) {
				console.log('Не удалось получить все фото', error)
			} finally {
				setLoadingPh(false)
			}
		}

		getAllPhotos()
	}, [user?.id, triggerFetchForAlbum]) // Зависимость от userId

	return { loadingPh, files }
}

export default useFetchPhotos