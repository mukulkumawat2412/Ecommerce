import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import Category from "../models/category.model.js";




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



const products = await Product.find({})



if(!products){
    throw new ApiError(400,"Products not found")
}

 res.status(200).json(new ApiResponse(200,{
   
    products,
 },"Products successfully fetched"))



})



const getSingleProduct = asyncHandler(async(req,res)=>{
 const product =   await Product.findById(req.params.id)

 if(!product){
    throw new ApiError(404,"Product not found")
 }



 return res.status(200).json(new ApiResponse(200,product,"Single product successfully fetched"))



})




const ProductSearch = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found, please login");
  }

  const { query } = req.query;

  if (!query) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No query provided"));
  }

  // pehle name match kar lo
  let products = await Product.find({
    name: { $regex: query, $options: "i" }
  }).populate("category");

  // fir category match check karo
  const categoryProducts = await Product.find().populate({
    path: "category",
    match: { name: { $regex: query, $options: "i" } } // Category model ka 'name'
  });

  // dono ko merge karke unique banao
  products = [...products, ...categoryProducts].filter(
    (p, i, arr) => arr.findIndex(x => x._id.toString() === p._id.toString()) === i
  );

  if (!products.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No products found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Product searched successfully"));
});




 



const PaginationProducts = asyncHandler(async(req,res)=>{

    const user =   await User.findById(req.user?._id)

 if(!user){
    throw new ApiError(401,"Unauthorized, please login")
 }


 const page = Number(req.query.page) || 1
 const limit = 2
 const skip = (page-1) * limit


const {category,sort} =  req.query

const filter = {}

// const filter = {
//     category:"Electronics"
// }



if(category) filter.category = category


let sortOption = {} 



if(sort==="priceAsc"){
    sortOption = {price:1}
}
else if(sort==="priceDesc"){
    sortOption = {price:-1}

}else{
    sortOption = {createdAt:-1}
}



const [products,total] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(limit),
    Product.countDocuments(filter)
])


if(!products){
    throw new ApiError(404,"Products not found")
}



return res.status(200).json(new ApiResponse(200,{
    total,
    page,
    totalPages:Math.ceil(total/limit),
    products


},"Products successfully fetched"))



})




const GetProductsByCategory = asyncHandler(async(req,res)=>{

const user =    await User.findById(req.user?._id)


if(!user){
    throw new ApiError(401,"Unauthorized, please login")
}


const {categoryId} = req.params

console.log(categoryId)
const category = await Category.findById(categoryId)


if(!category){
    throw new ApiError(404,"Category not found")
}


const products = await Product.find({category:categoryId})

if(!products){
    throw new ApiError(404,"Not products found for this Category")
}

console.log(products)


return res.status(200).json(new ApiResponse(200,products,`Products of category: ${category.name} `))









})

 








export {CreateProduct,GetProducts,getSingleProduct,ProductSearch,PaginationProducts,GetProductsByCategory}