import { useState } from 'react'
import { projectService } from '../../../../services/project/project.service'

export const useDeleteProject = (project_id: number) => {
	const [error, setError] = useState(false)

	const deleteProject = async () => {
		try {
			setError(false)
			await projectService.deleteProject(project_id)

		} catch (error) {
			setError(true)
			alert('Не удалось удалить проект')
			
		}
	}

	return { deleteProject, error }

}