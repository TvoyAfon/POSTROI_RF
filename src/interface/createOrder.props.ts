import { MutableRefObject } from 'react'
import { PaymentMethod } from '../services/order/types/enums'

export interface ICreateOrder {
	children: React.ReactNode,
	handleBack?: () => void,
	handleContinue?: () => void,
	currentCategoryStep?: boolean,
	ref?: MutableRefObject<HTMLButtonElement | null>
	typeOrder?: 'signs' | 'order'
}

export interface IOrderUniversalData {
	taskName: string,
	description: string,
	date: string,
	address: string,
	phone: string,
	paymethod: payMethod,
	settings: IOrderSettings,
	categoryType: string
}

export interface IOrderSettings {
	offers: boolean,
	notice: boolean,
	contract: boolean,
	buyMaterials: boolean
}
export type payMethod = 'cards' | 'fromApp' | 'settlement' | null
export type payMethodWorker = 'cash' | 'cards' | 'fromApp' | null
export type isHaveMaterials = 'yes' | 'no' | 'partly' | null

export interface IOrderData {
	taskName: string,
	description: string,
	connect: {
		chat: boolean,
		phone: boolean
	},
	paymethod: PaymentMethod,
	settings: {
		push: boolean,
		rating: boolean,
		contract: boolean,
		document: boolean
	},
	is_send: boolean,
	currentSocials: string[],

	offersRating?: number,
	date: string,
	dateObjStart: Date | null
	dateObjEnd: Date | null
	address: string,
	telephone: string,

	category1: string,
	category2: string,
	category3: string,
	category4: string,
	categoryId: number | null
}

export interface IOrderFile {
	file: File,
	onDelete: (file: File) => void
	isOnlyFiles: boolean
}


export interface IOrderFileBackEnd {
	file: string,
	fileName: string
}


export interface IOrderTruckingData {
	taskName: string,
	delivery: truckingDelivery,
	description: string,
	when: string,
	where: string,
	dateObjStart?: Date,
	dateObjEnd?: Date,
	telephone: string,
	parametresRadio: parametresRadio,
	inputParametres: {
		length: string,
		diametr: string,
		width: string,
		height: string,
		size: string
	},
	payMethod: payMethod,
	settings: {
		offers: boolean,
		notice: boolean,
		contract: boolean,
	},
	categoryType: string
}

export type truckingDelivery = 'city' | 'middlecity' | null
export type parametresRadio = 'length' | 'diametr' | null


export interface IOrderServicesData {
	taskName: string,
	description: string,
	telephone: string,
	address: string,
	date: string,
	dateObjStart?: Date,
	dateObjEnd?: Date,
	workTime: string,
	descretion: boolean,
	payMethod: payMethod,
	settings: {
		offers: boolean,
		notice: boolean,
		contract: boolean,
	},
	categoryType: string
}

export interface IOrderCleaningData {
	taskName: string,
	place: place,
	otherPlace: string,
	square: string,
	pollution: pollution,
	description: string,
	telephone: string,
	address: string,
	date: string,
	dateObjStart?: Date,
	dateObjEnd?: Date,
	payMethod: payMethod,
	settings: {
		offers: boolean,
		notice: boolean,
		contract: boolean,
	},
	categoryType: string
}

export type pollution = 'daylyCleaning' | 'generalCleaining' | 'veryDirty' | 'afterRepair' | null

export type place = 'appartament' | 'house' | 'office' | 'other' | null


export interface IOrderWorkersData {
	taskName: string,
	description: string,
	when: string,
	dateObjStart?: Date,
	dateObjEnd?: Date,
	workersType: {
		worker: boolean,
		loader: boolean
	},
	where: string,
	time: string,
	payMethod: payMethodWorker,
	settings: {
		calls: boolean,
		notice: boolean,
		chat: boolean,
	},
	categoryType: string
}

export interface IIOrderMaterialsData {
	taskName: string,
	address: string,
	description: string,
	similarItem: boolean,
	delivery: 'yes' | 'no' | null,
	personally: boolean,
	date: string,
	dateObjStart?: Date,
	dateObjEnd?: Date,
	payMethod: string,
	settings: {
		offers: boolean,
		notice: boolean,
		contract: boolean,
	},
	categoryType: string
}

export interface IOrderMaterialsCategory {
	finishMaterials: Record<string, any>,
	constructionMaterials: Record<string, any>,
	electric: Record<string, any>,
	plumbing: Record<string, any>,
	ventilation: Record<string, any>,
	facade: Record<string, any>,
	other: boolean

}

export type payMaterialsMethod = 'cards' | 'fromApp' | 'directly' | 'terminal' | 'receipt' | null;


