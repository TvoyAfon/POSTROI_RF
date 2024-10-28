import { CityType, CleaningType, DegreeContamination, PaymentMethod, WorkSpecialization } from '../../../services/order/types/enums'


export function getPaymentMethodRussian(paymentMethod: PaymentMethod) {
	return {
		[PaymentMethod.ORGANIZATION]: 'На расчетный счет самозанятого или организации',
		[PaymentMethod.EXECUTOR]: 'Наличными или переводом на карту, напрямую исполнителю'
	}[paymentMethod]
}

export function getMinRating(hasOffers: boolean) {
	return hasOffers ? 1 : 5
}

export function getWorkSpecialization(workSpecialization: WorkSpecialization) {
	return {
		[WorkSpecialization.HANDYMAN]: "Разнорабочие (8 часов + 1 час обед)",
		[WorkSpecialization.LOADER]: "Грузчики (от 2-х часов)"
	}[workSpecialization]
}

export function getTypeRoom(typeRoom: CleaningType) {
	return {
		[CleaningType.APARTMENT]: "Квартира",
		[CleaningType.HOUSE]: "Дом",
		[CleaningType.OFFICE]: "Офис",
		[CleaningType.OTHER]: "Другое"
	}[typeRoom]
}

export function getTransportationType(transporation: CityType) {
	return {
		[CityType.CITY]: "По городу",
		[CityType.INTERCITY]: "Между городами"
	}[transporation]
}

export function getDegreeContamination(degreeContamination: DegreeContamination) {
	return {
		[DegreeContamination.AFTER_REPAIR]: "После ремонта",
		[DegreeContamination.DIRTY]: "Очень грязно",
		[DegreeContamination.GENERAL]: "Генеральная уборка",
		[DegreeContamination.REGULAR]: "Повседневная влажная уборка"
	}[degreeContamination]
}

export function convertDate(date: Date) {
	const year = date.getUTCFullYear()
	const month = String(date.getUTCMonth() + 1).padStart(2, '0')
	const day = String(date.getUTCDate()).padStart(2, '0')

	return `${year}-${month}-${day}`
}