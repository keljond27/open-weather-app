import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGeoLocationData = createAsyncThunk(
    'location/fetchGeoLocationData',
    async (thunkAPI) => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`).then((data) => data.json());
        return res;      
    }
)

export const fetchCurrentWeatherData = createAsyncThunk(
    'weather/fetchCurrentWeatherData',
    async (thunkAPI) => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`).then((data) => data.json());
        return res;      
    }
)