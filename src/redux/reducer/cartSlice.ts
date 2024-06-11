import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { CartInput, CartItemModel } from '../../models/cartModels';
import axios from 'axios';


export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (token: string | null) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {headers: {Authorization: `Bearer ${token}`} })
  console.log(response.data)
  return response.data.data
  })

export const addItems = createAsyncThunk('cart/addItems', async ({data, token} : {data: CartInput, token: string | null}) => {
  console.log(data)
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,data, {headers: {Authorization: `Bearer ${token}`} })
  console.log(response.data.data)
  return response.data.data
  })

export const incrementQuantityItems = createAsyncThunk('cart/incrementQuantityItems', async ( {id, token} : {id: number, token: string | null} ) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/increment/${id}`, "",{headers: {Authorization: `Bearer ${token}`} })
    console.log(response.data)
    return response.data.data
  })

export const decrementQuantityItems = createAsyncThunk('cart/decrementQuantityItems', async ( {id, token} : {id: number, token: string | null} ) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/decrement/${id}`, "",{headers: {Authorization: `Bearer ${token}`} })
    console.log(response.data)
    return response.data.data
  })

export const deleteItems = createAsyncThunk('cart/deleteItems', async (  {id, token} : {id: number, token: string | null} ) => {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${id}`, {headers: {Authorization: `Bearer ${token}`} })
    console.log(response.data)
    return response.data.data
  })



export interface CartState {
  isLoading: string;
  cart: CartItemModel[];
  error: string | null;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [], isLoading: "idle", error: null} as CartState,
  reducers: {
    // addToCart: (state, action: PayloadAction<CartItemModel>) => {
    //   const itemInCart = state.cart.find((item) => item.id === action.payload.id && action.payload.color === item.color && action.payload.size === item.size);
    //   if (itemInCart) {
    //     itemInCart.quantity++;
    //   } else {
    //     state.cart.push({ ...action.payload, quantity: 1 });
    //   }
    // },
    // incrementQuantity: (state, action) => {
    //   const item = state.cart.find((item) => item.id === action.payload.id && action.payload.color === item.color && action.payload.size === item.size);
    //   if (item) {
    //     item.quantity++;
    //   }
    // },
    // decrementQuantity: (state, action) => {
    //   const item = state.cart.find((item) => item.id === action.payload.id && action.payload.color === item.color && action.payload.size === item.size);
    //   if (item) {
    //     if (item.quantity === 1) {
    //       item.quantity = 1;
    //     } else {
    //       item.quantity--;
    //     }
    //   }
    // },
    // removeItem: (state, action) => {
    //   const removeItem = state.cart.filter((item) => item.id !== action.payload.id);

    //   const data = state.cart.filter((item) => item.id === action.payload.id);

    //   if (data !== undefined) {
    //     if (data.length >= 2) {
    //       data.forEach((items) => {
    //         if (action.payload.color === items.color) {
    //           if (items.size !== action.payload.size) {
    //             removeItem.push(items);
    //           }
    //         } else if (items.size == action.payload.size) {
    //           if (items.color !== action.payload.color) {
    //             removeItem.push(items);
    //           }
    //         }
    //       });
    //     }
    //   }

    //   state.cart = removeItem;
    // },
    clearProducts : (state) => {
      state.cart = [];
    }
  },
  extraReducers : (builder) => {
    builder.addCase(fetchCartItems.pending, (state) => {
      state.isLoading = "loading"
    })
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.isLoading= "succeeded"
      state.cart = action.payload
    })
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.isLoading = "rejected";
      state.error = action.error.message as string
    })
    builder.addCase(addItems.pending, (state)=> {
      state.isLoading = "loading"
    })
    builder.addCase(addItems.fulfilled, (state, action) => {
      state.isLoading= "succeeded"
      const itemInCart = state.cart.find((item) => item.id === action.payload.id && action.payload.shoe_color === item.shoe_color && action.payload.shoe_size === item.shoe_size);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({
          id: action.payload.id,
          shoe: action.payload.shoe,
          quantity: 1,
          shoe_id: action.payload.shoe_id,
          shoe_color: action.payload.shoe_color,
          shoe_size: action.payload.shoe_size,
          price: action.payload.price,
        });
      }

    })
    builder.addCase(addItems.rejected, (state, action) => {
      state.isLoading= "rejected"
      state.error = action.error.message as string
    })
    builder.addCase(incrementQuantityItems.pending, (state) => {
      state.isLoading = "loading"
    })
    builder.addCase(incrementQuantityItems.fulfilled, (state, action) => {
      state.isLoading= "succeeded"
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    })
    builder.addCase(incrementQuantityItems.rejected, (state, action) => {
      state.isLoading= "rejected"
      state.error = action.error.message as string
      console.log(action.error)
    })
    builder.addCase(decrementQuantityItems.pending, (state) => {
      state.isLoading = "loading"
      
    })
    builder.addCase(decrementQuantityItems.fulfilled, (state, action) => {
      state.isLoading= "succeeded"
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity <= 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    })
    builder.addCase(decrementQuantityItems.rejected, (state, action) => {
      state.isLoading= "rejected"
      state.error = action.error.message as string
    })
    builder.addCase(deleteItems.pending, (state) => {
      state.isLoading = "loading"
    })
    builder.addCase(deleteItems.fulfilled, (state, action) => {
      state.isLoading= "succeeded"
      const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = removeItem
    })
    builder.addCase(deleteItems.rejected, (state, action) => {
      state.isLoading= "rejected"
      state.error = action.error.message as string
    })
  }
});

export const cartReducer = cartSlice.reducer;
export const { clearProducts} = cartSlice.actions;
// addToCart, incrementQuantity, decrementQuantity, removeItem