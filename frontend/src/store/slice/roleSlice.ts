import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../../types/coresettings";



interface RoleState {
    roles: Role[];
}



const initialState: RoleState = {
    roles: [],
};




const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setRoles: (state, action: PayloadAction<Role[]>) => { state.roles = action.payload; }
    }
});



export const { setRoles } = roleSlice.actions;
export default roleSlice.reducer;
