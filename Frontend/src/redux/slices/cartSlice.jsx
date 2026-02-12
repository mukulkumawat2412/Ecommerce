import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utils/axiosInstance.js";

const initialState = {
  cartItems: [],
  subTotal: 0,
  discount: 0, // coupon ke liye useful
  totalAfterDiscount: 0,
  checkoutSession: null,
  loading: false,
  error: null,
};

export const AddToCart = createAsyncThunk(
  "/add-toCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    console.log(productId);
    try {
      const res = await api.post(
        `/cart/add-to-cart/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "/cart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart/cartItem", { withCredentials: true });
      console.log(res);
      return res.data.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DeleteCartItems = createAsyncThunk(
  "/cartItems_delete",
  async ({ cartId }, { rejectWithValue }) => {
    console.log(cartId);
    try {
      const res = await api.delete(`/cart/removeCartItem/${cartId}`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const UpdateCart_Quantity = createAsyncThunk(
  "/cartQuantity_Update",
  async ({ cartId, quantity }, { rejectWithValue }) => {
    console.log(cartId, quantity);
    try {
      const res = await api.put(
        `/cart/cart-quantityUpdate/${cartId}`,
        { quantity },
        { withCredentials: true }
      );
      console.log(res);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createCheckOut = createAsyncThunk(
  "/checkout",
  async (cartItemsData, { rejectWithValue }) => {
    console.log(cartItemsData);
    try {
      const res = await api.post(
        "/cart/create-checkout-session",
        cartItemsData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Add To Cart
      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.cartItems.push(action.payload);
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add to cart";
      })
      // ✅ Get Cart Items
      .addCase(getCartItems.pending, (state) => {
        state.loading = false;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.subTotal = state.cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          50
        );
        state.totalAfterDiscount = state.subTotal - state.discount - 50;
        console.log(action.payload);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      // ✅ Checkout
      .addCase(createCheckOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCheckOut.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutSession = action.payload;
        console.log(action.payload);
      })
      .addCase(createCheckOut.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      // ✅ Delete Cart Items
      .addCase(DeleteCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteCartItems.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(DeleteCartItems.rejected, (state) => {
        state.loading = false;
      })
      // ✅ Update Quantity
      .addCase(UpdateCart_Quantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateCart_Quantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.cartItems.findIndex(
          (item) => item._id === updatedItem._id
        );
        if (index !== -1) {
          state.cartItems[index].quantity = updatedItem.quantity;
        }

        // ✅ REALTIME SUBTOTAL
        state.subTotal = state.cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      });
  },
});

export default cartSlice.reducer;
