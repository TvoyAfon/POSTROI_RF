export const modals = ['authModal', 'registerEmailModal', 'registerPasswordModal', 'registerNameModal', 'registerDataModal', 'registerDoneModal']

export interface IState {
	authModal: boolean,
	registerEmailModal: boolean
	registerPasswordModal: boolean
	registerNameModal: boolean
	registerDataModal: boolean
	registerDoneModal: boolean
	count: number,
	authModalFlag:boolean
}

export const initialState: IState = {
	authModal: false,
	registerEmailModal: false,
	registerPasswordModal: false,
	registerNameModal: false,
	registerDataModal: false,
	registerDoneModal: false,
	count: 2,
	authModalFlag:false
}

export type State = Record<string, any>