import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./components/navigation/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoutes";

import HomePage from "./pages/HomePage";
import LoginForm from "./auth/loginForm";
import SignUp from "./auth/SignUp";

import ProductList from "./Product/ProductList";
import ProductPage from "./Product/ProductPage";
import ProductDetails from "./Product-Details/ProductDetails";
import CategoryByProducts from "./Product/CategoryByProducts";

import ProfilePage from "./components/navigation/layout/ProfilePage";
import ProfileUpdate from "./components/navigation/layout/ProfileUpdate";
import ProfileChangePassword from "./components/navigation/layout/ProfileChangePassword";

import CartPage from "./components/navigation/layout/cartPage";
import Success from "./components/navigation/layout/Success";
import Cancel from "./components/navigation/layout/Cancel";

import AddCategory from "./Admin/AddCategory";
import Dashboard from "./Admin/Dashboard";
import ProductForm from "./Admin/ProductForm";
import UpdateProductForm from "./Admin/UpdateProductForm";
import Notfound from "./pages/Notfound";
import WishlistPage from "./components/navigation/layout/WishlistPage";
import TopProducts from "./Product/TopProducts";
import TopCategoryByProducts from "./Product/TopCategoryByProducts";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Toaster richColors position="top-center" />

      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignUp />} />
     
        {/* ✅ All pages with Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />


          {/* Products */}
          <Route path="products" element={<ProductList setCartCount={setCartCount} />} />
          <Route path="product-page" element={<ProductPage setCartCount={setCartCount} />} />
          <Route path="product-details/:id" element={<ProductDetails setCartCount={setCartCount} />} />
          <Route path="category-by-products/:categoryId" element={<CategoryByProducts />} />
          <Route path="/top-products" element={<TopProducts/>}/>
          <Route path="/top-electronics-products" element={<TopCategoryByProducts/>}/>

          {/* Cart */}
          <Route path="cart-page" element={<CartPage />} />
              <Route path="/wishlist-page" element={<WishlistPage/>}/>
         
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />

          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="update/profile" element={<ProfileUpdate />} />
          <Route path="changePassword/profile" element={<ProfileChangePassword />} />


        {/* ✅ Auth routes without Navbar/Footer (optional) */}
      

       <Route path="*" element={<Notfound/>}/>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="add-category" element={<AddCategory />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product-form" element={<ProductForm />} />
          <Route path="update-product/:id" element={<UpdateProductForm />} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
