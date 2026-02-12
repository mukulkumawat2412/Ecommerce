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

// 🔹 Helper Safe Subtotal Calculator
const calculateSubtotal = (items) => {
  return items.reduce(
    (sum, item) =>
      sum + ((item?.product?.price || 0) * (item?.quantity || 0)),
    0
  );
};

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

export const getCartItems = createAsyncThunk(
  "/cart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart/cartItem", {
        withCredentials: true,
      });
      return res.data.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DeleteCartItems = createAsyncThunk(
  "/cartItems_delete",
  async ({ cartId }, { rejectWithValue }) => {
    try {
      const res = await api.delete(
        `/cart/removeCartItem/${cartId}`,
        { withCredentials: true }
      );
      return cartId; // 👈 direct id return karo
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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

export const createCheckOut = createAsyncThunk(
  "/checkout",
  async (cartItemsData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/cart/create-checkout-session",
        cartItemsData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
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

      // ✅ GET CART
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];

        state.subTotal = calculateSubtotal(state.cartItems);
        state.totalAfterDiscount =
          state.subTotal - (state.discount || 0);
      })

      // ✅ ADD TO CART
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);

        state.subTotal = calculateSubtotal(state.cartItems);
      })

      // ✅ DELETE CART ITEM
      .addCase(DeleteCartItems.fulfilled, (state, action) => {
        state.loading = false;

        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );

        state.subTotal = calculateSubtotal(state.cartItems);
        state.totalAfterDiscount =
          state.subTotal - (state.discount || 0);
      })

      // ✅ UPDATE QUANTITY
      .addCase(UpdateCart_Quantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        const index = state.cartItems.findIndex(
          (item) => item._id === updatedItem._id
        );

        if (index !== -1) {
          state.cartItems[index].quantity = updatedItem.quantity;
        }

        state.subTotal = calculateSubtotal(state.cartItems);
        state.totalAfterDiscount =
          state.subTotal - (state.discount || 0);
      })

      // ✅ CHECKOUT
      .addCase(createCheckOut.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutSession = action.payload;
      });
  },
});

export default cartSlice.reducer;
