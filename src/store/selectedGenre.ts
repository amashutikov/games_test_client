import { createSlice } from '@reduxjs/toolkit';

export const { reducer, actions } = createSlice({
  name: 'selectegGenre',
  initialState: { value: 'FREE', label: 'FREE' },
  reducers: {
    change: (selectegGenre, action) => action.payload,
    clear: () => ({ value: 'FREE', label: 'FREE' }),
  },
});
