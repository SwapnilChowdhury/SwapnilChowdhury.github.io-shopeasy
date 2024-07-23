import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/userSlice'
import productsReducer from '../features/productsearchSlice'
import cartReducer from '../features/cartSlice'
export default configureStore({
  reducer: {
    users:usersReducer,
    cart:cartReducer,
   products:productsReducer,
   
  }
})