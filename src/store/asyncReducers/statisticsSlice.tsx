import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URLS } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  today: {
    sumNewWordInDay: number;
    sumCorrectAnswer: number;
    seriesCorrectAnswer: number;
    date: string;
  };
};

const initialState: InitialState = {
  isLoading: false,
  today: {
    sumNewWordInDay: 0,
    sumCorrectAnswer: 0,
    seriesCorrectAnswer: 0,
    date: '',
  },
};

export const getStatistics = createAsyncThunk(
  'getStatistics',
  async (data: { token: string; userId: string }, { rejectWithValue }) => {
    const { token, userId } = data;
    try {
      const response = await axios.get(`${URLS.USERS}/${userId}/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const putStatistics = createAsyncThunk(
  'getStatistics',
  async (
    data: {
      token: string;
      userId: string;
      sumNewWordInDay: number;
      sumCorrectAnswer: number;
      seriesCorrectAnswer: number;
      date: string;
    },
    { rejectWithValue }
  ) => {
    const { token, userId, sumNewWordInDay, sumCorrectAnswer, seriesCorrectAnswer, date } = data;
    try {
      const response = await axios.put(
        `${URLS.USERS}/${userId}/statistics`,
        {
          learnedWords: 0,
          optional: {
            today: {
              sumNewWordInDay: sumNewWordInDay,
              sumCorrectAnswer: sumCorrectAnswer,
              seriesCorrectAnswer: seriesCorrectAnswer,
              date: date,
            },
            allTime: [],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: {
    [getStatistics.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getStatistics.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [getStatistics.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default statisticsSlice.reducer;
