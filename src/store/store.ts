import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './asyncReducers/authSlice';
import menuSlice from './reducers/menuSlice';

const rootReducer = combineReducers({
  menuSlice,
  authSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
