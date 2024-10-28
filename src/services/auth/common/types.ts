export interface IUser {
    id: number
    email?: string
    phone?: string
    password: string
    first_name: string
    last_name: string
    patronymic?: string
    category_person: string
    city_name?: string
    profile_photo?: string,
    external_hash?: string
}

export interface IUserWithCode extends IUser {
    code: number
    city_id?: number
    city?: string
}

export type IUserWithoutPassword = Omit<IUser, 'password'>
export type IUserWithCodeAndWithoutId = Omit<IUserWithCode, 'id'>

export interface ILoginSchema {
    login: string
    login_type: string,
    password: string
}

export interface ILoginTelegramSchema {
    auth_date: number,
    first_name?: string | null,
    last_name?: string | null,
    username?: string | null,
    photo_url?: string | null,
    id: string
    hash: string
}
/* auth_date integer
first_name Expand all(string | null)
last_name Expand all(string | null)
username Expand all(string | null)
photo_url Expand all(string | null)
id string
hash strin */


export interface ICheckCodeSchema {
    email?: string
    phone?: string
    code: number
}

export interface ITokens {
    access_token: string
    refresh_token: string
}

export interface ILoginReturn extends ITokens {
    user_id: number
}

export type IUserInfo = Omit<IUser, 'password'>

export interface IAuthReturn {
    detail: string
    user_id: number
}

export interface IResetPassword {
    email?: string
    phone?: string
    password?: string
    code?: string
}

export interface IResetPasswordService {
    email?: string
    phone?: string
    password?: string
    code?: number
}

export interface IResetCheckCode {
    phone?: string
    email?: string
    code: number
}

export interface IExistUser {
    login: string,
    login_type: string
}

export interface IEditPhoneSchema {

}

export interface IEditEmailSchema {

}