import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './movieSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer:{
    movie: movieSlice,
    user: userSlice
  }
})