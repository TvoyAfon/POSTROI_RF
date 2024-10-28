import { useDispatch } from "react-redux"
import { IProjectCard } from '../../components/OrdersAndProjectsPage/OrderProject/types/projectTypes'
import { authService } from "../../services/auth/auth.service"
import { projectService } from '../../services/project/project.service'
import { userService } from "../../services/user/user"
import { changeUser } from "../../store/slices/AuthSlice/AuthSlice"
import { addProjects } from '../../store/slices/ProjectsSlice/ProjectsSlice'

export const useAuth = () => {
  const dispatch = useDispatch()

  const auth = async () => {
    try {
      const data = await authService.auth()
      if (!data) return
      console.log(data)
      const userData = await userService.getProfile(data.user_id)
      console.log(userData)
      if (!userData) return
      dispatch(changeUser({
        ...userData,
        city_name: userData.city?.name
      }))

      const response: IProjectCard[] = await projectService.getProjects(false)
      dispatch(addProjects(response))
    } catch (error: any) {
    }
  }

  return auth
}