import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    weatherData: [],
}


export const weatherDataSlice = createSlice({
    name: 'weatherData',
    initialState: {
        data: ""
    },
    reducers: {
        getWeatherData: (state, action) => {
            state.data = action.payload;
        }
    },
})