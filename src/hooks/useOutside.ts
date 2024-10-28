import { useEffect } from 'react'
export const useOutsideClick = (ref: React.RefObject<HTMLElement>, handler: () => void): void => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			// Проверяем, был ли клик вне области указанной в рефе
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return
			}
			handler()
		}
		document.addEventListener('mousedown', listener) // Используем MouseEvent, который вернет стандартный DOM MouseEvent
		document.addEventListener('touchstart', listener)

		return () => {
			// Убираем обработчики при размонтировании
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}



