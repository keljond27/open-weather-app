import { createSlice } from '@reduxjs/toolkit';
import { fetchGeoLocationDataByQuery, fetchGeoLocationDataByZip, fetchReverseGeoLocationData } from '../thunks';

const initialState = {};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    //GEO LOCATE BY QUERY (LOCATION NAME)
    builder.addCase(fetchGeoLocationDataByQuery.fulfilled, (state, action) => {
      return action.payload[0];
    });
    //GEO LOCATE BY ZIP
    builder.addCase(fetchGeoLocationDataByZip.fulfilled, (state, action) => {
      return action.payload;
    });
    //REVERSE LOOK UP FOR BROWSER LOCATION DATA
    builder.addCase(fetchReverseGeoLocationData.fulfilled, (state, action) => {
      return (action.payload)[0];
    });
  }
})

export default geolocationSlice.reducer;
