import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './stockSlice';
import { stockApiSlice } from './stockApiSlice';

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    [stockApiSlice.reducerPath]: stockApiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(stockApiSlice.middleware)
})

export default store