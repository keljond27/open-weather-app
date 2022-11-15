import { createSlice } from '@reduxjs/toolkit';
import { fetchGeoLocationDataByLatLon, fetchGeoLocationDataByQuery, fetchGeoLocationDataByZip, fetchReverseGeoLocationData } from '../thunks';

const initialState = {};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    //geo locate by query (location name)
    builder.addCase(fetchGeoLocationDataByQuery.fulfilled, (state, action) => {
      return action.payload[0];
    });
    //geo locate by zip
    builder.addCase(fetchGeoLocationDataByZip.fulfilled, (state, action) => {
      return action.payload;
    });
    //reverse lookup for using browser location info - just in case browser date is incomplete
    builder.addCase(fetchReverseGeoLocationData.fulfilled, (state, action) => {
      return (action.payload)[0];
    });
  }
})

export default geolocationSlice.reducer;
