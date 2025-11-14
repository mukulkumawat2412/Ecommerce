import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";



const initialState = {
    loading:false,
    error:null,
    contactRecords:[],
    selectedContactRecord:{},
  

}



export const CreateContactUserData =  createAsyncThunk("/contact/create_Contact",async(data,{rejectWithValue})=>{

    try {

   const res =      await api.post("/contact/createContact",data,{
            withCredentials:true
        })


        console.log(res)
        return res.data.data
    } catch (error) {
        console.log(error)
       return rejectWithValue(error)
    }
})




export const ContactRecords = createAsyncThunk("/contact/allContacts",async(_,{rejectWithValue})=>{
    try {

   const  res =    await   api.get("/contact/all-Contact",{
            withCredentials:true
        })

        console.log(res)

        return res.data.data
        
    } catch (error) {
       return rejectWithValue(error)
    }

})





export const DeleteContactRecords = createAsyncThunk("/contact/deleteContacts",async({cId},{rejectWithValue})=>{
    try {

      const res =  await api.delete(`/contact/delete-Contact/${cId}`,{
            withCredentials:true
        })


        console.log(res)

        return res.data.data
        
    } catch (error) {
            return rejectWithValue(error)
    }

})



export const getContactRecordBy_Id = createAsyncThunk("/contact/getContact_Id",async({cId},{rejectWithValue})=>{
    console.log(cId)
    try {

   const res =      await api.get(`/contact/getContactRecord/${cId}`,{
            withCredentials:true
        })


       

        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error)
    }

})





export const UpdateContact_Record = createAsyncThunk("/contact/updateContact_record",async({cId,formData},{rejectWithValue})=>{

    try {
   const res =    await  api.put(`/contact/update-contactRecord/${cId}`,formData,{
        withCredentials:true
        })


        
        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error)
        
    }

})




export const adminReplyMessage  = createAsyncThunk("/contact/reply_message",async({contactId,message:replyMessage},{rejectWithValue})=>{
   
  

    try {
        
   const res =     await api.post(`/contact/admin-reply/${contactId}`,{message:replyMessage},{
            withCredentials:true
        })


        console.log(res)

        return res.data.data
    } catch (error) {
        return rejectWithValue(error)
    }
})








const contactSlice = createSlice({
    name:"contact",
    initialState,
    reducers:{},


    extraReducers:(builder)=>{
        builder.addCase(CreateContactUserData.pending,(state)=>{
            state.loading = true

        }).addCase(CreateContactUserData.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
         state.contactRecords.push(action.payload)

        }).addCase(CreateContactUserData.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)

        }).addCase(ContactRecords.pending,(state)=>{
            state.loading = true

        }).addCase(ContactRecords.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.contactRecords = action.payload
        }).addCase(ContactRecords.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)

        }).addCase(DeleteContactRecords.pending,(state)=>{
            state.loading = true
        }).addCase(DeleteContactRecords.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.contactRecords = state.contactRecords.filter((c)=>c._id  !==action.payload._id)
        }).addCase(DeleteContactRecords.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)

        }).addCase(getContactRecordBy_Id.pending,(state)=>{
            state.loading = true

        }).addCase(getContactRecordBy_Id.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.selectedContactRecord = action.payload
        }).addCase(getContactRecordBy_Id.rejected,(state,action)=>{
            state.loading  = false
            console.log(action.payload)
        }).addCase(UpdateContact_Record.pending,(state)=>{
            state.loading = true

        }).addCase(UpdateContact_Record.fulfilled,(state,action)=>{

            state.loading = false
            state.contactRecords = state.contactRecords.map((c)=>c._id  === action.payload._id ? action.payload :c)
            console.log(action.payload)
        }).addCase(UpdateContact_Record.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)
        }).addCase(adminReplyMessage.pending,(state)=>{
            state.loading = true

        }).addCase(adminReplyMessage.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.contactRecords = state.contactRecords.map((c)=>c._id === action.payload._id ? action.payload:c )

        }).addCase(adminReplyMessage.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)
        })
    }
})



export default contactSlice.reducer