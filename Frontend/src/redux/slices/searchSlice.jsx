import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    searchProduct: [] 
}


export const searchProducts = createAsyncThunk(
    "/search-product",
    async ({ query }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/v1/product/search?query=${query}`,{
                   
                    withCredentials:true
                },
                
            );
            return res.data.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.searchProduct = action.payload; 
                console.log("Search result:", action.payload);
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                
                state.error = action.payload;
                console.log("Search error:", action.payload);
            });
    }
});

export default searchSlice.reducer;
