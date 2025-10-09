import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";





const initialState = {
    loading:false,
    error:null,
    wishlistItems:[]
}




export const addWishlistProduct = createAsyncThunk("/add_wishlist",async({productId},{rejectWithValue})=>{
    try {
  const res =   await axios.post(`http://localhost:8000/api/v1/cart/add-wishlist/${productId}`,{},{
    withCredentials:true
  })
        
  console.log(res)

  return res.data.data
    } catch (error) {
        return rejectWithValue(error)
        
    }

}) 




export const wishlistProducts = createAsyncThunk("/wishlist",async(_,{rejectWithValue})=>{
    try {
   const res =      await axios.get("http://localhost:8000/api/v1/cart/wishlist-products",{
            withCredentials:true
        })
        
        console.log(res)
        return res.data.data
    } catch (error) {
        return rejectWithValue(error)
    }

})



export const DeleteWishlistProduct = createAsyncThunk("/wishlist_delete",async({itemId},{rejectWithValue})=>{
  try {
  const res =   await axios.delete(`http://localhost:8000/api/v1/cart/delete-wishlistItems/${itemId}`,{
      withCredentials:true
    })

    console.log(res)

    return res.data
    
  } catch (error) {
    return rejectWithValue(error)
  }

})










const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{

    },

    extraReducers: (builder) => {
  builder
    .addCase(addWishlistProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(addWishlistProduct.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.wishlistItems.push(action.payload);
    })
    .addCase(addWishlistProduct.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    })
    .addCase(wishlistProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(wishlistProducts.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.wishlistItems = action.payload;
    })
    .addCase(wishlistProducts.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    }).addCase(DeleteWishlistProduct.pending,(state)=>{
      state.loading = true

    }).addCase(DeleteWishlistProduct.fulfilled,(state,action)=>{
      state.loading = false
      console.log(action.payload)
       state.wishlistItems = state.wishlistItems.filter((item)=>item._id !==action.payload.data)
      toast.success(action.payload.message)
      

       
    }).addCase(DeleteWishlistProduct.rejected,(state,action)=>{
      state.loading = false
      console.log(action.payload)
      

    })
    
    
}







})





export default wishlistSlice.reducer