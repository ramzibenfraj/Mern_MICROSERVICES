
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;
      const index = state.cartItems.findIndex(cartItem => cartItem._id === item._id);
    
      if (index !== -1) {
        state.cartItems = state.cartItems.map((cartItem, idx) => {
          if (idx === index) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + quantity
            };
          }
          return cartItem;
        });
      } else {
        state.cartItems.push({ ...item, quantity });
      }
    },
    
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.cartItems.find(item => item._id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.cartItems.find(item => item._id === id);
      if (item) {
        item.quantity += 1;
      }
    },
  },
});

export const { addToCart,removeFromCart ,decreaseQuantity,increaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
