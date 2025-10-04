import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "sonner"



const initialState = {
    loading:false,
    error:null,
  
}





export const Register = createAsyncThunk("/signup",async(RegisterData,{rejectWithValue})=>{
    try {
    const res =     await axios.post("http://localhost:8000/api/v1/users/register",RegisterData)

   return res.data.data

    } catch (error) {
       return rejectWithValue(error)
    }

})



export const Login = createAsyncThunk("/login",async(loginData,{rejectWithValue})=>{
    try {
    const res =    await axios.post("http://localhost:8000/api/v1/users/login",loginData,{
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
      const res =   await axios.post("http://localhost:8000/api/v1/users/logout",{},{withCredentials:true})
        
        return res.data.data

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

        }).addCase(Login.fulfilled,(action,state)=>{
            state.loading = false,
            console.log(action.payload)
            toast.success("Login successfully")

        }).addCase(Login.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            toast.error(action.payload.data.message)

        })
    }
})




export default authSlice.reducer