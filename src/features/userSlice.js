import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
    loggedIn:{},
  },
  reducers: {
    addUsers(state,userData){
        state.value = [];
        state.value = [...userData.payload]
    },
    setLoggedIn(state,userData){
      state.loggedIn = {...userData.payload}
      console.log(state.loggedIn)
    },
    addNewUser(state,userData){
      state.value.push(userData.payload)
    }
  }
})

export const { addUsers,setLoggedIn,addNewUser } = userSlice.actions

export default userSlice.reducer