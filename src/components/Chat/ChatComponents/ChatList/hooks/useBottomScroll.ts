import { RefObject, useEffect, useState } from 'react'

export const useBottomScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
	const [isFull, setIsFull] = useState<boolean>(false)

	const handleScroll = () => {
		if (!containerRef?.current) return
		const { scrollTop, scrollHeight, clientHeight } = containerRef.current

		if (scrollTop + clientHeight >= scrollHeight) {
			setIsFull(true)
		} else {
			setIsFull(false)
		}
	}

	useEffect(() => {
		const div = containerRef?.current
		if (!div) return

		div.addEventListener('scroll', handleScroll)

		return () => {
			div.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return isFull
}