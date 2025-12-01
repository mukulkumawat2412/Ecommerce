import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RefreshAccessToken } from "./redux/slices/authSlice.jsx";

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
import AboutUsPage from "./pages/AboutUsPage.jsx";
import AdminCreateCoupon from "./Admin/AdminCreateCoupon.jsx";
import AdminCoupons from "./Admin/AdminCoupons.jsx";
import UpdateCouponForm from "./Admin/UpdateCouponForm.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Faq from "./pages/FaqPage.jsx";
import ContactDashboard from "./Admin/ContactDashboard.jsx";
import UpdateContactRecord from "./Admin/UpdateContactRecords.jsx";
import ImageUpload from "./pages/ImageUpload.jsx";


// Full page spinner component
const FullPageSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(false);

  const { authLoading} = useSelector((state) => state.auth);

  // ✅ Silent refresh only once on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        await dispatch(RefreshAccessToken()).unwrap();
      } catch (error) {
        console.log("Silent refresh failed:", error);
      } finally {
        setInitialLoading(false); // ✅ always stop spinner
      }
    };
    initAuth();
  }, [dispatch]);

  // ✅ Show spinner while initial app load or silent refresh
  if  (authLoading && initialLoading) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <Toaster richColors position="top-center" />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ALL OTHER ROUTES UNDER LAYOUT */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/category-by-products/:categoryId" element={<CategoryByProducts />} />
          <Route path="/top-products" element={<TopProducts />} />
          <Route path="/top-electronics-products" element={<TopCategoryByProducts />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update/profile" element={<ProfileUpdate />} />
          <Route path="/changePassword/profile" element={<ProfileChangePassword />} />

          {/* Pages */}
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/wishlist-page" element={<WishlistPage />} />

          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* ADMIN ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product-form" element={<ProductForm />} />
            <Route path="/update-product/:id" element={<UpdateProductForm />} />
            <Route path="/create-coupon" element={<AdminCreateCoupon />} />
            <Route path="/update-coupon/:id" element={<UpdateCouponForm />} />
            <Route path="/admin-coupons" element={<AdminCoupons />} />
            <Route path="/contact-dashboard" element={<ContactDashboard />} />
            <Route path="/update-contactRecord/:cId" element={<UpdateContactRecord />} />
            <Route path="/image-upload" element={<ImageUpload />} />
           
          </Route>

          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
