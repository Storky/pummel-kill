import {TMordstatsData} from 'models/mordstats-data.types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchUsers, fetchWeapons} from 'store/reducers/ActionCreators';
import {IUser} from 'models/IUser';
import {PayloadAction} from '@reduxjs/toolkit/dist/createAction';



interface WeaponsState {
    rawMordstatsData: TMordstatsData,
    isLoading: boolean;
    error: string;
}


const initialState: WeaponsState = {
    rawMordstatsData: {},
    isLoading: false,
    error: '',
};


export const weaponsSlice = createSlice({
    name: 'weapons',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<TMordstatsData>) => {
            state.isLoading = false;
            state.error = '';
            state.rawMordstatsData = action.payload;
        },
        [fetchUsers.pending.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = true;
        },
        [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});
