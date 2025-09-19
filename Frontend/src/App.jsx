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


function App() {


  return (
    <>
<Routes>

    <Route element={<MainLayout/>}>
       <Route path="/" element={<HomePage/>}/>
    </Route>
    
  <Route path="/login" element={<LoginForm/>}/>
  <Route path="/signup"  element={<SignUp/>}/>
  <Route path="/product-form" element={<ProductForm/>}/>
  <Route path="/products" element={<ProductList/>}/>
  <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
   <Route path="/dashboard" element={<Dashboard/>}/>

  </Route>
</Routes>
   

     
    </>
  )
}

export default App
