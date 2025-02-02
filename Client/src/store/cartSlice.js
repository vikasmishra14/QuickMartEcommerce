
import {createSlice} from "@reduxjs/toolkit";

const initialState={
    cart:[],
    loading:false,
    error:null
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        getCartStart(state){
        state.loading=true,
        state.error=null
        },
        getCartSuccess(state,action){
          state.loading=false,
          state.cart=action.payload
        },
        getCartError(state,action){
            state.loading=false,
            state.error=action.payload
        }
    }
});
export const {getCartStart,getCartSuccess,getCartError}=cartSlice.actions;
export default cartSlice.reducer;