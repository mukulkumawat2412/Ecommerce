import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    error:null,
    loading:false,
   AdminProducts:[],
   selectedProduct:null
}



export const getProducts = createAsyncThunk("/product",async(_,{rejectWithValue})=>{
    try {
   const res =      await axios.get("http://localhost:8000/api/v1/admin/get-products",{
            withCredentials:true
        })

    return res.data.data
        
    } catch (error) {
      return  rejectWithValue(error)
        
    }

})


export const deleteProduct = createAsyncThunk("/del_product",async({id},{rejectWithValue})=>{
    try {
   const res =      await axios.delete(`http://localhost:8000/api/v1/admin/Delete-products/${id}`,{
            withCredentials:true
        })

        

        return res.data.data
        
    } catch (error) {
      return  rejectWithValue(error)
    }

})




export const updateProduct = createAsyncThunk("/update_product",async({id,updateData},{rejectWithValue})=>{
    console.log(updateData)
    try {
     const res =    await axios.put(`http://localhost:8000/api/v1/admin/product-update/${id}`,updateData,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        withCredentials:true
     })
        
   return res.data
    } catch (error) {
        return rejectWithValue(error)
    }

})





export const getProducts_ById = createAsyncThunk("/get_product_id",async({id},{rejectWithValue})=>{
   
    try {
     const res =    await axios.get(`http://localhost:8000/api/v1/admin/get-products/${id}`,{
            withCredentials:true
        })

        console.log(res)
       return res.data.data
        
    } catch (error) {
        return rejectWithValue(error)
    }

})




const productSlice = createSlice({
    name:"adminProduct",
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.loading = true


        }).addCase(getProducts.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.AdminProducts = action.payload

        }).addCase(getProducts.rejected,(state,action)=>{
            state.loading = false,
            console.log(action.payload)

        }).addCase(deleteProduct.pending,(state)=>{
            state.loading = true
        }).addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading = false,
            state.AdminProducts.filter((p)=>p._id !== action.payload._id)

        }).addCase(deleteProduct.rejected,(state,action)=>{
             state.loading = false;
      state.error = action.payload;

        }).addCase(updateProduct.pending,(state)=>{
            state.loading = true

        }).addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading = false,
            state.AdminProducts.map((p)=>p._id === action.payload._id ? action.payload : p)

        }).addCase(getProducts_ById.pending,(state)=>{
            state.loading = true

        }).addCase(getProducts_ById.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
         state.selectedProduct = action.payload

        }).addCase(getProducts_ById.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)

        })

    }
})



export default productSlice.reducer