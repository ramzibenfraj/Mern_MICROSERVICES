
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      state.wishlistItems.push(newItem);
    },
    removeFromWishlist: (state, action) => {
      const idToRemove = action.payload;
      state.wishlistItems = state.wishlistItems.filter(item => item._id !== idToRemove);
    },    
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
