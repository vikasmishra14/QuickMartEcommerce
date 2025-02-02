import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import userReducer from './userSlice'
import cartSlice from './cartSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        user:userReducer,
        cart:cartSlice
    },
});

export default store;