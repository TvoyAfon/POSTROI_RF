import { useState } from 'react'
import { useSelector } from 'react-redux'
import { projectService } from '../../../../services/project/project.service'
import { RootState } from '../../../../store/store'
export const useCreateProject = (name: string, description: string) => {
	const [loading, setLoading] = useState(false)
	const { user } = useSelector((state: RootState) => state.auth)

	const createProject = async () => {
		setLoading(true)
		try {

			if (user?.id) {
				await projectService.createProject({
					description,
					name
				})

			}
		} catch (error: any) {

		} finally {
			setLoading(false)
		}
	}

	return { createProject, loading }
}