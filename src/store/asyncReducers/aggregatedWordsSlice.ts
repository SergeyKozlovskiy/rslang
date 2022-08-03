import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URLS } from '../../types/enums';
import { AggregatedWords } from '../../types/types';

type InitialState = {
  isLoading: boolean;
  difficultWords: AggregatedWords | null;
  learnedWords: AggregatedWords | null;
};

const initialState: InitialState = {
  isLoading: false,
  difficultWords: null,
  learnedWords: null,
};

export const getDifficultWords = createAsyncThunk(
  'getDifficultWords',
  async (data: { userId: string; token: string; level: string }, { rejectWithValue }) => {
    const { userId, token, level } = data;

    try {
      const response = await axios.get(
        `${URLS.USERS}/${userId}/aggregatedWords?wordsPerPage=20&filter=%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22${level}%22%2C%20%22userWord.optional.isLearned%22%3Afalse%7D%5D%7D`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`Cложные слова:`, response.data[0]);
      return response.data[0];
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getLearnedWords = createAsyncThunk(
  'getLearnedWords',
  async (data: { userId: string; token: string; level: string }, { rejectWithValue }) => {
    const { userId, token, level } = data;

    try {
      const response = await axios.get(
        `${URLS.USERS}/${userId}/aggregatedWords?wordsPerPage=20&filter=%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22${level}%22%2C%20%22userWord.optional.isLearned%22%3Atrue%7D%5D%7D`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`Изученные слова`, response.data[0]);
      return response.data[0];
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const aggregatedWordsSlice = createSlice({
  name: 'aggregatedWords',
  initialState,
  reducers: {},
  extraReducers: {
    [getDifficultWords.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getDifficultWords.fulfilled.type]: (state, action: PayloadAction<AggregatedWords>) => {
      state.isLoading = false;
      state.difficultWords = action.payload;
      console.log(state.difficultWords);
    },
    [getDifficultWords.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [getLearnedWords.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getLearnedWords.fulfilled.type]: (state, action: PayloadAction<AggregatedWords>) => {
      state.isLoading = false;
      state.learnedWords = action.payload;
    },
    [getLearnedWords.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default aggregatedWordsSlice.reducer;
