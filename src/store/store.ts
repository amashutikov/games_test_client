import { reducer as gamesToShowReducer } from './gamesToShow';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  gamesToShow: gamesToShowReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
