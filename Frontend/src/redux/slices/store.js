import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import productReducer from "./productSlice.jsx";
import searchReducer from "./searchSlice.jsx"
import categoryReducer from "./categorySlice.jsx";

import cartReducer from "./cartSlice.jsx";
import adminReducer from "./admin.productSlice.jsx";
import wishlistReducer from "./wishlistSlice.jsx";
import couponReducer from "./couponSlice.jsx";  // ✅ corrected
import contactReducer from "./contactUsSlice.jsx";
import { injectStore } from "../../utils/axiosInstance.js";

const store = configureStore({
    reducer: {
         search: searchReducer,
        auth: authReducer,
       
        product: productReducer,
        coupon: couponReducer,
        category: categoryReducer,
        cart: cartReducer,
        adminProduct: adminReducer,
        wishlist: wishlistReducer,
        contact: contactReducer,
    }
});

injectStore(store)

export default store;
