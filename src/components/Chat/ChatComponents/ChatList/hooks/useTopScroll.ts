import { RefObject, useEffect, useState } from 'react'

export const useTopScroll = (containerRef: RefObject<HTMLDivElement>) => {
	const [isFullTopScroll, setIsFullTopScroll] = useState<boolean>(false)

	useEffect(() => {
		if (!containerRef?.current) return

		const handleScroll = () => {
			if (containerRef?.current?.scrollTop === 0) {
				return setIsFullTopScroll(true)
			}

			setIsFullTopScroll(false)

		}

		containerRef.current.addEventListener('scroll', handleScroll)

		return () => containerRef.current?.removeEventListener('scroll', handleScroll)

	}, [containerRef])

	return isFullTopScroll
}