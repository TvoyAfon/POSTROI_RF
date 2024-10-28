export interface IAlbum {
	id?: number
	album_id: number
	album_name: string
	count_files: number
	files: {
		name: string,
		link: string
	}[]
	photos?: File[]
	preview_photo: false
	numberOfPhotos?: number
	preview?: string,
	checkMyAlbum?:boolean
}
