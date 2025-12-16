import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Hotel } from "../../types/hotel";


interface HotelState {
  hotels: Hotel[] | null;
  count: number;
}



const initialState: HotelState = {
  hotels: null,
  count: 0,
};



interface SetHotelsPayload {
  items: Hotel[];
  count: number;
}




const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    // Set hotels + count
    setHotels(state, action: PayloadAction<SetHotelsPayload>) {
      state.hotels = action.payload.items;
      state.count = action.payload.count;
    },

    // Clear hotels
    clearHotels(state) {
      state.hotels = null;
      state.count = 0;
    },
  },
});




export const { setHotels, clearHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
