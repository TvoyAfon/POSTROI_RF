export interface IProjectCard {
	project_id: number,
	client_id: number,
	name: string,
	description: string,
	is_finished: boolean,
	preview_image: string | null
}

export interface IProjectCardPopup {
	onClose: () => void,
	project_id: number
	onOpenModalConfirm: () => void,
}

export interface IProjectCardById {
	project_id: number,
	client_id: number,
	name: string,
	description: string,
	is_finished: boolean,
	preview_image: string,
	orders: []
}

export interface IDirectoryPopup {
	deleteFolder: () => Promise<void>,
	folderId: number,
	projectId: number,
	activeModal: string | null,
	isOpen: boolean
}

export interface IFolderPopup {
	stateValue: boolean,
	onClose: () => void,
	projectId: number,
	folderId: number
}

export interface ICreateFolderModal {
	onClose: () => void,
	projectId: number
}

export interface IFolderProject {
	folder_id: number,
	project_id: number,
	folder_name: string
}

export interface IDeleteFolderModal {
	onClose: () => void,
	deleteFolder: () => Promise<void>
}

export interface IFolderProjectDetail {
	onClose?: () => void
	folderId: number,
	projectId: number
	openFolderDetail?: boolean
}

export interface IFolderData {
	folder_id: number,
	project_id: number,
	folder_name: string,
	files: string[]
}

export interface IFolderDetailPopup {
	onClose: () => void,
	folderId: number,
	projectId: number,
}

export interface IRenameFolderModal {
	onClose: () => void,
	folderId: number,
	projectId: number,
}

export interface IFilesInProject {
	file_id: number,
	folder_id: number,
	file_link: string,
	file_name: string
}