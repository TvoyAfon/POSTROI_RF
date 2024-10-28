export interface ICategory {
	name: string
	key: string
	services: IService[]
}

export interface IService {
	name: string
	numberOfServices: number
	subcategories: ISubCategory[]
}

export interface ISubCategory {
	name: string
	price: number
}

export const services: ICategory[] = [
	{
		name: "Строительство и ремонт",
		key: 'building',
		services: [
			{
				name: 'Мастер на час',
				numberOfServices: 12,
				subcategories: [
					{
						name: "Подраздел",
						price: 12_000
					},
					{
						name: "Подраздел",
						price: 12_000
					}
				]
			},
			{
				name: '123',
				numberOfServices: 12,
				subcategories: [
					{
						name: "Подра111здел",
						price: 12_000
					},
					{
						name: "Подраздел",
						price: 12_000
					}
				]
			}
		]
	},
	{
		name: "Грузоперевозки",
		key: 'trucking',
		services: [
			{
				name: 'Грузовая "ГАЗель"',
				numberOfServices: 12,
				subcategories: [
					{
						name: "Подраздел",
						price: 12_000
					}
				]
			}
		]
	},
	{
		name: "Клининг",
		key: 'cleaning',
		services: [
			{
				name: 'Раздел',
				numberOfServices: 12,
				subcategories: [
					{
						name: "Подраздел",
						price: 12_000
					}
				]
			}
		]
	}
]