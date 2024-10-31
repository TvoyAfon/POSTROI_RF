
export interface SubCategory {
	category: string,
	sub_category: SubCategory[],
	level: number,
	id: number

}

export interface ICategoryList {
	category: string,
	sub_category: SubCategory[],
	level: number,
	id: number
}