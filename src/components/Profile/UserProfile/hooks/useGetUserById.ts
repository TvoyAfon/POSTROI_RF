import { useEffect, useState } from 'react'
import { FullUser } from '../../../../services/user/common/types'
import { userService } from '../../../../services/user/user.service'

export const useGetUserById = (userId: number) => {

	const [userData, setUserData] = useState<FullUser>()
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(false)

	useEffect(() => {
		const getUserById = async () => {
			try {
				setLoading(true)
				setError(false)
				const dataUser = await userService.getProfile(userId)
				setUserData(dataUser)
			} catch (error) {
         setLoading(false)
				 setError(true)
			}
			finally{
				setLoading(false)
			}
		}
		getUserById()
	}, [])
  return {userData,loading,error}
}