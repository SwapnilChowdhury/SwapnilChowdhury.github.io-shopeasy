import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
  },
  reducers: {
    storeCart(state,cartData){
        state.value = [...cartData.payload];
        console.log(state.value);
    }
  }
})

export const { storeCart } = cartSlice.actions

export default cartSlice.reducer