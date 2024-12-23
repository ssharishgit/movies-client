import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    values: []
  },
  reducers: {
    adminLogin: (state,action)=> {
      state.values = ({...action.payload,role: 'admin'})
    },
    userLogin: (state,action)=> {
      state.values = ({...action.payload,role: 'user'})
    },
    clearUser: (state,action) => {
      state.values = []
    },
  }
})

export const {adminLogin,userLogin,clearUser} = userSlice.actions

export default userSlice.reducer