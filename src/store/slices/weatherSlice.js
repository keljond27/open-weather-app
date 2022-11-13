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
        //today
        builder.addCase(fetchCurrentWeatherData.fulfilled, (state, action) => {
            return { ...state, current: action.payload };
        });
        //today, tomorrow, and beyond!
        builder.addCase(fetchForecastWeatherData.fulfilled, (state, action) => {
            return { ...state, forecast: action.payload };
        });
    }
})

export default weatherSlice.reducer;