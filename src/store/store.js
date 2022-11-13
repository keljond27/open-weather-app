import { configureStore } from '@reduxjs/toolkit';

import geolocationReducer from './slices/geolocationSlice';
import weatherReducer from './slices/weatherSlice';

export default configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        geolocation: geolocationReducer,
        weather: weatherReducer
    },
})