import { IUserInfo } from "../../auth/common/types"

export type UserProfile = Omit<IUserInfo, 'id'>

export interface FullUser {
    id?: number
    avatars?: File[],
    profile_photo?: File | string,
    currentAvatar?: File
    first_name?: string
    last_name?: string
    patronymic?: string
    phone?: string
    code?: number,
    category_person?: string
    phone_check?: boolean | null
    email_check?: boolean | null
    email?: string
    nik_name?: string
    city?: {
        name: string
    },
    country_iso?: number,
    city_name?: string,
    passport: 'NO' | 'VALID' | 'INVALID' | 'MODERATE'
    vk_id?: number
    telegram_id?: string,
    yandex_id?: string,
    mail_id?: string,
    mailru_confirm?: string,
    about_yourself?: string
    client_age?: string
    experience?: string,
    work_experience?: {
        company_name: string,
        company_specialization: string,
        region: string,
        vacation: string,
        work_responsibility: string,
        work_start: string,
        work_end: string,
        till_time: boolean,
    },
    educational?: IEducation
    educationalDegree?: string | undefined,
    contract?: boolean,
    employment?: string
}

interface IEducation {
    univercity: string,
    faculty: string,
    specialization: string,
    education_start: string,
    education_end: string
}

export interface PassportSchema {
    last_name: string,
    first_name: string,
    patronymic: string,
    date_birth: string,
    series: string,
    number: string,
    date_give: string,
    entity_give: string,
    code: string
}

export interface IGetInfoUser {  /* интерфейс сервиса getInfo */
    category_person: string,
    email: string,
    first_name: string,
    last_name: string,
    patronymic: string,
    id: number,
    phone: string,
    profile_photo?: string
}

export interface IWorkExp {
    client_id: number,
    company_name: string,
    company_specialization: string,
    region: string,
    vacation: string,
    work_responsibility: string,
    work_start: string,
    work_end: string,
    till_time: boolean
}