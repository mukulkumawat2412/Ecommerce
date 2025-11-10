import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "sonner"
import api from "../../utils/axiosInstance.js"



const initialState = {
    loading:false,
    error:null,
    profileData:null
  
}




export const RefreshAccessToken = createAsyncThunk("/Refresh_Token",async(_,{rejectWithValue})=>{
    try {

    const res =     await api.post("/users/refresh-token",{},{
        withCredentials:true
    })
 console.log(res)
    return res.data.data
    
        
   
    } catch (error) {
        return rejectWithValue(error)
    }

})







export const Register = createAsyncThunk("/signup",async(RegisterData,{rejectWithValue})=>{
    try {
    const res =     await api.post("/users/register",RegisterData)

   return res.data.data

    } catch (error) {
       return rejectWithValue(error)
    }

})



export const Login = createAsyncThunk("/login",async(loginData,{rejectWithValue})=>{
    try {
    const res =    await api.post("/users/login",loginData,{
        withCredentials:true
    })

    console.log(res)
        
    return res.data.data

    } catch (error) {
        return rejectWithValue(error)
    }

})




export const Logout = createAsyncThunk("/logout",async(_,{rejectWithValue})=>{
    try {
      const res =   await api.post("/users/logout",{},{withCredentials:true})
        
        return res.data.data

    } catch (error) {

        return rejectWithValue(error)
    }

})



export const profileChangePassword = createAsyncThunk("/profile-password",async(profilePasswordData,{rejectWithValue})=>{
    try {
      const res =   await api.put("/users/profile-change-password",profilePasswordData,{
        withCredentials:true
      })
      console.log(res)

      return res.data
      
        
    } catch (error) {

        return rejectWithValue(error)
        
    }

})



export const profileFetch = createAsyncThunk("/profile-fetch",async(_,{rejectWithValue})=>{
    try {
      const res =   await api.get("/users/profile",{
            withCredentials:true
        })

        console.log(res)
        return res.data.data
    } catch (error) {
        return rejectWithValue(error)
        
    }

})





export const updateProfile = createAsyncThunk("/profile_update",async(ProfileUpdateData,{rejectWithValue})=>{
    try {

     const res =    await api.put("/users/profile-update",ProfileUpdateData,{
            withCredentials:true
        })

        console.log(res)

        return res.data
        
    } catch (error) {
        return rejectWithValue(error)
    }

})







const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(Register.pending,(state)=>{
            state.loading = true
        }).addCase(Register.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload.message)

        }).addCase(Register.rejected,(state,action)=>{
            
            console.log(action.payload)

        }).addCase(Login.pending,(state)=>{
            state.loading = true

        }).addCase(Login.fulfilled,(state,action)=>{
            state.loading = false,
            console.log(action.payload)
            toast.success("Login successfully")

        }).addCase(Login.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            toast.error(action.payload.data.message)

        }).addCase(profileChangePassword.pending,(state)=>{
            state.loading = true

        }).addCase(profileChangePassword.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            toast.success(action.payload.message)

        }).addCase(profileChangePassword.rejected,(state)=>{
            state.loading = false

        }).addCase(profileFetch.pending,(state)=>{
            state.loading = true

        }).addCase(profileFetch.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.profileData = action.payload

        }).addCase(profileFetch.rejected,(state)=>{
            state.loading = false

        }).addCase(updateProfile.pending,(state)=>{
            state.loading = true

        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.profileData = action.payload

           
        }).addCase(updateProfile.rejected,(state)=>{
            state.loading = false

        }).addCase(RefreshAccessToken.pending,(state)=>{
            state.loading = true

        }).addCase(RefreshAccessToken.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
                 toast.success("Access token refreshed successfully");

        }).addCase(RefreshAccessToken.rejected,(state)=>{
            state.loading = false

        })
    }
})




export default authSlice.reducer