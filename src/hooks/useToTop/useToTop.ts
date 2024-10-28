import { useEffect } from 'react'

const useScrollToTopOnReload = () => {
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			window.scrollTo({behavior:'smooth',top:0})
		}, 0) // Вычисляет в следующем цикле событий

		return () => clearTimeout(timeoutId)
	}, [])
}

export default useScrollToTopOnReload