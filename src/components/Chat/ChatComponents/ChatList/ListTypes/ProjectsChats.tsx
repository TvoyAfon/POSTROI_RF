import { useSelector } from 'react-redux'
import { RootState } from '../../../../../store/store'
import Project from '../Project/Project'
import NoContacts from '../ui/NoContacts'

const ProjectsChats = () => {
    const { projects } = useSelector((state: RootState) => state.projects)

    return (
        <>
            {
                !projects.length
                    ? <NoContacts defaultText='У вас пока нет проектов.' />
                    :
                    projects.map(project => (
                        project
                        &&
                        <Project key={project.project_id} {...project} />
                    ))
            }
        </>
    )
}

export default ProjectsChats