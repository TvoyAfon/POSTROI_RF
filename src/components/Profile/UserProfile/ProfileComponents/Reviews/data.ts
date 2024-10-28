import { IReviewItem, IStar } from './types'

export const services = [
	{
		name: "Все услуги",
		reviews: 24,
		key: 'all'
	},
	{
		name: "Малярные и штукатурные работы",
		reviews: 12,
		key: 'painting'
	},
	{
		name: "Грузоперевозки",
		reviews: 2,
		key: 'trucking'
	},
	{
		name: "Стройка",
		reviews: 2,
		key: 'building'
	},
	{
		name: "Разнорабочие",
		reviews: 2,
		key: 'general-workers'
	}
]

export const stars: IStar[] = [
	{
		stars: 5,
		numberOfReviews: 20
	},
	{
		stars: 4,
		numberOfReviews: 2
	},
	{
		stars: 3,
		numberOfReviews: 2
	},
	{
		stars: 2,
		numberOfReviews: 0
	},
	{
		stars: 1,
		numberOfReviews: 0
	}
]

export const reviews: IReviewItem[] = [
	{
		rating: 5,
		clientName: "Заказчик 1",
		date: Date.now(),
		content: 'Все прошло идеально! Эльдар, мастер своего дела! Быстро приступил к работе, посчитал количество нужных материалов, порекомендовал какие лучше покупать. Все работы были сделаны максимально качественно и аккуратно. Застелены пленкой все поверхности, которые могли повредиться в процессе ремонта, что говорит что мастер с заботой подходит к клиенту и его объекту. Цена в процессе работы осталось прежней. Результатом более чем довольны. Могу смело рекомендовать Эльдара! Спасибо!',
		price: 45_000,
		images: ['https://s3-alpha-sig.figma.com/img/9212/c5d9/2a17e8f1c6aeffb70b5dc183964fb180?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mjqVxGo-NN5Fe7y5a9FVq5s9MU5bnz0T7Kj6NsPYdA7ab1J3Ak8n00LXgwoWkW4DAJxMbLBeF5AJ~Pb8Wyiz1HRdQvVxCR3tMpIkiH6c2wFuYxNChD5DxMiXR3h-pmFwQgrI5VtwEWlgoELJ6MxNxu5gOxbPpcuOWQr~4WZk9OHi2jFPBKm3-m5MY1XarxwbDuN1AA6dgjk9gvORv10C5XgHvFpUi1BY1kwOW84pCZaTThmIFCCz4M8Er1ED-zHBjhdzCU0mCPMZlDWyMoXS3Vj5x4fOEv1S~43fYa7~Nks2sP98vxMU9uBkM0lnhIzGqq9JlJdY2Ov3RyDLt-ODxA__', 'https://s3-alpha-sig.figma.com/img/9212/c5d9/2a17e8f1c6aeffb70b5dc183964fb180?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mjqVxGo-NN5Fe7y5a9FVq5s9MU5bnz0T7Kj6NsPYdA7ab1J3Ak8n00LXgwoWkW4DAJxMbLBeF5AJ~Pb8Wyiz1HRdQvVxCR3tMpIkiH6c2wFuYxNChD5DxMiXR3h-pmFwQgrI5VtwEWlgoELJ6MxNxu5gOxbPpcuOWQr~4WZk9OHi2jFPBKm3-m5MY1XarxwbDuN1AA6dgjk9gvORv10C5XgHvFpUi1BY1kwOW84pCZaTThmIFCCz4M8Er1ED-zHBjhdzCU0mCPMZlDWyMoXS3Vj5x4fOEv1S~43fYa7~Nks2sP98vxMU9uBkM0lnhIzGqq9JlJdY2Ov3RyDLt-ODxA__', 'https://s3-alpha-sig.figma.com/img/9212/c5d9/2a17e8f1c6aeffb70b5dc183964fb180?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mjqVxGo-NN5Fe7y5a9FVq5s9MU5bnz0T7Kj6NsPYdA7ab1J3Ak8n00LXgwoWkW4DAJxMbLBeF5AJ~Pb8Wyiz1HRdQvVxCR3tMpIkiH6c2wFuYxNChD5DxMiXR3h-pmFwQgrI5VtwEWlgoELJ6MxNxu5gOxbPpcuOWQr~4WZk9OHi2jFPBKm3-m5MY1XarxwbDuN1AA6dgjk9gvORv10C5XgHvFpUi1BY1kwOW84pCZaTThmIFCCz4M8Er1ED-zHBjhdzCU0mCPMZlDWyMoXS3Vj5x4fOEv1S~43fYa7~Nks2sP98vxMU9uBkM0lnhIzGqq9JlJdY2Ov3RyDLt-ODxA__'],
		category: 'Строительство и ремонт > Ремонт квартир “под ключ”'
	},
	{
		rating: 5,
		clientName: "Заказчик 1",
		date: Date.now(),
		content: 'Все прошло идеально! Эльдар, мастер своего дела! Быстро приступил к работе, посчитал количество нужных материалов, порекомендовал какие лучше покупать. Все работы были сделаны максимально качественно и аккуратно. Застелены пленкой все поверхности, которые могли повредиться в процессе ремонта, что говорит что мастер с заботой подходит к клиенту и его объекту. Цена в процессе работы осталось прежней. Результатом более чем довольны. Могу смело рекомендовать Эльдара! Спасибо!',
		price: 45_000,
		images: ['https://s3-alpha-sig.figma.com/img/9212/c5d9/2a17e8f1c6aeffb70b5dc183964fb180?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mjqVxGo-NN5Fe7y5a9FVq5s9MU5bnz0T7Kj6NsPYdA7ab1J3Ak8n00LXgwoWkW4DAJxMbLBeF5AJ~Pb8Wyiz1HRdQvVxCR3tMpIkiH6c2wFuYxNChD5DxMiXR3h-pmFwQgrI5VtwEWlgoELJ6MxNxu5gOxbPpcuOWQr~4WZk9OHi2jFPBKm3-m5MY1XarxwbDuN1AA6dgjk9gvORv10C5XgHvFpUi1BY1kwOW84pCZaTThmIFCCz4M8Er1ED-zHBjhdzCU0mCPMZlDWyMoXS3Vj5x4fOEv1S~43fYa7~Nks2sP98vxMU9uBkM0lnhIzGqq9JlJdY2Ov3RyDLt-ODxA__', 'https://s3-alpha-sig.figma.com/img/9212/c5d9/2a17e8f1c6aeffb70b5dc183964fb180?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mjqVxGo-NN5Fe7y5a9FVq5s9MU5bnz0T7Kj6NsPYdA7ab1J3Ak8n00LXgwoWkW4DAJxMbLBeF5AJ~Pb8Wyiz1HRdQvVxCR3tMpIkiH6c2wFuYxNChD5DxMiXR3h-pmFwQgrI5VtwEWlgoELJ6MxNxu5gOxbPpcuOWQr~4WZk9OHi2jFPBKm3-m5MY1XarxwbDuN1AA6dgjk9gvORv10C5XgHvFpUi1BY1kwOW84pCZaTThmIFCCz4M8Er1ED-zHBjhdzCU0mCPMZlDWyMoXS3Vj5x4fOEv1S~43fYa7~Nks2sP98vxMU9uBkM0lnhIzGqq9JlJdY2Ov3RyDLt-ODxA__', 'https://s3-alpha-sig.figma.com/img/9212/c5d9/2a17e8f1c6aeffb70b5dc183964fb180?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mjqVxGo-NN5Fe7y5a9FVq5s9MU5bnz0T7Kj6NsPYdA7ab1J3Ak8n00LXgwoWkW4DAJxMbLBeF5AJ~Pb8Wyiz1HRdQvVxCR3tMpIkiH6c2wFuYxNChD5DxMiXR3h-pmFwQgrI5VtwEWlgoELJ6MxNxu5gOxbPpcuOWQr~4WZk9OHi2jFPBKm3-m5MY1XarxwbDuN1AA6dgjk9gvORv10C5XgHvFpUi1BY1kwOW84pCZaTThmIFCCz4M8Er1ED-zHBjhdzCU0mCPMZlDWyMoXS3Vj5x4fOEv1S~43fYa7~Nks2sP98vxMU9uBkM0lnhIzGqq9JlJdY2Ov3RyDLt-ODxA__'],
		category: 'Строительство и ремонт > Ремонт квартир “под ключ”'
	}
]