import { createSlice } from "@reduxjs/toolkit";
import type { Profile } from "../../types/auth";



interface UserState {
    is_authenticated: boolean;
    token: string | null;
    profile: Profile | null;
}

const initialState: UserState = {
    is_authenticated: false,
    token: null,
    profile: null,
};




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.is_authenticated = action.payload.is_authenticated || false;
            state.token = action.payload.access_token;
            state.profile = action.payload.profile;
        },
        logout: (state) => {
            state.is_authenticated = false;
            state.token = null;
            state.profile = null;
        },
    },
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
