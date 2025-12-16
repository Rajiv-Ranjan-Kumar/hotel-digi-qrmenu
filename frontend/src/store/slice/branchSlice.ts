// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { Branch } from "../../types/branch";
// import { fetchBranches } from "../../services/apis/branch";



// export const loadBranches = createAsyncThunk<Branch[]>(
//     "branch/load",
//     async (): Promise<Branch[]> => {
//         const res = await fetchBranches();
//         return res;
//     }
// );


// interface BranchState {
//     branches: Branch[];
//     loading: boolean;
// }

// const initialState: BranchState = {
//     branches: [],
//     loading: false,
// };

// const branchSlice = createSlice({
//     name: "branch",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(loadBranches.pending, (state) => { state.loading = true })
//             .addCase(loadBranches.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.branches = action.payload;
//             });
//     },
// });

// export default branchSlice.reducer;











import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Branch } from "../../types/branch";


interface BranchState {
    branches: Branch[];
}


const initialState: BranchState = {
    branches: [],
};


const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers: {
        // Set branches manually
        setBranches(state, action: PayloadAction<Branch[]>) {
            state.branches = action.payload;
        },

        // Clear branches
        clearBranches(state) {
            state.branches = [];
        },
    },
});

export const { setBranches, clearBranches } = branchSlice.actions;
export default branchSlice.reducer;
