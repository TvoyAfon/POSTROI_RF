export interface ITelegramUser {
	auth_date: number,
	first_name?: string | null,
	last_name?: string | null,
	username?: string | null,
	photo_url?: string | null,
	id: string
	hash: string
}
export interface IBindTelegram extends ITelegramUser{
    client_id:number
}

export interface IVkUser {
	access_token:string
}
