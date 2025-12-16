import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Settings } from "../../types/settings";
import { fetchSettings } from "../../services/apis/settings";




export const loadSettings = createAsyncThunk<Settings>(
    "settings/load",
    async (): Promise<Settings> => {
        const res = await fetchSettings();
        return res;
    }
);

interface SettingsState {
    data: Settings;
    loading: boolean;
}

const initialState: SettingsState = {
    data: {} as Settings,
    loading: false,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.pending, (state) => { state.loading = true })
            .addCase(loadSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            });
    },
});

export default settingsSlice.reducer;
