export interface IAd {
	image: string
	name: string
	price: number
	description: string
	address: string
	category: string
}

export const ads: IAd[] = [
	{
		image: 'https://s3-alpha-sig.figma.com/img/193e/49cd/466da7604ff555333ffbafd5fa051818?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GChFtXf3rhFcGoHGh0YkUPany8p~7bMGq3u-AYD3HsBO0a8eZSOV79tM3K-cr3ErNEVeyhV80dVjqxc9gAan4LskllRRJ8zqIPPxk0mOdA9I4A7ZsZlDcQ~xKXmDDMKPaAXPhT8IyaH5Nu06JGpBoysFPKlaozis4onxHjO2HbDoU3xNZLnBOuA~FlYPvpVbvlit7b2iMfzI5NKeaukcjiyHe3JHGiC7ub6bZWOuZh-3ZpD-cz53Fu~2FZZfaTqTIqt1z4rvQIbydvCM9s9~MvpnXaG-Vp8R~bjBIMlfiIhng9eFe~-5x4JuXrtI0xzl4EFxKb89vcREh2FRw6ITWQ__',
		price: 30_000,
		name: 'Штукатурка фасада',
		description: `Бригада штукатуров выполнит выравнивание стен и потолков:
			Цены на работу:
			Стены от 400 рублей м2;
			Откосы от 400рублей м.п;
			Потолки от 500рублей м2.
		`,
		address: 'Кемеровская область, СНТ Денисовский, участок 544.',
		category: 'Строительство и ремонт > Строительные работы'
	},
	{
		image: 'https://s3-alpha-sig.figma.com/img/193e/49cd/466da7604ff555333ffbafd5fa051818?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GChFtXf3rhFcGoHGh0YkUPany8p~7bMGq3u-AYD3HsBO0a8eZSOV79tM3K-cr3ErNEVeyhV80dVjqxc9gAan4LskllRRJ8zqIPPxk0mOdA9I4A7ZsZlDcQ~xKXmDDMKPaAXPhT8IyaH5Nu06JGpBoysFPKlaozis4onxHjO2HbDoU3xNZLnBOuA~FlYPvpVbvlit7b2iMfzI5NKeaukcjiyHe3JHGiC7ub6bZWOuZh-3ZpD-cz53Fu~2FZZfaTqTIqt1z4rvQIbydvCM9s9~MvpnXaG-Vp8R~bjBIMlfiIhng9eFe~-5x4JuXrtI0xzl4EFxKb89vcREh2FRw6ITWQ__',
		price: 30_000,
		name: 'Штукатурка фасада',
		description: `Бригада штукатуров выполнит выравнивание стен и потолков:
			Цены на работу:
			Стены от 400 рублей м2;
			Откосы от 400рублей м.п;
			Потолки от 500рублей м2.
		`,
		address: 'Кемеровская область, СНТ Денисовский, участок 544.',
		category: 'Строительство и ремонт > Строительные работы'
	}
]