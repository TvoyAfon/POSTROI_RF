
export interface ISignsData {
	id?: string | undefined,
	taskName: string,
	address: string,
	experience: string,
	additionally: {
		contract: boolean,
		warranty: boolean,
		materials: boolean,
	},
	price: string,
	description: string,
	telephone?: string,
	email?: string,
	communication: {
		calls: boolean
		messages: boolean
	}
	categoryType: string,
	subCategoryType?: string,
	subsubCategoryType?: string,
	subsubsubCategoryType?: string
	filesSigns: File[],

}