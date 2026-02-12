import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";

const initialState = {
  cartItems: [],
  subTotal: 0,
  discount: 0,
  totalAfterDiscount: 0,
  checkoutSession: null,
  loading: false,
  error: null,
};

// ✅ Add To Cart
export const AddToCart = createAsyncThunk(
  "/add-toCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/cart/add-to-cart/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Get Cart Items
export const getCartItems = createAsyncThunk(
  "/cart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart/cartItem", { withCredentials: true });
      return res.data.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Delete Cart Item
export const DeleteCartItems = createAsyncThunk(
  "/cartItems_delete",
  async ({ cartId }, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/cart/removeCartItem/${cartId}`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Update Quantity
export const UpdateCart_Quantity = createAsyncThunk(
  "/cartQuantity_Update",
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `/cart/cart-quantityUpdate/${cartId}`,
        { quantity },
        { withCredentials: true }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Checkout
export const createCheckOut = createAsyncThunk(
  "/checkout",
  async (cartItemsData, { rejectWithValue }) => {
    try {
      const res = await api.post("/cart/create-checkout-session", cartItemsData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
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
      // Add To Cart
      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(AddToCart.fulfilled, (state, action) => {
  state.loading = false;
  if (action.payload?.product?._id) {
    const existingItem = state.cartItems.find(
      (item) => item.product._id === action.payload.product._id
    );
    if (existingItem) {
      existingItem.quantity += action.payload.quantity || 1;
    } else {
      state.cartItems.push(action.payload);
    }
  } else {
    console.warn("AddToCart returned invalid item", action.payload);
  }
}).addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add to cart";
      })

      // Get Cart Items
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];

        state.subTotal = state.cartItems.reduce(
          (sum, item) => sum + ((item?.product?.price || 0) * (item?.quantity || 0)),
          0
        );
        state.totalAfterDiscount = state.subTotal - (state.discount || 0);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      })

      // Delete Cart Item
      .addCase(DeleteCartItems.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
        state.subTotal = state.cartItems.reduce(
          (sum, item) => sum + ((item?.product?.price || 0) * (item?.quantity || 0)),
          0
        );
        state.totalAfterDiscount = state.subTotal - (state.discount || 0);
      })

      // Update Quantity
      .addCase(UpdateCart_Quantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.cartItems.findIndex((item) => item._id === updatedItem._id);
        if (index !== -1) state.cartItems[index].quantity = updatedItem.quantity;

        state.subTotal = state.cartItems.reduce(
          (sum, item) => sum + ((item?.product?.price || 0) * (item?.quantity || 0)),
          0
        );
        state.totalAfterDiscount = state.subTotal - (state.discount || 0);
      });
  },
});

export default cartSlice.reducer;
