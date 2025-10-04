import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx"
import productReducer from "./productSlice.jsx"
import categoryReducer from "./categorySlice.jsx"
import searchReducer from "./searchSlice.jsx"
import cartReducer from "./cartSlice.jsx"



const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        category:categoryReducer,
        search:searchReducer,
        cart:cartReducer
    }
})



export default store