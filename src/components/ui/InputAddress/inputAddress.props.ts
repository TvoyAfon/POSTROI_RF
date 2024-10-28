import React, { SetStateAction } from 'react'

export interface IInputAddress {
	data: { city: string, address: string, coordinates: [number, number] }[],
	error: boolean,
	loading: boolean,
	onClose: () => void,
	setCurrentAddress?: React.Dispatch<SetStateAction<string>>
}