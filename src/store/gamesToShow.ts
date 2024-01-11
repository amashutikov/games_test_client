import { createSlice } from '@reduxjs/toolkit';

export const { reducer, actions } = createSlice({
  name: 'gamesToShow',
  initialState: [],
  reducers: {
    add: (gamesToShow, action) => action.payload,
    clear: () => [],
  },
});
