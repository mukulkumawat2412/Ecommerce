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




 const ApplyCoupons = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(401, "Unauthorized, please login");
  }

  const { coupon_code, cartTotal } = req.body;

  if (!coupon_code || !cartTotal) {
    throw new ApiError(400, "Coupon code and cart total are required");
  }

  const existingCoupon = await Coupon.findOne({
    coupon_code: coupon_code.toUpperCase(),
  });

  if (!existingCoupon) {
    throw new ApiError(400, "Invalid coupon code");
  }

  // 🔹 Date check

  const today = new Date();
const istTime = new Date(today.getTime() + (5.5 * 60 * 60 * 1000));
 
  console.log(istTime)

  console.log(existingCoupon.valid_from)
  console.log(existingCoupon.valid_to)

  if (  istTime < existingCoupon.valid_from &&  istTime > existingCoupon.valid_to ){
throw new ApiError(400, "This coupon is not valid at this time");
  }




  if (existingCoupon.status !== "Active") {
    throw new ApiError(400, "This coupon is not active");
  }

  let discountAmount = 0;

  // 🔹 Calculate discount
  if (existingCoupon.discount_type === "fixedAmount") {
    discountAmount = existingCoupon.coupon_amount;
  } else if (existingCoupon.discount_type === "percentageDiscount") {
    discountAmount = (cartTotal * existingCoupon.coupon_amount) / 100;
  }

  // Total should not go negative
  const finalTotal = Math.max(cartTotal - discountAmount, 0);

  return res
    .status(200)
    .json(
      new ApiResponse(200, {
        success: true,
        coupon_code,
        // discount_type,
        discountAmount,
        finalTotal,
        message: `Coupon applied successfully! You saved ₹${discountAmount}`,
      })
    );
});






export {CreateCoupons,ApplyCoupons}