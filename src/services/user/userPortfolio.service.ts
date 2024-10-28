import { USER_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'

class PortfolioService {
	prefix = 'portfolio'
	url = new URLConstructor(`${USER_SERVICE_URL}/portfolio`)

	async getAlbums(client_id: number) {
		return await sendAsync('get', this.url.constructURL('albums', { client_id }), {}, { useAuthorization: true })
	}

	async getAlbum(client_id: number, album_id: number) {
		return await sendAsync('get', this.url.constructURL('album', { client_id, album_id }), {}, { useAuthorization: true })
	}

	async getPhoto(client_id: number) {
		return await sendAsync('get', this.url.constructURL('album', { client_id }), {})
	}

	async createAlbum(client_id: number, album_name: string) {
		return await sendAsync('post', this.url.constructURL('album', { client_id, album_name }), {}, { useAuthorization: true })
	}

	async deleteAlbum(client_id: number, album_id: number) {
		return await sendAsync('delete', this.url.constructURL('album', { client_id, album_id }), {}, { useAuthorization: true })
	}

	async changeAlbumName(client_id: number, album_id: number, name: string) {
		return await sendAsync('patch', this.url.constructURL('album', { client_id, album_id, name }), {}, { useAuthorization: true })
	}

	async getPhotos(client_id: number) {
		return await sendAsync('get', this.url.constructURL('photos', { client_id }), {}, { useAuthorization: true })
	}

	async addPhoto(client_id: number, album_id: number, photo: FormData) {
		return await sendAsync('post', this.url.constructURL('photo', { client_id, album_id }), photo, { useAuthorization: true })
	}

	async deletePhoto(client_id: number, album_id: number, photo_link: string) {
		return await sendAsync('delete', this.url.constructURL('photo', { client_id, album_id, photo_link }), {}, { useAuthorization: true })
	}

	async renamePhoto(client_id: number, album_id: number, photo_link: string, name: string) {
		return await sendAsync('patch', this.url.constructURL('photo', { client_id, album_id, photo_link, name }), {}, { useAuthorization: true })
	}
}

export const portfolioSevice = new PortfolioService()