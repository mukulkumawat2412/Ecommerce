import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";
import { toast } from "sonner";



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


    console.log(res)
        return res.data.data.coupon
       
        
    } catch (error) {
        return rejectWithValue(error)
        
    }

})




export const AllCoupons = createAsyncThunk("/Coupons",async(_,{rejectWithValue})=>{
    try {

   const res =      await api.get("/coupon/all/coupons",{
            withCredentials:true
        })


        console.log(res)

        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error)
    }

})



export const Delete_Coupons = createAsyncThunk("/delete_coupon",async({id},{rejectWithValue})=>{
    console.log(id)
    try {

    const res =     await api.delete(`/coupon/delete/coupon/${id}`,{
            withCredentials:true
        })

        console.log(res)

        return res.data
        
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

        }).addCase(AllCoupons.pending,(state)=>{
            state.loading = true

        }).addCase(AllCoupons.fulfilled,(state,action)=>{
            state.loading = false
            state.couponData = action.payload

        }).addCase(AllCoupons.rejected,(state)=>{
            state.loading = false

        }).addCase(Delete_Coupons.pending,(state)=>{
            state.loading = true

        }).addCase(Delete_Coupons.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
             state.couponData  = state.couponData.filter((c)=>c._id !== action.payload.data._id)
            toast.success(action.payload.message)

        }).addCase(Delete_Coupons.rejected,(state)=>{
            state.loading = false

        })
        

    }

})


export default couponSlice.reducer