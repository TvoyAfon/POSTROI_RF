import { useDispatch } from 'react-redux'
import { projectService } from '../../../../../services/project/project.service'
import { setTriggerCreateFolder } from '../../../../../store/slices/other/triggerFetch'

export const useCreateFolder = (project_id: number, folder_name: string) => {
	const dispatch = useDispatch()

	const createFolder = async () => {
		try {
			await projectService.createFolder(project_id, folder_name)
			dispatch(setTriggerCreateFolder())
		} catch (error) {
			alert('Не удалось создать папку')
		}
	}
	return { createFolder }
}