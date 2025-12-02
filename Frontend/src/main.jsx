import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import React from 'react'
import {Provider} from "react-redux"
import store from './redux/slices/store.js'
import { AuthProvider } from "./contextApi/AuthContext.jsx";
// import { LoadingProvider } from './contextApi/LoadingContext.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>

  <Provider store={store}>
  
  <BrowserRouter>
  {/* <LoadingProvider> */}

 {/* <AuthProvider> */}
<App /> 
 {/* </AuthProvider> */}

 {/* </LoadingProvider> */}
 
   
 
  </BrowserRouter>

  </Provider>
  
  </StrictMode>
)
