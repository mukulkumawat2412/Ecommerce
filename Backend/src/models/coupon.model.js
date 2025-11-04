import mongoose,{Schema} from "mongoose"


const couponSchema = new Schema({
    coupon_code:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
    },



    coupon_description:{
        type:String,
        required:true,
        trim:true
    },



    discount_type:{
        type:String,
        enum:["fixedAmount","percentageDiscount"],
        default:"fixedAmount",
        required:true
    },



    coupon_amount:{
        type:Number,
        required:true,
        min:0
    },


    valid_from:{
        type:Date,
        required:true
    },


    valid_to:{
        type:Date,
        required:true
    },


    status:{
        type:String,
        enum:["Active","Inactive","Expired"],
        default:"Active"
    }

},{timestamps:true})



couponSchema.pre("save", function (next) {
  const today = new Date();
  if (this.valid_to < today) {
    this.status = "Expired";
  }
  next();
});



const Coupon = mongoose.model("Coupon",couponSchema)

export default Coupon;