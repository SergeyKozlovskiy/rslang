import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URLS } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  today: {
    sumNewWordInDay: number;
    procCorrectAnswer: number;
    seriesCorrectAnswer: number;
  };
};

const initialState: InitialState = {
  isLoading: false,
  today: {
    sumNewWordInDay: 0,
    procCorrectAnswer: 0,
    seriesCorrectAnswer: 0,
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
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const putStatistics = createAsyncThunk(
  'putStatistics',
  async (
    data: {
      token: string;
      userId: string;
      sumNewWordInDaySprint: number;
      procCorrectAnswerSprint: number;
      seriesCorrectAnswerSprint: number;
      sumNewWordInDayAudioChallenge: number;
      procCorrectAnswerAudioChallenge: number;
      seriesCorrectAnswerAudioChallenge: number;
    },
    { rejectWithValue }
  ) => {
    const {
      token,
      userId,
      sumNewWordInDaySprint,
      procCorrectAnswerSprint,
      seriesCorrectAnswerSprint,
      sumNewWordInDayAudioChallenge,
      procCorrectAnswerAudioChallenge,
      seriesCorrectAnswerAudioChallenge,
    } = data;
    try {
      const response = await axios.put(
        `${URLS.USERS}/${userId}/statistics`,
        {
          learnedWords: 0,
          optional: {
            sumNewWordInDaySprint: sumNewWordInDaySprint,
            procCorrectAnswerSprint: procCorrectAnswerSprint,
            seriesCorrectAnswerSprint: seriesCorrectAnswerSprint,
            sumNewWordInDayAudioChallenge: sumNewWordInDayAudioChallenge,
            procCorrectAnswerAudioChallenge: procCorrectAnswerAudioChallenge,
            seriesCorrectAnswerAudioChallenge: seriesCorrectAnswerAudioChallenge,
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
    [putStatistics.pending.type]: (state) => {
      state.isLoading = true;
    },
    [putStatistics.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [putStatistics.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default statisticsSlice.reducer;
