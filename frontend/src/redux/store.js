import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import cartReducer from './cartSlice'; 
import wishlistReducer from './wishlistSlice'; 
import { loadState, saveState } from './localStorage';

const rootReducer = combineReducers({
  cart: cartReducer,
  form: formReducer,
  wishlist: wishlistReducer,
});

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState, 
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart, 
    wishlist: store.getState().wishlist, 
  });
});
export default store;
