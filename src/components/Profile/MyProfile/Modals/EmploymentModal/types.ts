export enum Employments {
	SELF_EMPLOYMENT = 'Самозанятый',
	INDIVIDUAL = 'Физическое лицо',
	ENTREPRENEUR = 'Индивидуальный предприниматель'
}

export const employments = [
	{
		key: Employments.INDIVIDUAL,
		name: "Физическое лицо"
	},
	{
		key: Employments.SELF_EMPLOYMENT,
		name: "Самозанятый"
	},
	{
		key: Employments.ENTREPRENEUR,
		name: "Индивидуальный предприниматель"
	}
]