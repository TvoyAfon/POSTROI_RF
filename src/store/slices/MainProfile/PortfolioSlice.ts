import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAlbum } from '../../../interface/portfolio.props'

interface IState {
	albums: IAlbum[]
	countOfAlbums: number
	countOfPhoto: number
	allPhoto: File[],

	coverPhoto: string
}

const initialState: IState = {
	albums: [],
	countOfAlbums: 0,
	countOfPhoto: 0,
	allPhoto: [],
	coverPhoto: ''
}

export const portfolioSlice = createSlice({
	name: 'userPortfolio',
	initialState,
	reducers: {
		addNewAlbum(state, action: PayloadAction<IAlbum>) {
			state.albums.push(action.payload) // Add new album
			state.countOfAlbums = state.albums.length // Update album count
		},
		addNewPhotoToAlbum(state, action: PayloadAction<{ albumId: string; photo: File }>) {
			const { albumId, photo } = action.payload

			const album = state.albums.find(alb => String(alb.album_id) === albumId)

			if (album) {
				if (!album.photos) {
					album.photos = [] // Initialize if not already an array
				}
				album.photos?.push(photo)
				album.numberOfPhotos = album.photos?.length
				state.allPhoto.push(photo)
				state.countOfPhoto = state.allPhoto.length
			}
		},
		editAlbumName(state, action: PayloadAction<{ albumId: string, name: string }>) {
			const { albumId, name } = action.payload
			const albumIndex = state.albums.findIndex(alb => String(alb.album_id) === albumId)

			if (albumIndex !== -1) {
				const updatedAlbum = { ...state.albums[albumIndex], name }
				state.albums[albumIndex] = updatedAlbum
			}
		},
		deleteAlbum(state, action: PayloadAction<{ albumId: string }>) {
			const { albumId } = action.payload
			const albumToDelete = state.albums.find((alb) => String(alb.album_id) === albumId)

			if (albumToDelete) {
				// Удалить фотографии альбома из allPhoto
				state.allPhoto = state.allPhoto.filter(photo => {
					// Чекаем, что фото не принадлежит альбому по сравнению имени
					return !albumToDelete.photos?.some(albumPhoto => albumPhoto.name === photo.name)
				})

				// Обновляем количество фотографий
				state.countOfPhoto = state.allPhoto.length
			}

			// Now filter the albums array to remove the album
			state.albums = state.albums.filter((alb) => String(alb.album_id) !== albumId)
			state.countOfAlbums = state.albums.length
		},
		deleteCurrentPhotoAlbum(
			state,
			action: PayloadAction<{ albumId: string; photo: File }>
		) {
			const { albumId, photo } = action.payload
			const album = state.albums.find((alb) => String(alb.album_id) === albumId)

			if (album && album.photos) {
				// Remove the photo from the album's photos array
				album.photos = album.photos.filter((p) => p !== photo)
				// Also remove from allPhoto and update the counts
				state.allPhoto = state.allPhoto.filter((p) => p !== photo)
				state.countOfPhoto = state.allPhoto.length
				album.numberOfPhotos = album.photos.length
				if (album.photos.length > 0) {
					album.preview = URL.createObjectURL(album.photos[album.photos.length - 1]) // Устанавливаем превью на последнее фото
				} else {
					album.preview = undefined // Если фотографий больше нет, убираем превью
				}
			}
		},
		editNameCurrentPhoto(state, action: PayloadAction<{ albumId: string, photo: File, name: string }>) {
			const { albumId, photo, name } = action.payload
			const album = state.albums.find((alb) => String(alb.album_id) === albumId)

			if (album && album.photos) {
				const photoIndex = album.photos.findIndex(p => p.name === photo.name)

				if (photoIndex !== -1) {
					// Создаем нового объект File с новым именем
					const updatedPhoto = new File([photo], name, {
						type: photo.type,
						lastModified: photo.lastModified   /* создаем новый файл потому что нельзя менять напрямую */
					})

					// Заменяем старую фотографию на новую
					album.photos[photoIndex] = updatedPhoto
				}
			}
		},
		changePhotoOnCover(state, action: PayloadAction<{ albumId: string; photo: File }>) {
			const { albumId, photo } = action.payload
			const album = state.albums.find((alb) => String(alb.album_id) === albumId)

			if (album) {

				const photoExists = album.photos?.some(p => p.name === photo.name)
				// Установим превью, только если фото есть в массиве альбома
				if (photoExists) {
					album.preview = URL.createObjectURL(photo)
					state.coverPhoto = photo.name
				}

			}
		}
	}
})

export const { addNewAlbum, addNewPhotoToAlbum, editAlbumName, deleteAlbum, deleteCurrentPhotoAlbum, editNameCurrentPhoto, changePhotoOnCover } = portfolioSlice.actions
export default portfolioSlice.reducer