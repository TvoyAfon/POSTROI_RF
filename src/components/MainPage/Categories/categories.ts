import human_worker_img from '../../../assets/images/mainpage_images/HUMAN.png'
import box_img from '../../../assets/images/mainpage_images/box.png'
import car_img from '../../../assets/images/mainpage_images/car.svg'
import cleaning_img from '../../../assets/images/mainpage_images/cleaning.png'
import human2 from '../../../assets/images/mainpage_images/human.svg'
import human3 from '../../../assets/images/mainpage_images/human_13.png'
import human4 from '../../../assets/images/mainpage_images/human_14.png'
import human5 from '../../../assets/images/mainpage_images/human_15.png'
import materials_img from '../../../assets/images/mainpage_images/materials.png'
import wall1_img from '../../../assets/images/mainpage_images/wall_1.png'
import wall2_img from '../../../assets/images/mainpage_images/wall_2.png'
import loader_img from '../../../assets/images/mainpage_images/Погрузчик.png'
import bricks_img from '../../../assets/images/mainpage_images/кирпичи.png'
import tractor_img from '../../../assets/images/mainpage_images/трактор.png'
import { ICategory } from './category.interface'

export const categories: ICategory[] = [
	{
		name: 'строительство и ремонт',
		className: 'mainPage_categories_construction',
		divWidth: '185px',
		images: [
			{
				className: 'human_worker',
				source: human_worker_img
			},
			{
				className: 'wall1',
				source: wall1_img
			},
			{
				className: 'wall2',
				source: wall2_img
			}
		]
	},
	{
		name: 'клининг',
		className: 'mainPage_categories_cleaning',
		divWidth: '110px',
		images: [
			{
				source: cleaning_img
			}
		]
	},
	{
		name: 'строительные материалы',
		className: 'mainPage_categories_materials',
		divWidth: '170px',
		images: [
			{
				className: 'loader',
				source: loader_img
			},
			{
				className: 'materials_img',
				source: materials_img
			},
			{
				className: 'box',
				source: box_img
			},
			{
				className: 'bricks',
				source: bricks_img
			}
		]
	},
	{
		name: 'грузоперевозки',
		className: 'mainPage_categories_transport',
		divWidth: '190px',
		images: [
			{
				source: car_img
			}
		]
	},
	{
		name: 'услуги спецтехники',
		className: 'mainPage_categories_eqipment',
		divWidth: '160px',
		images: [
			{
				source: tractor_img
			}
		]
	},
	{
		name: 'биржа разнорабочих и специалистов',
		className: 'mainPage_categories_market',
		divWidth: '200px',
		images: [
			{
				className: 'human1',
				source: human4
			},
			{
				className: 'human2',
				source: human5
			},
			{
				className: 'human3',
				source: human3
			},
			{
				className: 'human4',
				source: human2,
				style: { width: '98px', height: 'auto' }
			}
		]
	}
]