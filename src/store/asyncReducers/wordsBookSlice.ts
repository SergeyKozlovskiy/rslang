import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URLS } from '../../types/enums';
import { Word } from '../../types/types';

type InitialState = {
  isLoading: boolean;
  bookWords: Array<Word> | null;
  isUseBookWords: boolean;
  EnglishLevel: number;
  pageBook: number;
};

const initialState: InitialState = {
  isLoading: false,
  bookWords: null,
  isUseBookWords: false,
  EnglishLevel: 0,
  pageBook: 6,
};

export const getWords = createAsyncThunk(
  'getWords',
  async (data: { group: number; page: number }, { rejectWithValue }) => {
    const { group, page } = data;
    try {
      const response = await axios.get(`${URLS.GET_WORDS}?group=${group}&page=${page}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const wordsSlice = createSlice({
  name: 'wordsBook',
  initialState,
  reducers: {
    changeBookWordAccess: (state, action: PayloadAction<boolean>) => {
      state.isUseBookWords = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.EnglishLevel = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pageBook = action.payload;
    },
  },
  extraReducers: {
    [getWords.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getWords.fulfilled.type]: (state, action: PayloadAction<Array<Word>>) => {
      state.isLoading = false;
      state.bookWords = action.payload;
    },
    [getWords.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default wordsSlice.reducer;
