import React from "react"
import LoginForm from "./auth/loginForm"
import { Routes,Route } from "react-router-dom"
import ProductForm from "./Admin/ProductForm"
import ProductList from "./Product/ProductList"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./components/ProtectedRoutes"
import Dashboard from "./Admin/Dashboard"
import SignUp from "./auth/SignUp"
import MainLayout from "./components/navigation/layout/MainLayout"
import ProductDetails from "./Product-Details/ProductDetails"
import ProfilePage from "./components/navigation/layout/ProfilePage"
import ProfileUpdate from "./components/navigation/layout/ProfileUpdate"
import ProfileChangePassword from "./components/navigation/layout/ProfileChangePassword"
import ProductPage from "./Product/ProductPage"
import AddCategory from "./Admin/AddCategory"
import CategoryByProducts from "./Product/CategoryByProducts"



function App() {


  return (
    <>
<Routes>

    <Route element={<MainLayout/>}>
       <Route path="/" element={<HomePage/>}/>
    </Route>
    
  <Route path="/login" element={<LoginForm/>}/>
  <Route path="/signup"  element={<SignUp/>}/>
    <Route path="/profile" element={<ProfilePage/>}/>
    <Route path="/update/profile" element={<ProfileUpdate/>}/>
    <Route path="/changePassword/profile" element={<ProfileChangePassword/>}/>
 
  <Route path="/products" element={<ProductList/>}/>
  <Route path="/product-page" element={<ProductPage/>}/>
  <Route path="/product-details/:id" element={<ProductDetails/>}/>
  <Route path="/category-by-products/:categoryId" element={<CategoryByProducts/>}/>
  <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
  <Route path="/add-category" element={<AddCategory/>}/>
   <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/product-form" element={<ProductForm/>}/>

  </Route>
</Routes>
   

     
    </>
  )
}

export default App
