import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItemModel } from '../../models/cartModels';

export interface CartState {
  cart: CartItemModel[];
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemModel>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id && action.payload.color === item.color && action.payload.size === item.size);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
