import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import Stripe from "stripe"
import dotenv from "dotenv"
import Wishlist from "../models/wishlist.model.js";

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);





const AddToCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized, please login");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const { quantity } = req.body;

  let cartItem = await Cart.findOne({ product: req.params.id, user: req.user?._id });

  if (cartItem) {
   
    cartItem.quantity += quantity;
    await cartItem.save();

    const cartCount = await Cart.countDocuments({ user: req.user._id });

    return res.status(200).json({
      cartItem,
      cartCount,
      isNewProduct: false, 
      message: "Cart updated successfully"
    });
  }


  const newCartItem = await Cart.create({
    product: req.params.id,
    user: req.user?._id,
    quantity,
  });

  const cartCount = await Cart.countDocuments({ user: req.user._id });

  return res.status(201).json({
    newCartItem,
    cartCount,
    isNewProduct: true, 
    message: "Added to cart successfully"
  });
});






const getCart = asyncHandler(async(req,res)=>{

const user =    await User.findById(req.user?._id)


if(!user){
    throw new ApiError(401,"Unauthorized, please login")
}


const cartItems = await Cart.find({user:req.user?._id}).populate("product")

return res.status(200).json(new ApiResponse(200,{
    data:cartItems
},"Cart fetched successfully"))
})




const removeCartItems = asyncHandler(async(req,res)=>{

const user =    await User.findById(req.user?._id)


if(!user){
    throw new ApiError(401,"Unauthorized, please login")
}


const {id} = req.params


const cartItems = await Cart.findByIdAndDelete(
    id
)


if(!cartItems){
    throw new ApiError(404,"Cart items not found")
}


  return res
    .status(200).json(new ApiResponse(200, id, "Item removed from cart successfully"));




})



const Checkout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized, please login");
  }

  const { products } = req.body;
  console.log("Products received:", products);

  const lineItems = products.map((item) => {
    const price = parseInt(item.product.price); 

    if (isNaN(price)) {
      throw new Error(`Invalid price for product: ${item.product.name}`);
    }

    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
          images: item.product.image ? [item.product.image[0]] : [],
        },
        unit_amount: price * 100, 
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",

  });

  return res
    .status(201)
    .json(new ApiResponse(201, session, "Payment session created successfully"));
});




const AddWishlistProduct = asyncHandler(async(req,res)=>{

const user =  await User.findById(req.user?._id)

if(!user){
  throw new ApiError(401,"Unauthorized, please login")
}

const {id} = req.params




const alreadyWishlist = await Wishlist.findOne({user:req.user?._id, product:id})

if(alreadyWishlist){
  await Wishlist.findByIdAndDelete(alreadyWishlist._id)

  return res.status(200).json(new ApiResponse(200,{},"Remove from wishlist"))
}








const wishlist = await Wishlist.create({user:req.user?._id,product:id})


// console.log(wishlist)

return res.status(201).json(new ApiResponse(201,wishlist,"Added to wishlist"))



})





const GetWishlistProducts = asyncHandler(async(req,res)=>{

const user  =  await User.findById(req.user?._id)

if(!user){
  throw new ApiError(401,"Unauthorized, please login")
}


const wishlistProduct = await Wishlist.find({user:req.user?._id}).populate("product")


if(!wishlistProduct || wishlistProduct.length===0){

  return res.status(200).json(new ApiResponse(200,{} ,"Wishlist is empty"))
}


return res.status(200).json(new ApiResponse(200,wishlistProduct,"Wishlist products fetched successfully"))



})



const DeleteWishlistItems = asyncHandler(async(req,res)=>{
 
const user =  await User.findById(req.user?._id)

if(!user){
  throw new ApiError(401,"Unauthorized, please login")
}


const {id} = req.params


const wishlistItem = await Wishlist.findByIdAndDelete(id)


if(!wishlistItem){
  throw new ApiError(404,"Wishlist items not found")
}


return res.status(200).json(new ApiResponse(200,id,"Product Remove from wishlist"))


})










export {AddToCart,getCart,removeCartItems,Checkout,AddWishlistProduct,GetWishlistProducts,DeleteWishlistItems}