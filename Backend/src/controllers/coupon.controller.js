import Coupon from "../models/coupon.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";




const CreateCoupons = asyncHandler(async (req, res) => {

  const {
    coupon_code,
    coupon_description,
    coupon_amount,
    discount_type,
    valid_from,
    valid_to,
    status,
  } = req.body;


  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 

const fromDate = new Date(valid_from);
fromDate.setHours(0, 0, 0);
const istFromDate = new Date(fromDate.getTime() + IST_OFFSET);

const toDate = new Date(valid_to);
toDate.setHours(23, 59, 59);
const istToDate = new Date(toDate.getTime() + IST_OFFSET);


 

  if (fromDate > toDate) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "valid_from cannot be after valid_to")
      );
  }

  // ✅ Create the coupon
  const coupon = await Coupon.create({
    coupon_code,
    coupon_description,
    coupon_amount,
    discount_type,
    valid_from: istFromDate,
    valid_to: istToDate,
    status,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, { success: true, coupon }, "Coupon successfully created")
    );
});




const GetCoupons = asyncHandler(async(req,res)=>{

  const AllCoupons = await  Coupon.find({})


  if(!AllCoupons){
   throw new ApiError(404,"Coupons not found")
  }


  return res.status(200).json(new ApiResponse(200,AllCoupons,"Coupons fetched successfully"))

})




const DeleteCoupon = asyncHandler(async(req,res)=>{

const user =  await User.findById(req.user?._id)

if(!user){
  throw new ApiError(401,"Unauthorized, please login")
}

const {id} = req.params



const coupon = await Coupon.findById(req.params.id)


if(!coupon){
  throw new ApiError(404,"Coupon not found")
}



const DeletedCoupon = await Coupon.findByIdAndDelete(id)

return res.status(200).json(new ApiResponse(200,DeletedCoupon,"Coupon successfully deleted"))

})




const GetCouponById = asyncHandler(async(req,res)=>{

  const {id} = req.params

 

 const coupon =  await Coupon.findById(id)

 if(!coupon){
  throw new ApiError(404,"Coupon not found")
 }


 return res.status(200).json(new ApiResponse(200,coupon,"Coupon fetched By Id"))

})





const UpdateCoupon = asyncHandler(async(req,res)=>{

  const {id} = req.params
  // console.log(id)

 const coupon =  await Coupon.findById(id)

 if(!coupon){
  throw new ApiError(404,"Coupon not found")
 }

const {coupon_code,coupon_description,discount_type,coupon_amount,valid_from,valid_to,status} = req.body
const updatedCoupon =  await Coupon.findByIdAndUpdate(id,{
  coupon_code,
  coupon_description,
  coupon_amount,
  discount_type,
  valid_from,
  valid_to,
  status

},{new:true})

return res.status(200).json(new ApiResponse(200,updatedCoupon,"Coupon updated successfully"))
})














const ApplyCoupons = asyncHandler(async (req, res) => {
  // Optional: require auth — remove these lines if guests allowed
  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(401, "Unauthorized, please login");

  const { coupon_code,subTotal } = req.body;

  console.log(coupon_code,subTotal)
  if (!coupon_code || subTotal == null)
    throw new ApiError(400, "Coupon code and cart total are required");

  const total = Number(subTotal);

 
 
  if (isNaN(total) || total <= 0)
    throw new ApiError(400, "Invalid cart total");

  const coupon = await Coupon.findOne({ coupon_code: coupon_code.toUpperCase() });
  if (!coupon) throw new ApiError(400, "Invalid coupon code");

  // Date validation — using server time (you used IST offset; keep consistent)
  const now = new Date();
  const istNow = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  if (istNow < coupon.valid_from || istNow > coupon.valid_to)
    throw new ApiError(400, "This coupon is not valid right now");
  if (coupon.status !== "Active")
    throw new ApiError(400, "This coupon is not active");

  const couponValue = Number(coupon.coupon_amount) || 0;
  let discountAmount = 0;

  if (coupon.discount_type === "fixedAmount") {
    // fixed rupee off
    discountAmount = Math.min(couponValue, total);
  } else if (coupon.discount_type === "percentageDiscount") {
    // percentage (e.g., coupon_amount = 10 means 10%)
    discountAmount = Math.floor((total * couponValue) / 100); // use rounding you prefer
    // Optional: if you have a max cap field like coupon.max_discount, apply Math.min(discountAmount, maxCap)
  }


  
  const totalAfterDiscount = Math.max(total - discountAmount, 0);


  return res.status(200).json(
    new ApiResponse(200, {
      success: true,
      coupon_code: coupon.coupon_code,
      discount_type: coupon.discount_type,
      discountAmount,
      totalAfterDiscount,
      message: `Coupon Applied successfully! You saved ₹${discountAmount}`,
    })
  );
});













export {CreateCoupons,GetCoupons,DeleteCoupon,GetCouponById,UpdateCoupon,ApplyCoupons}