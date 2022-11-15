import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/* GEOLOCATION */
export const fetchGeoLocationDataByZip = createAsyncThunk(
  'location/fetchGeoLocationDataByZip',
  async (payload, thunkAPI) => {
    const { zip } = payload;
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&limit=1&appid=${API_KEY}`)
      .then(async data => {
        if (data.ok) {
          const { lat, lon } = await data.json();
          thunkAPI.dispatch(fetchReverseGeoLocationData({ lat, lon }));
        } else {
          toast.error('something went wrong', { position: toast.POSITION.TOP_CENTER })
        }
      })
      .catch(err => console.error(err));
    return res;
  }
)

export const fetchGeoLocationDataByQuery = createAsyncThunk(
  'location/fetchGeoLocationDataByQuery',
  async (payload, thunkAPI) => {
    const { location } = payload;
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location},US&limit=1&appid=${API_KEY}`)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          toast.error('something went wrong', { position: toast.POSITION.TOP_CENTER })
        }
      })
      .catch(err => console.error(err));
    return res;
  }
)

export const fetchReverseGeoLocationData = createAsyncThunk(
  'location/fetchReverseGeoLocationData',
  async (payload, thunkAPI) => {
    const { lat, lon } = payload;
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          toast.error('something went wrong', { position: toast.POSITION.TOP_CENTER })
        }
      })
      .catch(err => console.error(err));
    return res;
  }
)

/* WEATHER */
export const fetchCurrentWeatherData = createAsyncThunk(
  'weather/fetchCurrentWeatherData',
  async (payload, thunkAPI) => {
    const { lat, lon } = payload;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          toast.error('something went wrong', { position: toast.POSITION.TOP_CENTER })
        }
      })
      .catch(err => console.error(err));
    return res;
  }
)

export const fetchForecastWeatherData = createAsyncThunk(
  'weather/fetchForecastWeatherData',
  async (payload, thunkAPI) => {
    const { lat, lon } = payload;
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=imperial&appid=${API_KEY}`)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          toast.error('something went wrong', { position: toast.POSITION.TOP_CENTER })
        }
      })
      .catch(err => console.error(err));
    return res;
  }
)
