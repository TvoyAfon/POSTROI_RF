
import { ICard } from '../store/slices/Signs/dataSigns/DataSignsSlice'
import { IIOrderMaterialsData, IOrderCleaningData, IOrderFile, IOrderServicesData, IOrderSettings, IOrderTruckingData, IOrderWorkersData, isHaveMaterials, payMethod } from './createOrder.props'
import { IDefaultModal } from './modal.props'

export interface ICategoryCard {
	onMouseEnter?: () => void,
	onMouseLeave?: () => void,
	onClick?: () => void,
	to: string,
	wall?: boolean

}

export interface IOrderCardWorkers extends IDefaultModal {
	img?: string,
	taskName?: string,
	task?: string,
	date?: string,
	address?: string,
	userProfile?: React.ReactNode,
	categoryType?: 'Грузчики' | 'Разнорабочии',
	paymethod?: 'string',
}

export interface IOrderCardEdit extends IOrderCardWorkers {

}

export interface ISignsCard {
	card?: ICard,
	id?: string,
	img?: string,
	taskName?: string,
	task?: string,
	address?: string,
	userProfile?: React.ReactNode,
	price?: number,
	categoryType?: string,      /* Интерфейс для карточек объявлений */
	files?: string,
	createDate?: string,

	openMap?: boolean,
	onDelete?: () => void,
	isMycard?: boolean
}

export interface IOrderCardCommon {
	id?: string,
	taskName?: string,
	category_type?: string,
	task?: string,
	telephone: string,
	files?: string,
	date?: string,          /* Общий интерфейс для всех карточек категорий */
	address?: string,
	payMethod?: 'toPerfomer' | 'fromApplication' | 'toBankAccount'
}

export interface IOrderCard {
	id?: string,
	taskName?: string,
	category_type?: string,
	task?: string,
	address?: string,
}

export interface IOrderCardDetailBuilding extends IOrderCardCommon {      /* Общий интерфейс для Строительства и ремонта */
	isBuyMaterials?: 'Да' | 'Нет' | 'Частично' | null,
}

export interface IOrderCardDetailTrucking extends IOrderCardCommon {      /* Общий интерфейс для Грузоперевозок */
	delivery?: 'recentlyCity' | 'betweenCity',
	parametres: {
		length: string,
		diametr: string,
		width: string,
		height: string,
		size: string
	},
}

export interface IOrderCardDetailCleaning extends IOrderCardCommon {
	/* Общий интерфейс для Клининга */
	typePlace: 'Квартира' | 'Дом' | 'Офис' | 'Другое',
	square: string,
	pollution: 'Повседневная влажная уборка' | 'Генеральная уборка' | 'Очень грязно' | 'После ремонта',
}

export interface IOrderCardDetailServices extends IOrderCardCommon {
	/* Общий интерфейс для Услуги и спецтехника */
	workTime: string | 'На усмотрение специалиста',
}


export interface IOrderCardDetailMaterials extends IOrderCardCommon {
	/* Общий интерфейс для Стройматериалов */
	categoriesByMaterials: String[],
	analogyProduct: 'Да' | 'Нет',
	delivery: 'Да' | 'Нет',
	payMethodd: 'jjj'
}

export interface ISignsCardDetail extends ISignsCard, IDefaultModal {
	warrantly?: 'Да' | 'Нет',
	contract?: 'Да' | 'Нет',
	materials?: 'Да' | 'Нет',
	calls?: 'Звонки' | 'Сообщения',
	experience?: number,
}

export interface ICardMasters {
	avatar?: string,
	profession?: string,
	specialization?: string,
	nrs?: 'Национальный реестр специалистов' | null,
	employment?: 'Полная занятость' | 'Частичная занятость',
	workingSchedule?: 'Полный день' | 'Неполный день',
	experience?: string,
	educational?: string,
	salary?: number
}

interface IWorkPlace {
	date?: string,
	workName?: string,
	profession?: string,
	location?: string,
	description?: string
}
interface IUnivercity {
	date?: string,
	univercityName?: string,
	specialization?: string
}
interface IskillUpdate extends IUnivercity { }




export interface ICardMastersDetail extends ICardMasters {
	skills?: String[],
	workPlace?: IWorkPlace[],
	higherEducation?: IUnivercity[],
	skillUpdate?: IskillUpdate[],
	experienceDrive?: string,
	about?: string,

	isMyProfile?: boolean
}

export interface ICardMastersProfile {
	img?: string,
	fullName?: string,
	age?: number,
	address?: string,
	relocation?: 'Готов к переезду' | 'Не готов к переезду' | 'Возможен переезд',
	isPassport?: boolean,

	isMyProfile?: boolean  /* Для редактирования или нет */
}

export interface ICardVakancy {
	vakancyName?: string,
	salary?: number,
	experience?: "Без опыта" | 'От 1 года' | 'От 2 лет' | 'Более 3 лет',
	company?: React.ReactNode
}



export interface ICompanyIcon {
	isCardInDetail?: boolean
}


export interface IBuildingCard {
	create_date?: string
	id?: string
	taskName: string,
	description: string
	when: string
	where: string
	telephone: string
	partlyMaterials: string
	categoryType: string
	isHaveMaterials: isHaveMaterials,
	payMethod: payMethod,
	settings: IOrderSettings
	buyMaterials?: false
	files:IOrderFile[],
	prewievPhoto: File | null
}

export interface ITruckingCard extends IOrderTruckingData {
	where: string
	create_date?: string
	id?: string
	prewievPhoto: File | null
	files: File[]
}

export interface IMaterialsCard extends IIOrderMaterialsData {
	where: string
	create_date?: string
	id?: string
	prewievPhoto: File | null

	files: File[]
}

export interface ICleaningCard extends IOrderCleaningData {
	where: string
	create_date?: string
	id?: string
	prewievPhoto: File | null
	files: File[]
}

export interface IServicesCard extends IOrderServicesData {
	where: string
	create_date?: string
	id?: string
	prewievPhoto: File | null
	files: File[]
}
export interface IWorkersCard extends IOrderWorkersData {
	where: string
	create_date?: string
	id?: string
	prewievPhoto: File | null
	files: File[]
}

export type AllOrderCards = IBuildingCard | IWorkersCard | ICleaningCard | IServicesCard | IMaterialsCard | ITruckingCard