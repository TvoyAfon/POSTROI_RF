import { CityType, CleaningType, DegreeContamination, StatusMaterialsBought, WorkSpecialization } from './enums'

export type OrderData = ICleaningOrder | IBuildRepair | ISpecialEquipmentOrder | TransportationOrder | HandymanOrder | IMaterials

export interface IMaterials {
	delivery: boolean
	analog: boolean
}

export interface ICleaningOrder {
	cleaning_type: CleaningType
	cleaning_type_other: string | null
	square: number | string
	degree_contamination: DegreeContamination
}

export interface IBuildRepair {
	status_materials_bought: StatusMaterialsBought
	materials_bought: string

}

export interface ISpecialEquipmentOrder {
	duration: number
}

export interface TransportationOrder {
	city_type: CityType
	cargo_description: string
	height: number | string
	length: number | string
	width: number | string
	volume: number | string
}

export interface HandymanOrder {
	work_specialization: WorkSpecialization
}