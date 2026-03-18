import mongoose, { Schema } from "mongoose"



const cartSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },



    quantity: {
        type: Number,
        required: true,
        min: 1,

        default: 1
    },



 




   






}, { timestamps: true })



const Cart = mongoose.model("Cart", cartSchema)

export default Cart;