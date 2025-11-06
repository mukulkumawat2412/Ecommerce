import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";



const initialState = {

    error:null,
    loading:false,
    discount:0,
    totalAfterDiscount:0,
    couponCode:"",
    message:"",
    couponData:[],
   


}




export const CreateCoupon  = createAsyncThunk("/create_coupon",async(CData,{rejectWithValue})=>{
    console.log(CData)
    try {

   const res = await api.post("/coupon/coupons",CData,{
            withCredentials:true
        })

        return res.data.data
       
        
    } catch (error) {
        return rejectWithValue(error)
        
    }

})



export const ApplyCoupon = createAsyncThunk("/apply_coupon",async(ApplyData,{rejectWithValue})=>{
    try {

    const res =     await api.post("/coupon/apply-coupons",ApplyData,{
        withCredentials:true
        
        })

        return res.data.data

        
        
    } catch (error) {

        return rejectWithValue(error)
        
    }

})










const couponSlice = createSlice({
    name:'coupon',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(CreateCoupon.pending,(state)=>{
            state.loading = true

        }).addCase(CreateCoupon.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.couponData.push(action.payload.coupons)
           
        }).addCase(CreateCoupon.rejected,(state,action)=>{

            state.loading = false
            console.log(action.payload)
        }).addCase(ApplyCoupon.pending,(state)=>{
            state.loading = true

        }).addCase(ApplyCoupon.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.couponCode = action.payload.coupon_code
             state.discount = action.payload.discountAmount
             state.totalAfterDiscount = action.payload.totalAfterDiscount+50
             state.message = action.payload.message

        }).addCase(ApplyCoupon.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)

        })

    }

})


export default couponSlice.reducer