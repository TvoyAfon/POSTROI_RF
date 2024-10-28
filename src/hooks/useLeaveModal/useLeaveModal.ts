import { useEffect } from 'react'

const useLeaveModal = (isDirty: string) => {
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (isDirty) {
				const message = "Вы уверены, что хотите покинуть страницу? Невыполненные изменения могут быть потеряны."
				event.returnValue = message // Для Firefox
				return message // Для других браузоров
			}
		}

		window.addEventListener('beforeunload', handleBeforeUnload)

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [isDirty])
}

export default useLeaveModal