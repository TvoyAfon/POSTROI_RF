import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { projectService } from '../../../../services/project/project.service'
import { RootState } from '../../../../store/store'
import { IProjectCard } from '../types/projectTypes'

export const useGetProjects = (is_finished?: boolean) => {
	const [loading, setLoading] = useState(false)
	const [projects, setProjects] = useState<IProjectCard[]>([])
	const [error, setError] = useState(false)


	const { triggerCreateProject, triggerDeleteProject } = useSelector((state: RootState) => state.triggerFetch)

	useEffect(() => {
		const getProjects = async () => {
			try {
				setError(false)
				setLoading(true)

				const response: IProjectCard[] = await projectService.getProjects(is_finished)

				setProjects(response)

			} catch (error) {
				setError(true)
				setLoading(false)
			}
			finally {
				setLoading(false)
			}
		}
		getProjects()
	}, [triggerCreateProject, triggerDeleteProject])

	return { projects, loading, error }
}