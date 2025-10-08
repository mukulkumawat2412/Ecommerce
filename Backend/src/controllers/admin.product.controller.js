import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const GetProducts = asyncHandler(async(req,res)=>{
    
const products =    await Product.find({}).populate("category")



if(!products){
    throw new ApiError(404,"Products not found")
}


return res.status(200).json(new ApiResponse(200,products,"Admin products fetched successfully"))

})




const DeleteProducts = asyncHandler(async(req,res)=>{

    const {id} = req.params
    console.log(id)


    const product = await Product.findById(id)

    if(!product){
        throw new ApiError(404,"Product not found")
    }


    console.log(product)


const deletedProduct =    await Product.findByIdAndDelete(id)


console.log(deletedProduct)

return res.status(200).json(new ApiResponse(200,{
    success:true,
    deletedProduct
},"Admin product successfully deleted"))

})




const getProductById = asyncHandler(async(req,res)=>{
    const {id} = req.params

 const product =    await Product.findById(id).populate("category")
 if(!product){
    throw new ApiError(404,"Product not found")
 }


 return res.status(200).json(new ApiResponse(200,product,"Product fetched BY id"))

})




const UpdateProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const product = await Product.findById(id);
    if(!product){
        throw new ApiError(404,"Product not found");
    }

    const {name,title,price,category,stock,description} = req.body;

    let updatedImage = product.image;

    if(req.files && req.files.length > 0){
   
        const uploadedImages = [];
        for(const file of req.files){
            const result = await uploadOnCloudinary(file.path);

           
            uploadedImages.push(result.url);
        }
        updatedImage = uploadedImages; 
    }

    const ProductUpdated = await Product.findByIdAndUpdate(id,{
        name,
        title,
        price,
        category,
        stock,
        description,
        image: updatedImage
    }, { new: true });

    return res.status(200).json({
        success:true,
        data: ProductUpdated,
        message:"Product updated successfully"
    });
});









export {GetProducts,DeleteProducts,getProductById,UpdateProduct}