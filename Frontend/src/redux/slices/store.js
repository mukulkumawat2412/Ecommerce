import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx"
import productReducer from "./productSlice.jsx"
import categoryReducer from "./categorySlice.jsx"
import searchReducer from "./searchSlice.jsx"
import cartReducer from "./cartSlice.jsx"
import adminReducer from "./admin.productSlice.jsx"



const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        category:categoryReducer,
        search:searchReducer,
        cart:cartReducer,
        adminProduct:adminReducer
    }
})



export default store