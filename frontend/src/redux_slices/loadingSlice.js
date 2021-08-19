import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: {
    value: false,
  },
  reducers: {
    loading: (state, action) => {
      state.value = true;
    },
    
    loaded: (state, action) => {
      state.value = false;
    },
  }
});

export const { loading, loaded } = loadingSlice.actions;

export default loadingSlice.reducer;