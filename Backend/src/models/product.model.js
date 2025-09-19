import mongoose,{Schema} from "mongoose"

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },


    title:{
        type:String,
        required:true
    },


    price:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },


    stock:{
        type:Number,
        default:0
    },


    description:{
        type:String,
        required:true
    },


    image:{
        type:String
    }



},{timestamps:true})


const Product = mongoose.model("Product",productSchema)

export default Product