import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { URLS } from '../../types/enums';

type InitialState = {
  isLogin: boolean;
  isLoading: boolean;
  user: User;
  message: string | null;
};

type User = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

type UserId = {
  name: string;
  email: string;
  password: string;
};

type Token = {
  token: string;
  refreshToken: string;
};

const initialState: InitialState = {
  isLogin: false,
  isLoading: false,
  user: {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
  },
  message: null,
};

export const signUp = createAsyncThunk(
  'signUp',
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    const { name, email, password } = data;
    try {
      const response = await axios.post(URLS.USERS, {
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
      const response = await axios.post(URLS.SIGN_IN, {
        email: email,
        password: password,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getNewToken = createAsyncThunk(
  'getNewToken',
  async (data: { userId: string; refreshToken: string }, { rejectWithValue }) => {
    const { userId, refreshToken } = data;
    try {
      const response = await axios.get(`${URLS.USERS}/${userId}/tokens`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getUserById = createAsyncThunk(
  'getUserById',
  async (data: { userId: string; token: string }, { rejectWithValue }) => {
    const { userId, token } = data;
    try {
      const response = await axios.get(`${URLS.USERS}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
      state.user = {
        message: '',
        token: '',
        refreshToken: '',
        userId: '',
        name: '',
      };
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.user ? (state.user.name = action.payload) : null;
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
      state.user = action.payload;
      state.isLogin = true;
    },
    [signIn.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [getNewToken.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getNewToken.fulfilled.type]: (state, action: PayloadAction<Token>) => {
      state.isLoading = false;
      if (state.user) {
        state.user.token = action.payload.token;
        state.user.refreshToken = action.payload.refreshToken;
      }
    },
    [getNewToken.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [getUserById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled.type]: (state, action: PayloadAction<UserId>) => {
      state.isLoading = false;
      state.user ? (state.user.name = action.payload.name) : null;
    },
    [getUserById.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
