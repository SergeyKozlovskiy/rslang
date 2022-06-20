import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type InitialState = {
  isLoading: boolean;
  user: User | null;
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
      console.log(response.data);
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
  reducers: {},
  extraReducers: {
    [signUp.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [signUp.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [signIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [signIn.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
