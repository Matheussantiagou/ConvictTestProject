import {createSlice} from '@reduxjs/toolkit';

export const dataBaseSlice = createSlice({
  name: 'dataBase',
  initialState: {
    milkPrice: 0,
    defaultRegion: 1,
    dairies: [],
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
  },
});

export const {setReduxMilkPrice, setDefaultRegion, setDairies} =
  dataBaseSlice.actions;

export default dataBaseSlice.reducer;
