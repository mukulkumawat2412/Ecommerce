import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";
import { toast } from "sonner";

const initialState = {
    error: null,
    loading: false,
    discount: 0,
    totalAfterDiscount: 0,
    couponCode: "",
    message: "",
    couponData: [],
    selectedCoupon: null
};

// ======================== CREATE COUPON ========================
export const CreateCoupon = createAsyncThunk(
    "/create_coupon",
    async (CData, { rejectWithValue }) => {
        try {
            const res = await api.post("/coupon/coupons", CData, {
                withCredentials: true,
            });

            return res.data.data.coupon;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// ======================== GET ALL COUPONS ========================
export const AllCoupons = createAsyncThunk(
    "/Coupons",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/coupon/all/coupons", {
                withCredentials: true,
            });

            return res.data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// ======================== DELETE COUPON ========================
export const Delete_Coupons = createAsyncThunk(
    "/delete_coupon",
    async ({ id }, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/coupon/delete/coupon/${id}`, {
                withCredentials: true,
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// ======================== APPLY COUPON ========================
export const ApplyCoupon = createAsyncThunk(
    "/apply_coupon",
    async ({coupon_code,subTotal}, { rejectWithValue }) => {
        console.log(coupon_code)
        try {
            const res = await api.post("/coupon/apply-coupons", {coupon_code,subTotal}, {
                withCredentials: true,
            });

            return res.data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// ======================== GET COUPON BY ID ========================
export const getCoupon_ById = createAsyncThunk(
    "/GetCouponId",
    async ({ id }, { rejectWithValue }) => {
        try {
            const res = await api.get(`/coupon/get-coupon/${id}`, {
                withCredentials: true,
            });

            return res.data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// ======================== UPDATE COUPON ========================
export const updateCoupon = createAsyncThunk(
    "/update_coupon",
    async ({ id, couponData }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/coupon/update-coupon/${id}`, couponData, {
                withCredentials: true,
            });

            return res.data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// ========================= SLICE =============================
const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {

        removeCoupon:(state)=>{
            state.couponCode = "",
            state.discount = 0,
            state.totalAfterDiscount = 0,
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            // CREATE COUPON
            .addCase(CreateCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(CreateCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.couponData.push(action.payload);
            })
            .addCase(CreateCoupon.rejected, (state) => {
                state.loading = false;
            })

            // APPLY COUPON
            .addCase(ApplyCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(ApplyCoupon.fulfilled, (state, action) => {
               const shipping = 50
                state.couponCode = action.payload.couponCode;
                state.discount = action.payload.discountAmount;
                console.log(action.payload.totalAfterDiscount)
                state.totalAfterDiscount = action.payload.totalAfterDiscount + shipping;

                state.message = action.payload.message;
            })
            .addCase(ApplyCoupon.rejected, (state) => {
                state.loading = false;
            })

            // GET ALL COUPONS
            .addCase(AllCoupons.pending, (state) => {
                state.loading = true;
            })
            .addCase(AllCoupons.fulfilled, (state, action) => {
                state.loading = false;
                state.couponData = action.payload;
            })
            .addCase(AllCoupons.rejected, (state) => {
                state.loading = false;
            })

            // DELETE COUPON
            .addCase(Delete_Coupons.pending, (state) => {
                state.loading = true;
            })
            .addCase(Delete_Coupons.fulfilled, (state, action) => {
                state.loading = false;
                state.couponData = state.couponData.filter(
                    (c) => c._id !== action.payload.data._id
                );
                toast.success(action.payload.message);
            })
            .addCase(Delete_Coupons.rejected, (state) => {
                state.loading = false;
            })

            // GET COUPON BY ID
            .addCase(getCoupon_ById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCoupon_ById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCoupon = action.payload;
            })
            .addCase(getCoupon_ById.rejected, (state) => {
                state.loading = false;
            })

            // UPDATE COUPON
            .addCase(updateCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.couponData = state.couponData.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateCoupon.rejected, (state) => {
                state.loading = false;
            });
    },
});


export const {removeCoupon} = couponSlice.actions;

export default couponSlice.reducer;
