import About from './TabsComponents/About/About'
import Ads from './TabsComponents/Ads/Ads'
import NumberOfWorks from './TabsComponents/Portfolio/NumberOfWorks'
import Portfolio from './TabsComponents/Portfolio/Portfolio'
import NumberOfReviews from './TabsComponents/Reviews/NumberOfReviews'
import Reviews from './TabsComponents/Reviews/Reviews'
import Services from './TabsComponents/Services/Services'

export const tabs = [
	{
		name: 'О себе',
		key: 'about',
		component: About
	},
	{
		name: 'Услуги',
		key: 'services',
		component: Services
	},
	{
		name: 'Портфолио',
		key: 'portfolio',
		component: Portfolio,
		rightComponent: NumberOfWorks
	},
	{
		name: 'Отзывы',
		key: 'reviews',
		component: Reviews,
		rightComponent: NumberOfReviews
	},
	{
		name: 'Объявления',
		key: 'ads',
		component: Ads
	}
]