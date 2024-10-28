export interface IReviewItem {
	rating: number
	clientName: string
	date: number
	category: string
	content: string
	price: number
	images: string[]
}

export interface IStar {
	numberOfReviews: number
	stars: 1 | 2 | 3 | 4 | 5
}
