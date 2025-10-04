import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"






const initialState = {

    loading:false,
    error:null,
    products:[],
    SingleProduct:null,
      currentPage: 1,
  totalPages: 1,
}





export const createProduct = createAsyncThunk("/create-product",async(productData,{rejectWithValue})=>{
    try {
      const res =   await axios.post("http://localhost:8000/api/v1/product/create-product",productData,{
        withCredentials:true
      })

      return res.data.data
        
    } catch (error) {
        rejectWithValue(error)
    }

})



export const getProducts = createAsyncThunk("/get-product",async(_,{rejectWithValue})=>{
    try {

       const res =  await axios.get("http://localhost:8000/api/v1/product/products",{
            withCredentials:true
        })

        return res.data.data

        
    } catch (error) {
        return rejectWithValue(error)
        
    }

})




export const PaginationProducts = createAsyncThunk("/pagination-product",async({page=1, limit=2, category="", sort="latest"},{rejectWithValue})=>{
    try {
  const res =  await axios.get("http://localhost:8000/api/v1/product/Pagination-products",{
        params:{
            page,limit,category,sort
        },

            withCredentials:true
        },
    
    
    )

        return res.data.data
        
    } catch (error) {
       return rejectWithValue(error)
        
    }

})




export const categoryByProducts = createAsyncThunk("/categoryBy-product",async({categoryId},{rejectWithValue})=>{
    console.log(categoryId)
    try {
    const res =     await axios.get(`http://localhost:8000/api/v1/product/categoryBy-products/${categoryId}`,{
        withCredentials:true
    })
        
    return res.data.data
    } catch (error) {
        return rejectWithValue(error)
    }

})



export const singleProduct = createAsyncThunk("/single-Product",async({id},{rejectWithValue})=>{

try {
    const res =     await axios.get(`http://localhost:8000/api/v1/product/single-product/${id}`,{
        withCredentials:true
    })
    console.log(res)
    return res.data.data
} catch (error) {
    return rejectWithValue(error)
    
}


})




const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(createProduct.pending,(state)=>{
            state.loading  = true

        }).addCase(createProduct.fulfilled,(state,action)=>{
            state.loading = false,
           console.log(action.payload)
           

        }).addCase(createProduct.rejected,(state,action)=>{
            console.log(action.payload)

        }).addCase(getProducts.pending,(state)=>{
            state.loading = true

        }).addCase(getProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload.products
           
        }).addCase(getProducts.rejected,(state,action)=>{
            state.loading = false,
            console.log(action.payload)

        }).addCase(PaginationProducts.pending,(state,action)=>{
            state.loading = true

        }).addCase(PaginationProducts.fulfilled,(state,action)=>{
            state.loading = false,
            console.log(action.payload)
            state.products = action.payload.products
            state.currentPage = action.payload.page,
            state.totalPages = action.payload.totalPages

        }).addCase(PaginationProducts.rejected,(state,action)=>{
            state.loading = false,
            console.log(action.payload)

        }).addCase(categoryByProducts.pending,(state)=>{
            state.loading = true

        }).addCase(categoryByProducts.fulfilled,(state,action)=>{
            state.loading = false,
            console.log(action.payload)
            state.products = action.payload

        }).addCase(categoryByProducts.rejected,(state,action)=>{
            state.loading = false,
            console.log(action.payload)

        }).addCase(singleProduct.pending,(state)=>{
            state.loading = true

        }).addCase(singleProduct.fulfilled,(state,action)=>{
            state.loading = false,
            console.log(action.payload)
            state.SingleProduct = action.payload


        }).addCase(singleProduct.rejected,(state,action)=>{
            state.loading = false,
            console.log(action.payload)

        })
    }
})




export default productSlice.reducer


