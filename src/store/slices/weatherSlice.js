import { createSlice } from '@reduxjs/toolkit';

import { fetchCurrentWeatherData, fetchForecastWeatherData } from '../thunks';

const initialState = {
  current: {},
  forecast: {}
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //TODAY
    builder.addCase(fetchCurrentWeatherData.fulfilled, (state, action) => {
      return { ...state, current: action.payload };
    });
    //TODAY, TOMORROW, AND BEYOND!
    builder.addCase(fetchForecastWeatherData.fulfilled, (state, action) => {
      return { ...state, forecast: action.payload };
    });
  }
})

export default weatherSlice.reducer;