import {createSlice} from '@reduxjs/toolkit';

export const dataBaseSlice = createSlice({
  name: 'dataBase',
  initialState: {
    milkPrice: 0,
    defaultRegion: 1,
    dairies: [],
    percentage: 0,
    updated: false,
  },
  reducers: {
    setReduxMilkPrice: (state, action) => {
      state.milkPrice = action.payload;
    },
    setDefaultRegion: (state, action) => {
      state.defaultRegion = action.payload;
    },
    setDairies: (state, action) => {
      state.dairies = action.payload;
    },
    setPercentage: (state, action) => {
      state.percentage = action.payload;
    },
    setUpdated: (state, action) => {
      state.updated = action.payload;
    },
  },
});

export const {
  setReduxMilkPrice,
  setDefaultRegion,
  setDairies,
  setPercentage,
  setUpdated,
} = dataBaseSlice.actions;

export default dataBaseSlice.reducer;
