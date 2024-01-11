import { reducer as gamesToShowReducer } from './gamesToShow';
import { reducer as selectedGenreReducer } from './selectedGenre';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  gamesToShow: gamesToShowReducer,
  selectedGenre: selectedGenreReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
