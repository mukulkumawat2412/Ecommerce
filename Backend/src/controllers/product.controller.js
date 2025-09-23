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





const localImagePath = req.files;
console.log(localImagePath)

if (!localImagePath || localImagePath.length === 0) {
  throw new ApiError(400, "Images are required");
}


const uploadImages = [] // 4 url of cloudinary

for(const file of req.files){

const UploadLocalImagePath = await uploadOnCloudinary(file.path)

if(!UploadLocalImagePath){
    throw new ApiError(400,"cloudinary uploading error")

}

uploadImages.push(UploadLocalImagePath.url)

}








const product = await Product.create({
    name,
    title,
    price,
    description,
    category,
    stock,
    image:uploadImages
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




const ProductSearch = asyncHandler(async(req,res)=>{

const user =    await  User.findById(req.user?._id)

if(!user){
    throw new ApiError(404,"User not found, please login")
}


const {query} = req.query

 




const productSearch = await Product.find({
    $or:[
        {name:{$regex:query, $options:"i"}},
        {category:{$regex:query, $options:"i"}}
    ]
})



if (!productSearch || productSearch.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No products found"));
  }




return res.status(200).json(new ApiResponse(200,productSearch,"Product searched successfully"))







})








export {CreateProduct,GetProducts,getSingleProduct,ProductSearch}