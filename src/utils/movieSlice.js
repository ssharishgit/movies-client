import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    items: []
  },
  reducers:{
    addMovie: (state,action) => {
      state.items.push(action.payload)
    },
    clearMovie: (state,action) => {
      state.items = []
    },
  }
})

export const {addMovie,clearMovie} = movieSlice.actions

export default movieSlice.reducer