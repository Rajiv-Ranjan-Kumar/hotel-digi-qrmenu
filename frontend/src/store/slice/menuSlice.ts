import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenu } from "../../services/apis/menu";
import type { MenuItem } from "../../types/menu";




interface MenuState {
    items: MenuItem[];
    loading: boolean;
    error: string | null;
}

const initialState: MenuState = {
    items: [],
    loading: false,
    error: null,
};




export const loadMenu = createAsyncThunk<MenuItem[]>(
    "menu/loadMenu",
    async (): Promise<MenuItem[]> => {
        const res = await fetchMenu();
        return res as MenuItem[];
    }
);





const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMenu.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadMenu.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(loadMenu.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error";
            });
    },
});

export default menuSlice.reducer;
