import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx"
import productReducer from "./productSlice.jsx"
import categoryReducer from "./categorySlice.jsx"



const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        category:categoryReducer
    }
})



export default store