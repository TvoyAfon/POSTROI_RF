import { useState } from 'react'
import { IUpdateProject } from '../../../../services/project/common/projectTypes'
import { projectService } from '../../../../services/project/project.service'

export const useUpdateProject = (project_id: number, schema: IUpdateProject) => {
	const [error, setError] = useState(false)
	const updateProject = async () => {
		try {
			setError(false)
			await projectService.updateProject(project_id, schema)
		} catch (error) {
			setError(true)
			return alert('Не удалось изменить имя')
		}
	}
	return { updateProject, error }
}