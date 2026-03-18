import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";



const CreateCategory = asyncHandler(async(req,res)=>{

 const user =   await User.findById(req.user?._id)

 if(!user){
    throw new ApiError(401,"Unauthorized, please login")
 }

const {name,slug} =  req.body

if([name,slug].some((value)=>value?.trim()==="")){
    throw new ApiError(400,"Fields are required")
}


const alreadyExist = await Category.findOne({slug})


if(alreadyExist){
    throw new ApiError(400,"Category already exist")
}


const categories = await Category.create({
    name,
    slug
})


return res.status(200).json(new ApiResponse(200,categories,"Categories successfully created"))



})


const GetCategories = asyncHandler(async(req,res)=>{

 const user =    await User.findOne(req.user?._id)


 if(!user){
    throw new ApiError(401,"Unauthorized, please login")
 }

const AllCategories =  await Category.find({})


if(!AllCategories || AllCategories.length===0){
    throw new ApiError(404,"Categories not found")
}


return res.status(200).json(new ApiResponse(200,AllCategories,"Categories fetched successfully"))


})






export {CreateCategory,GetCategories}