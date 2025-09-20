import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


const CreateProduct = asyncHandler(async(req,res)=>{



const userId = req.user?._id



const user = await User.findById(userId)

if(!user){
    throw new ApiError(401,"Unauthorized, please login")
}


const {name,title,price,stock,description,category}   = req.body



if(user.role == !req.user.role){
    throw new ApiError("only created Admin")
}

const localImagePath = req.file?.path

if(!localImagePath){
    throw new ApiError(400,"Image is required")

}


const UploadLocalImagePath = await uploadOnCloudinary(req.file?.path)

if(!UploadLocalImagePath){
    throw new ApiError(400,"cloudinary uploading error")

}

const product = await Product.create({
    name,
    title,
    price,
    description,
    category,
    stock,
    image:UploadLocalImagePath.url
})


return res.status(201).json(new ApiResponse(200,product,"Product successfully created"))



})




const GetProducts = asyncHandler(async(req,res)=>{

const user =   await User.findById(req.user?._id)

if(!user){
    throw new ApiError(401,"Unauthorized, please login")
}



const products  = await Product.find()

if(!products){
    throw new ApiError(400,"Products not found")
}

 res.status(200).json(new ApiResponse(200,products,"Products successfully fetched"))



})



const getSingleProduct = asyncHandler(async(req,res)=>{
 const product =   await Product.findById(req.params.id)

 if(!product){
    throw new ApiError(404,"Product not found")
 }



 return res.status(200).json(new ApiResponse(200,product,"Single product successfully fetched"))



})









export {CreateProduct,GetProducts,getSingleProduct}