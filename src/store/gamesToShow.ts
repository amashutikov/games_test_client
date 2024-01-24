import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Game } from '../types/Game';

const initialState: Game[] = [];

export const { reducer, actions } = createSlice({
  name: 'gamesToShow',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Game | Game[]>) => {
      state.push(
        ...(Array.isArray(action.payload) ? action.payload : [action.payload])
      );
    },
    replace: (state, action: PayloadAction<Game | Game[]>) => {
      state = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    clear: (state) => {
      state.length = 0;
    },
  },
});
