import mongoose,{Schema} from "mongoose"




const wishlistSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
,

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"

    }



},{timestamps:true})


const Wishlist = mongoose.model("Wishlist",wishlistSchema)


export default Wishlist