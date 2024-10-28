export interface IUser {
     tel?: string,
     email?: string
     city?: string
     password?: string,
     name?: string,
     surname?: string,
     middleName?: string,
     location?: string,
     naturalPerson?: string,
     selfEmployed?: string,
     individual?: string,
     code?: number
}

export interface IPassportFields {
     name?: string,
     surname?: string,
     middlename?: string,
     dateOfBirth?: string,
     seriesAndNumber?: string,
     issue?: string,
     issuedBy?: string,
     code?: string,
     photoPassport?: string,
     passportCheck?: boolean | null
}

export interface IPassportModal extends IPassportFields {
     children: JSX.Element,
     updateData: 'user' | 'userWorkerProfileData' | 'userMasterProfile'
}