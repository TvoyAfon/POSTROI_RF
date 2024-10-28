import { useDispatch } from 'react-redux'
import { projectService } from '../../../../../services/project/project.service'
import { setTriggerRanameFolder } from '../../../../../store/slices/other/triggerFetch'

export const useRenameFolder = (folder_id: number, project_id: number, name: string) => {
	const dispatch = useDispatch()

	const renameFolder = async () => {
		try {
			await projectService.renameFolder(folder_id, project_id, name)
			dispatch(setTriggerRanameFolder())
		} catch (error) {
			alert('Не удалось изменить название папки')
			console.log(error)
		}
	}
	return { renameFolder }
}