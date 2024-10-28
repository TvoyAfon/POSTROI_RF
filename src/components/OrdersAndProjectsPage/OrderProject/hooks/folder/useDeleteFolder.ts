import { useDispatch } from 'react-redux'
import { projectService } from '../../../../../services/project/project.service'
import { setTriggerDeleteFolder } from '../../../../../store/slices/other/triggerFetch'


export const useDeleteFolder = (folder_id: number, project_id: number) => {
	const dispatch = useDispatch()

	const deleteFolder = async () => {
		try {
			await projectService.deleteFolder(folder_id, project_id)
			dispatch(setTriggerDeleteFolder())
		} catch (error) {
			alert('Не удалось удалить папку')
		}
	}

	return { deleteFolder }
}