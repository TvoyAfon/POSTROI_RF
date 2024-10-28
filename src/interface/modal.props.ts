import { ChangeEventHandler, CSSProperties, HTMLAttributes, HTMLInputTypeAttribute, SetStateAction } from 'react'

export interface IModal {
    children?: React.ReactNode,
    onClose?: () => void,
    closeModal?: () => void,
    openModalStep2?: () => void,
    openModalStep3?: () => void,
    openModalStep4?: () => void,
    openModalStep5?: () => void,
    openModalStep6?: () => void,
    isPhone?: boolean,
    selectRadioButton?: () => void,
    count?: number,
    openResetModalStep1?: () => void,
    openResetModalStep?: () => void,
    closeResetModal?: () => void,
    openModalStep?: () => void,
    style?: CSSProperties
}

export interface IRegisterButton {
    children: React.ReactNode,
    style?: CSSProperties
}



export interface IModalCity {
    handleCloseModalCity?: () => void,
    handleOpenMap?: () => void,
    style?: CSSProperties
}

export interface ICreateOrderModal {
    setOpenModal: Function
}

export interface PropsWithJsxElement {
    children: JSX.Element,

    styleField?: CSSProperties
}

export interface IBalancePopUp {
    handleClosePopup: () => void
}

export interface IBalanceAddCard {
    handleCloseAddCard?: () => void
}

export interface IBalanceRequisites {
    handleCloseRequisites?: () => void
}

export interface IFilterOrder {
    handleCloseFilter?: () => void,
    countOfCards?: string | null,
    setSelectedCategory?: React.Dispatch<SetStateAction<string | null>>,
    handleResetFilters?: () => void,
    selectedCategory?: string | null
}

export interface IModalRegisterInfo {
    handleCloseRegister?: () => void,
    openModalRegister?: boolean
}

export interface ICategoryType extends IModalRegisterInfo {
    handleRegisterVendor?: () => void,
    handleOpenVendorInfo?: () => void,
    openVendorInfo?: boolean,
    handleCloseVendorInfo?: () => void
}

export interface ICategoryVendorInfo {
    handleCloseVendorInfo?: () => void
}

export interface IDefaultModal {
    onOpen?: () => void,
    onClose?: () => void,
    onDelete?: () => void,
    onDeleteWithStopProp?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    stateValue?: boolean,
    style?: CSSProperties,
    countStyle?: CSSProperties,
    cardType?: string,

    isMyCard?: boolean

}

export interface IModalSMS extends IDefaultModal {
    phoneValue: string,
    handleCloseModal?: () => void,
    handleСontinue?: () => void
}


export interface ITimeInput extends IDefaultModal {
    onChangeH?: () => void,
    onChangeM?: () => void,
    valueH?: string,
    valueM?: string,
    onConfirm?: () => void
}


export interface IRegisterInput extends HTMLAttributes<HTMLInputElement> {
    type?: HTMLInputTypeAttribute
    placeholder?: string
    name?: string
    value?: string
    handlePasswordChange: ChangeEventHandler<HTMLInputElement> | undefined
    setFocusInput: React.FocusEventHandler<HTMLInputElement> | undefined
}