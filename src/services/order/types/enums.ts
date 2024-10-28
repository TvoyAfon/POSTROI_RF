export enum CleaningType {
	APARTMENT = "APARTMENT",
	HOUSE = "HOUSE",
	OFFICE = "OFFICE",
	OTHER = "OTHER"
}

export enum OrderStatus {
	IN_PROGRESS = "IN PROGRESS",
	COMPLETED = "COMPLETED"
}

export enum OrderSubCategory {
	CLEANING = "Уборка",
	MASTER_FOR_AN_HOUR = "Мастер на час",
	ELECTRICIAN = "Электрик",
	TRANSPORTATION = "Грузоперевозки",
	BUILDING_MATERIALS = "Строительные материалы",
	SPECIAL_EQUIPMENT = "Спецтехника",
	HANDYMAN = "Разнорабочие"
}

export enum OrderCategoryName {
	CLEANING = "Клининг",
	BUILD_REPAIR = "Строительство и ремонт",
	TRANSPORATION_AND_SPECIAL_EQUIPMENT = "Грузоперевозки и услуги спецтехники",
	HANDYMAN = "Биржа разнорабочих и специалистов",
	BUILDING_MATERIALS = "Поставщики и строительные материалы"
}

export enum DegreeContamination {
	REGULAR = "REGULAR",
	GENERAL = "GENERAL",
	DIRTY = "DIRTY",
	AFTER_REPAIR = "AFTER REPAIR"
}

export enum StatusMaterialsBought {
	YES = "YES",
	NO = "NO",
	PARTLY = "PARTLY"
}

export enum CityType {
	CITY = "CITY",
	INTERCITY = "INTERCITY"
}

export enum WorkSpecialization {
	HANDYMAN = "HANDYMAN",
	LOADER = "LOADER"
}

export enum CategoryOrder {
	BUILD_REPAIR = "BUILD REPAIR",
	TRANSPORTATION = "TRANSPORTATION",
	SPECIAL_EQUIPMENT = "SPECIAL EQUIPMENT",
	BUILDING_MATERIALS = "BUILDING MATERIALS",
	HANDYMAN = "HANDYMAN",
	CLEANING = "CLEANING"
}

export enum PaymentMethod {
	EXECUTOR = 'EXECUTOR',
	ORGANIZATION = 'ORGANIZATION'
}