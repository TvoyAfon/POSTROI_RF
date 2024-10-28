
export interface IOnlyTextField {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	value: string,
	placeholder?: string,
	name?: string
}