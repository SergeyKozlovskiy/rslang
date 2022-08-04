import { combineReducers, configureStore } from '@reduxjs/toolkit';
import aggregatedWordsSlice from './asyncReducers/aggregatedWordsSlice';
import authSlice from './asyncReducers/authSlice';
import statisticsSlice from './asyncReducers/statisticsSlice';
import wordsSlice from './asyncReducers/wordsBookSlice';
import userWordsSlice from './asyncReducers/wordsUserSlice';
import menuSlice from './reducers/menuSlice';

const rootReducer = combineReducers({
  menuSlice,
  authSlice,
  wordsSlice,
  userWordsSlice,
  aggregatedWordsSlice,
  statisticsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
