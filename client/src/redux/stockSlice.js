import { createSlice } from '@reduxjs/toolkit';


const stocksSlice = createSlice({
  name: 'stocks',
  initialState: {
    interval: 5000,
    cachedTickers: [],
    newEntry: '',
    toRemove: ''

  },
  reducers: {
    changeInterval: (state, action) => {
      state.interval = action.payload
    }, 
    setCachedTicker: (state, action) => {
      state.cachedTickers.push(action.payload)
    },
    filterCachedTickers: (state, action) => {
      state.cachedTickers = state.cachedTickers.filter(tick => 
        tick.id !== action.payload.id
      )
    },
    setNewTicker: (state, action) => {
      if (state.newEntry !== action.payload) {
        state.newEntry = action.payload
      }
    },
    setToRemove: (state, action) => {
      state.toRemove = action.payload
    }
  
  }
})


export const { 
  changeInterval, 
  setCachedTicker, 
  filterCachedTickers, 
  setNewTicker, 
  setToRemove 
} = stocksSlice.actions

export default stocksSlice.reducer;