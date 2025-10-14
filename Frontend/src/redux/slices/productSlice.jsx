import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"






const initialState = {

    loading:false,
    error:null,
    products:[],
    TopProducts:[],
    TopCategoryProducts:[],
    SingleProduct:null,
      currentPage: 1,
  totalPages: 1,
}









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




export const topProductsByPrice = createAsyncThunk("/top_products",async(_,{rejectWithValue})=>{
    try {

     const res =    await axios.get("http://localhost:8000/api/v1/product/topProducts-ByPrice",{
            withCredentials:true
        })


        console.log(res)
        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error)
    }

})



export const TopCategoryBy_Products = createAsyncThunk("/top_category_Products",async(_,{rejectWithValue})=>{
    try {
     const res =    await axios.get("http://localhost:8000/api/v1/product/topProducts-ByCategory",{
            withCredentials:true
        })

       

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
       builder.addCase(getProducts.pending,(state)=>{
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

        }).addCase(topProductsByPrice.pending,(state)=>{
            state.loading = true

        }).addCase(topProductsByPrice.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.TopProducts = (action.payload)

        }).addCase(topProductsByPrice.rejected,(state)=>{
            state.loading = false

        }).addCase(TopCategoryBy_Products.pending,(state)=>{
            state.loading = true

        }).addCase(TopCategoryBy_Products.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
         state.TopCategoryProducts = action.payload

        }).addCase(TopCategoryBy_Products.rejected,(state)=>{
            state.loading = false
        })
    }
})




export default productSlice.reducer


