import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload; // Store user data
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure } = userSlice.actions;

export default userSlice.reducer;
