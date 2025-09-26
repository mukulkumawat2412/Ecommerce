import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  categories: [],
  error: null,
};




export const createCategory = createAsyncThunk("/category/createCategories",async(createCategory,{rejectWithValue})=>{
    try {
    const res =     await axios.post("http://localhost:8000/api/v1/category/create-category",createCategory,{
            withCredentials:true
        })

        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error)
    }

})







export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/category/categories",
        {
          withCredentials: true, 
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload
        
        
        console.log(action.payload);
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
     
        console.log(action.payload);
      }).addCase(createCategory.pending,(state)=>{
        state.loading = true
      }).addCase(createCategory.fulfilled,(state,action)=>{
        state.loading = false,
        console.log(action.payload)

      }).addCase(createCategory.rejected,(state,action)=>{
        state.loading = false,
        console.log(action.payload)

      })
  },
});

export default categorySlice.reducer;
