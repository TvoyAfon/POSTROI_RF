import { State } from './types'

export function closeEverythingExcept(state: State, exception: string, modals: string[]) {
	modals.forEach(modalName => {
		if (exception === modalName) return
		state[modalName] = false
	})
}