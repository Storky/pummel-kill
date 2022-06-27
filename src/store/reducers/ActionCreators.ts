import {AppDispatch} from 'store/store';
import axios, {AxiosError} from 'axios';
import {IUser} from 'models/IUser';
import {userSlice} from "./UserSlice"
import {createAsyncThunk} from '@reduxjs/toolkit';

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching());
//         const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data));
//     } catch (e) {
//         const err = e as AxiosError
//         dispatch(userSlice.actions.usersFetchingError(err.message))
//     }
// };

export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('fail')
        }

    }
);


