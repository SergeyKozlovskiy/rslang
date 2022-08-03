import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URLS } from '../../types/enums';
import { Word, WordUser } from '../../types/types';

type InitialState = {
  isLoading: boolean;
  wordsUser: Word[] | null;
};

const initialState: InitialState = {
  isLoading: false,
  wordsUser: null,
};

export const getAllUserWords = createAsyncThunk(
  'getWords',
  async (data: { id: number; token: string }, { rejectWithValue }) => {
    const { id, token } = data;
    try {
      const response = await axios.get(`${URLS.USERS}/${id}/words`, {
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

export const saveWord = createAsyncThunk(
  'saveWord',
  async (
    data: {
      userId: number;
      token: string;
      wordId: string;
      englishLevel: string;
      isLearned: boolean;
    },
    { rejectWithValue }
  ) => {
    const { userId, token, wordId, englishLevel, isLearned } = data;
    try {
      const response = await axios.post(
        `${URLS.USERS}/${userId}/words/${wordId}`,
        {
          difficulty: englishLevel,
          optional: {
            isLearned: isLearned,
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

export const changeWord = createAsyncThunk(
  'changeWord',
  async (
    data: {
      userId: number;
      token: string;
      wordId: string;
      englishLevel: string;
      isLearned: boolean;
    },
    { rejectWithValue }
  ) => {
    const { userId, token, wordId, englishLevel, isLearned } = data;
    try {
      const response = await axios.put(
        `${URLS.USERS}/${userId}/words/${wordId}`,
        {
          difficulty: englishLevel,
          optional: {
            isLearned: isLearned,
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

export const getUserWordById = createAsyncThunk(
  'getUserWordById',
  async (data: { wordsUserId: WordUser[] }, { rejectWithValue }) => {
    const { wordsUserId } = data;
    try {
      const response = await axios
        .all(
          wordsUserId.map((word) => {
            return axios.get(`${URLS.GET_WORDS}/${word.wordId}`);
          })
        )
        .then((responseArr) => {
          return responseArr.map((response) => response.data);
        });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteUserWord = createAsyncThunk(
  'deleteWord',
  async (data: { userId: number; token: string; wordId: string }, { rejectWithValue }) => {
    const { userId, token, wordId } = data;
    try {
      const response = await axios.delete(`${URLS.USERS}/${userId}/words/${wordId}`, {
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

export const userWordsSlice = createSlice({
  name: 'words user',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUserWords.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllUserWords.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [getAllUserWords.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [saveWord.pending.type]: (state) => {
      state.isLoading = true;
    },
    [saveWord.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [saveWord.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [changeWord.pending.type]: (state) => {
      state.isLoading = true;
    },
    [changeWord.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [changeWord.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [getUserWordById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getUserWordById.fulfilled.type]: (state, action: PayloadAction<Word[]>) => {
      state.isLoading = false;
      state.wordsUser = action.payload;
    },
    [getUserWordById.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userWordsSlice.reducer;
