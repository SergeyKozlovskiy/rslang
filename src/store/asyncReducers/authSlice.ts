import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

type InitialState = {
  isLoading: boolean;
  user: User | null;
  message: string | null;
};

type User = {
  message: 'string';
  token: 'string';
  refreshToken: 'string';
  userId: 'string';
  name: 'string';
};

const initialState: InitialState = {
  isLoading: false,
  user: null,
  message: null,
};

export const signUp = createAsyncThunk(
  'signUp',
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    const { name, email, password } = data;
    try {
      const response = await axios.post('https://rslang-v1.herokuapp.com/users', {
        name: name,
        email: email,
        password: password,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signIn = createAsyncThunk(
  'signIn',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await axios.post('https://rslang-v1.herokuapp.com/signin', {
        email: email,
        password: password,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [signUp.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [signUp.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      const error = action.payload.response
        ? (action.payload.response.data as string)
        : 'Ошибка :(';
      state.message = error;
    },
    [signIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      console.log(action.payload);
      state.user = action.payload;
    },
    [signIn.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
