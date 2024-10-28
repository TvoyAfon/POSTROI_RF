import { PROJECT_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'
import { ICreateProject, IUpdateProject } from './common/projectTypes'

class ProjectService {
	url = new URLConstructor(`${PROJECT_SERVICE_URL}/projects`)

	async createProject(schema: ICreateProject) {
		return await sendAsync('post', this.url.constructURL(''), schema, { useAuthorization: true })
	}

	async getProjects(is_finished?: boolean) {
		const params = is_finished !== undefined
			? { is_finished: is_finished }
			: {}

		return await sendAsync('get', this.url.constructURL('', params), {}, { useAuthorization: true })
	}

	async getProjectById(project_id: number) {
		return await sendAsync('get', this.url.constructURL(String(project_id)), {}, { useAuthorization: true })
	}

	async deleteProject(project_id: number) {
		return await sendAsync('delete', this.url.constructURL(String(project_id)), {}, { useAuthorization: true })
	}

	async updateProject(project_id: number, schema: IUpdateProject) {
		return await sendAsync('patch', this.url.constructURL(String(project_id)), schema, { useAuthorization: true })
	}

	async updatePhoto(project_id: number, preview_img: FormData) {
		return await sendAsync('post', this.url.constructURL(`${project_id}/preview`), preview_img, { useAuthorization: true })
	}

	async deletePhoto(project_id: number) {
		return await sendAsync('delete', this.url.constructURL(`${project_id}/preview`), {}, { useAuthorization: true })
	}

	async createFolder(project_id: number, folder_name: string) {
		return await sendAsync('post', this.url.constructURL(`${project_id}/folders`), { project_id, folder_name }, { useAuthorization: true })
	}

	async getFolders(project_id: number) {
		return await sendAsync('get', this.url.constructURL(`${project_id}/folders`), {}, { useAuthorization: true })
	}

	async getFolderById(folder_id: number, project_id: number) {
		return await sendAsync('get', this.url.constructURL(`${project_id}/folders/${folder_id}`), {}, { useAuthorization: true })
	}

	async renameFolder(folder_id: number, project_id: number, folder_name: string) {
		return await sendAsync('patch', this.url.constructURL(`${project_id}/folders/${folder_id}`), { folder_name }, { useAuthorization: true })
	}

	async deleteFolder(folder_id: number, project_id: number) {
		return await sendAsync('delete', this.url.constructURL(`${project_id}/folders/${folder_id}`), {}, { useAuthorization: true })
	}

	async addFile(folder_id: number, project_id: number, file_data: FormData) {
		return await sendAsync('post', this.url.constructURL(`${project_id}/folders/${folder_id}/file`), file_data, { useAuthorization: true })
	}

	async getFiles(folder_id: number, project_id: number) {
		return await sendAsync('get', this.url.constructURL(`${project_id}/folders/${folder_id}/file`), {}, { useAuthorization: true })
	}
}

export const projectService = new ProjectService()