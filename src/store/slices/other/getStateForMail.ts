import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	stateMailRu: string;
}

const initialState: IState = {
	stateMailRu: '',
};

export const mailStateSlice = createSlice({
	name: 'mailState',
	initialState,
	reducers: {
		setStateFromMail(state, action: PayloadAction<string>) {
			state.stateMailRu = action.payload;
		},
	},
});

export const { setStateFromMail } = mailStateSlice.actions;
export default mailStateSlice.reducer;