import { createSlice } from '@reduxjs/toolkit'

interface IState {
	triggerFetch: boolean
	triggerFetchForAlbum: boolean
	triggerAlbumClose: boolean
	triggerUpdatePhoto: boolean

	triggerCreateFolder: boolean
	triggerDeleteFolder: boolean
	triggerRenameFolder: boolean
	triggerAddFiles: boolean


	triggerDeleteProject: boolean
	triggerCreateProject: boolean
	triggerConfirmNameProject: boolean,

	triggerInitYandex: boolean,

	triggetInitCityCookie: boolean
}

const initialState: IState = {
	triggerFetch: false,
	triggerFetchForAlbum: false,
	triggerAlbumClose: false,
	triggerDeleteProject: false,
	triggerCreateProject: false,
	triggerConfirmNameProject: false,
	triggerUpdatePhoto: false,
	triggerCreateFolder: false,
	triggerDeleteFolder: false,
	triggerRenameFolder: false,
	triggerAddFiles: false,
	triggerInitYandex: false,
	triggetInitCityCookie: false
}

export const triggerFetch = createSlice({
	name: 'triggerFetch',
	initialState,
	reducers: {
		setTriggerFetch(state) {
			state.triggerFetch = !state.triggerFetch
		},
		setTriggerForAlbum(state) {
			state.triggerFetchForAlbum = !state.triggerFetchForAlbum
		},
		setTriggerAlbumClose(state) {
			state.triggerAlbumClose = !state.triggerAlbumClose
		},
		setTriggerDeleteProject(state) {
			state.triggerDeleteProject = !state.triggerDeleteProject
		},
		setTriggerCreateProject(state) {
			state.triggerCreateProject = !state.triggerCreateProject
		},
		setTriggerConfirmNameProject(state) {
			state.triggerConfirmNameProject = !state.triggerConfirmNameProject
		},
		setTriggerUpdatePhoto(state) {
			state.triggerUpdatePhoto = !state.triggerUpdatePhoto
		},
		setTriggerCreateFolder(state) {
			state.triggerCreateFolder = !state.triggerCreateFolder
		},
		setTriggerDeleteFolder(state) {
			state.triggerDeleteFolder = !state.triggerDeleteFolder
		},
		setTriggerRanameFolder(state) {
			state.triggerRenameFolder = !state.triggerRenameFolder
		},
		setTriggerAddFiles(state) {
			state.triggerAddFiles = !state.triggerAddFiles
		},
		setTriggerYandexInit(state) {
			state.triggerInitYandex = !state.triggerInitYandex
		},
		setTriggerCityCookie(state) {
			state.triggetInitCityCookie = !state.triggetInitCityCookie
		}
	}
})

export const { setTriggerFetch, setTriggerForAlbum, setTriggerAlbumClose, setTriggerCreateProject, setTriggerDeleteProject, setTriggerConfirmNameProject, setTriggerUpdatePhoto, setTriggerCreateFolder, setTriggerDeleteFolder, setTriggerRanameFolder, setTriggerAddFiles, setTriggerYandexInit, setTriggerCityCookie } = triggerFetch.actions
export default triggerFetch.reducer