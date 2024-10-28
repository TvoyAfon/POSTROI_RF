import { RefObject } from 'react'

export function getBlockByHash(hash: string, refs: Record<string, RefObject<HTMLDivElement>>) {
	if (!hash) return

	const blockName = hash.substring(1, hash.length) as 'services' | 'portfolio' | 'about' | 'reviews'

	if (!Object.keys(refs).includes(blockName)) return
	return refs[blockName]
}