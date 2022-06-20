import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isShowMenu: boolean;
};

const initialState: InitialState = {
  isShowMenu: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isShowMenu = !state.isShowMenu;
    },
  },
});

export default menuSlice.reducer;
